'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PrescriptionActions } from '@/models/Prescription';
import CatalogItem from '@/models/CatalogItem';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import Account from '@/models/Account';
import Order from '@/models/Order';
import { toJSON } from '@/utils';

function generateRandom4DigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

export const getMayMedicineDetails = async (
  db_id_arr: Array<string>
): Promise<Array<any>> =>
  toJSON(
    await CatalogItem.findMany({ _id: { $in: db_id_arr } })
      .select({ _id: 1, title: 1 })
      .lean()
      .exec()
  );

export const placeOrderManual = async ({
  cart,
  formData,
}: {
  cart: { [item_db_id: string]: number };
  formData: FormData;
}) => {
  // INPUT = CART : { ITEM DB ID => QUANTITY }
  // FORM-DATA CONTAINS 1. IMAGE AND 2. PAYMENT MODE
  const session = await getServerSession(authOptions);
  const buyer_db_id = session?.user?.custome_data?.db_id as string;
  const prescription_file = formData.get('prescription_file') as File;

  // CALCULATE TOTAL COST AND GET SELLER DB ID
  let total_cost = 0;
  const items = await CatalogItem.find({
    _id: {
      $in: Object.keys(cart),
    },
  }).select({
    is_prescription_required: 1,
    stock_count: 1,
    unit_price: 1,
    seller: 1,
    title: 1,
  });

  const seller_db_id: string = items[0].seller;
  for (let item of items) {
    total_cost +=
      item.unit_price * cart[(item?._id as any)?.toString() as string];
  }

  // CREATING PRESCRIPTION
  let prec = null;
  if (prescription_file) {
    prec = await PrescriptionActions.addPrescription({
      file: prescription_file,
      title: 'Prescription from order',
      buyer_db_id,
    });
  }

  const theBuyer = await Account.findById(buyer_db_id).select({
    longitude: 1,
    latitude: 1,
    address: 1,
  });
  // CREATING ORDER
  // 3 ENTITIES = [PRESCRIPTION + BUYER => ORDER]
  const new_order = new Order({
    timeline: [{ event: 'CONFIRMED', t: Date.now() }],
    delivery_address: theBuyer?.address,
    otp: generateRandom4DigitNumber(),
    prescription: (prec as any)?._id,
    order_status: 'CONFIRMED',
    seller: seller_db_id,
    buyer: buyer_db_id,
    total_cost,

    delivery_location: {
      longitude: theBuyer.longitude,
      latitude: theBuyer.latitude,
    },

    available_items: [
      ...items.map((item: any) => ({
        unit_price: item.unit_price,
        quantity: cart[item._id?.toString()],
        title: item.title,
        dosage_details: '',
      })),
    ],

    payment: {
      mode: formData.get('payment_mode')?.toString(),
      payment_holder: { B: 1, S: -1, D: 0 },
      package_holder: { B: -1, S: 1, D: 0 },
    },
  });
  await new_order.save();
  revalidatePath('/');
};
