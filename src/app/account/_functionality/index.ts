'use server'
import Account from "@/models/Account"
import { UserRequestActions } from "@/models/UserRequest";
import { revalidatePath } from "next/cache";

export interface IGeneralAccountDetails {
    telegram_number: string, whatsapp_number: string, phone_number: string,
    father_name: string, first_name: string, last_name: string,
    upi_id: string, gender: string, primary_email: string
}

export const getGeneralAccountDetails = async (db_id: string): Promise<IGeneralAccountDetails> => await Account
    .findById(db_id).select({
        telegram_number: 1, whatsapp_number: 1, phone_number: 1,
        father_name: 1, first_name: 1, last_name: 1,
        upi_id: 1, gender: 1, primary_email: 1, address: 1
    }).lean().exec().then((data: any) => ({ ...data, _id: data._id.toString() }));

export const setGeneralAccountDetails = async (formData: FormData) => {
    await Account.findByIdAndUpdate(formData.get('db_id'), {
        telegram_number: formData.get('telegram_number'),
        whatsapp_number: formData.get('whatsapp_number'),
        phone_number: formData.get('phone_number'),
        father_name: formData.get('father_name'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        upi_id: formData.get('upi_id'),
        gender: formData.get('gender'),
        address: {
            building: formData.get('building'),
            city: formData.get('city'),
            additional_details: formData.get('additional_details'),
            landmarks: formData.get('landmarks'),
        },
    });
    revalidatePath("/");
}

export const changeUserType = async ({ email, to_user_type }: { email: string, to_user_type: string }) => {
    await UserRequestActions.changeUserType.create({
        from_user: email,
        to_user_type
    });
}