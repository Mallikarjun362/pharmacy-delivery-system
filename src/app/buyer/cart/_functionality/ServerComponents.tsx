'use server';
import { PrescriptionActions } from '@/models/Prescription';
import CatalogueItem from '@/models/CatalogueItem';
import { debugLog, toJSON } from '@/utils';
import Order from '@/models/Order';
import Account from '@/models/Account';
import { revalidatePath } from 'next/cache';

export const getMayMedicineDetails = async (
  db_id_arr: Array<string>
): Promise<Array<any>> => {
  return toJSON(
    await CatalogueItem.findMany({
      _id: {
        $in: db_id_arr,
      },
    })
      .select({ _id: 1, title: 1 })
      .lean()
      .exec()
  );
};

export const placeOrderManual = async ({
  cart,
  prescription_file,
  seller_db_id,
  buyer_db_id,
}: any) => {
  // debugLog(
  //   'PLACE ORDER MANUAL',
  //   cart,
  //   prescription_file,
  //   seller_db_id,
  //   buyer_db_id
  // );
  let total_cost = 0;
  for (let val of Object.values(cart)) {
    total_cost += (val as any).unit_price * (val as any).quantity;
  }

  let prec = null;
  if (prescription_file) {
    prec = await PrescriptionActions.addPrescription({
      image_files: [
        Buffer.from(
          await (prescription_file.get('file') as File).arrayBuffer()
        ),
      ],
      buyer_db_id,
      title: 'From Order',
    });
  }
  const the_buyer = await Account.findById(buyer_db_id);
  const new_order = new Order({
    delivery_location: {
      longitude: the_buyer.longitude,
      latitude: the_buyer.latitude,
    },
    available_items: Object.keys(cart).map((k: string) => ({
      dosage_details: '',
      unit_price: cart[k].unit_price,
      quantity: cart[k].quantity,
      title: cart[k].title,
    })),
    delivery_address: the_buyer?.address,
    total_cost,
    order_status: 'CONFIRMED',
    prescription: (prec as any)?._id,
    otp: 0,
    seller: seller_db_id,
    buyer: buyer_db_id,
    timestamp: {
      buyerConfirm: Date.now(),
    },
    payment: {
      payment_holder: 'BUYER',
      mode: 'COD',
    },
  });
  await new_order.save();
  revalidatePath('/');
};
