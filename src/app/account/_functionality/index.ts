'use server'
import Account from "@/models/Account"
import { revalidatePath } from "next/cache";

export interface IGeneralAccountDetails {
    telegram_number: string, whatsapp_number: string, phone_number: string,
    father_name: string, first_name: string, last_name: string,
    upi_id: string, gender: string, primary_email: string
}

export const getGeneralAccountDetails = async (primary_email: string): Promise<IGeneralAccountDetails> => await Account
    .findOne({ primary_email }).select({
        telegram_number: 1, whatsapp_number: 1, phone_number: 1,
        father_name: 1, first_name: 1, last_name: 1,
        upi_id: 1, gender: 1, primary_email: 1
    }).lean().exec().then((data: any) => ({ ...data, _id: data._id.toString() }));

export const setGeneralAccountDetails = async (formData: FormData) => {
    await Account.findOneAndUpdate({ primary_email: formData.get('primary_email') }, {
        telegram_number: formData.get('telegram_number'),
        whatsapp_number: formData.get('whatsapp_number'),
        phone_number: formData.get('phone_number'),
        father_name: formData.get('father_name'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        upi_id: formData.get('upi_id'),
        gender: formData.get('gender'),
    });
    revalidatePath("/");
}