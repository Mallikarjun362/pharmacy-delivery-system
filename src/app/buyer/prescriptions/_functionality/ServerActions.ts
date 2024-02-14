'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PrescriptionActions } from '@/models/Prescription';
import { OrderActions } from '@/models/Order';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import Account from '@/models/Account';

export const createPrescriptionFormAction = async (formData: FormData) => {
    const buyer_db_id = (await getServerSession(authOptions))?.user.custome_data.db_id as string;
    await PrescriptionActions.addPrescription({
        file: formData.get('image_file') as File,
        title: formData.get('title') as string,
        buyer_db_id,
    });
    revalidatePath("/");
};

export const deletePrescription = async (_id: string) => {
    await PrescriptionActions.deletePrescription(_id);
    revalidatePath("/");
};

export const getPrescriptionImage = async (_id: string) => await PrescriptionActions.getImage(_id);

export const placeOrderFromPrescription = async ({ buyer_db_id, seller_db_id, prescription_db_id, }: any) => OrderActions.placeOrderFromPrescription({ buyer_db_id, seller_db_id, prescription_db_id, })

export const getSellerOptions = async (): Promise<Array<any>> => {
    const result = (await Account.find({ user_type: "SELLER" }).select({ _id: 1, primary_email: 1, }).lean().exec()).map((ele: any) => ({ ...ele, _id: (ele._id as any)?.toString() }));
    return result;
}