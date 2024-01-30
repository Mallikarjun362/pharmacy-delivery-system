'use server';
import Account from '@/models/Account';
import { OrderActions } from '@/models/Order';
import { PrescriptionActions } from '@/models/Prescription';
import { revalidatePath } from 'next/cache';

export const createPrescriptionFormAction = async (formData: FormData) => {
    await PrescriptionActions.addPrescription({
        image_files: [Buffer.from(await (formData.get('image_files') as File).arrayBuffer())],
        buyer_db_id: formData.get('buyer_db_id') as string,
        title: formData.get('title') as string,
    });
    revalidatePath("/");
};

export const deletePrescription = async (_id: string) => {
    await PrescriptionActions.deletePrescription(_id);
    revalidatePath("/");
};

export const getPrescriptionImage = async (_id: string) => await PrescriptionActions.getImages(_id);

export const placeOrderFromPrescription = async ({ buyer_db_id, seller_db_id, prescription_db_id, }: any) => OrderActions.placeOrderFromPrescription({ buyer_db_id, seller_db_id, prescription_db_id, })

export const getSellerOptions = async (): Promise<Array<any>> => {
    const result = (await Account.find({ user_type: "SELLER" }).select({ _id: 1, primary_email: 1, }).lean().exec()).map((ele: any) => ({ ...ele, _id: (ele._id as any)?.toString() }));
    return result;
}