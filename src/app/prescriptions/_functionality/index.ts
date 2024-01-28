'use server';
import { PrescriptionActions } from '@/models/Prescription';
import { revalidatePath } from 'next/cache';

export const createPrescriptionFormAction = async (formData: FormData) => {
    await PrescriptionActions.addPrescription({
        image_files: [Buffer.from(await (formData.get('image_files') as File).arrayBuffer())],
        buyer_email: formData.get('email') as string,
        title: formData.get('title') as string,
    });
    revalidatePath("/");
};

export const deletePrescription = async (_id: string) => {
    await PrescriptionActions.deletePrescription({ _id });
    revalidatePath("/");
};

export const getPrescriptionImage = async (_id: string) => await PrescriptionActions.getImages(_id);