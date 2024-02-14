'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserRequestActions } from "@/models/UserRequest";
import Account, { AccountType } from "@/models/Account"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import UserFile from "@/models/UserFile";
import { toJSON } from "@/utils";

export interface IAccountDetails {
    telegram_number: string, whatsapp_number: string, phone_number: string,
    father_name: string, first_name: string, last_name: string, address: any,
    upi_id: string, gender: string, primary_email: string, user_type: string
    // IMPORTANT DETAILS
    blood_group: string, date_of_birth: Date, aadhar_number: number, student_id: number,
    seller_dispatcher: string
}

export const getAccountDetailsByEmail = async (userEmail: string): Promise<IAccountDetails> => userEmail && String(userEmail)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) ? toJSON(
        await Account.findOne({ primary_email: userEmail }).select({
            is_verified_by_admin: 1, last_field_update: 1, whatsapp_number: 1, telegram_number: 1,
            primary_email: 1, aadhar_number: 1, date_of_birth: 1, notifications: 1, phone_number: 1,
            blood_group: 1, father_name: 1, student_id: 1, first_name: 1, last_name: 1, user_type: 1,
            address: 1, gender: 1, upi_id: 1, _id: 1, seller_dispatcher: 1,
            // FILES
            medical_history: 1, proof_documents: 1
        })
            .populate({ path: 'medical_history', select: { doc_type: 1, title: 1, timestamp: 1 } })
            .populate({ path: 'proof_documents', select: { doc_type: 1, title: 1, timestamp: 1 } })
            .lean().exec()
    ) : {};

export const getAccountDetailsById = async (db_id: string): Promise<IAccountDetails> => toJSON(
    await Account
        .findById(db_id).select({
            is_verified_by_admin: 1, last_field_update: 1, whatsapp_number: 1, telegram_number: 1,
            primary_email: 1, aadhar_number: 1, date_of_birth: 1, notifications: 1, phone_number: 1,
            blood_group: 1, father_name: 1, student_id: 1, first_name: 1, last_name: 1, user_type: 1,
            address: 1, gender: 1, upi_id: 1, _id: 1, seller_dispatcher: 1,
            // FILES
            medical_history: 1, proof_documents: 1
        })
        .populate({ path: 'medical_history', select: { doc_type: 1, title: 1, timestamp: 1 } })
        .populate({ path: 'proof_documents', select: { doc_type: 1, title: 1, timestamp: 1 } })
        .lean().exec()
);

export const setAccountDetails = async (formData: FormData) => {
    const session = await getServerSession(authOptions);
    const currentUserType = session?.user?.custome_data?.user_type;
    const db_id = currentUserType === "ADMIN" ? formData.get('db_id') : session?.user?.custome_data?.db_id;
    try {
        await Account.findByIdAndUpdate(db_id, {
            seller_dispatcher: formData.get('seller_dispatcher')?.toString(),
            telegram_number: formData.get('telegram_number')?.toString(),
            whatsapp_number: formData.get('whatsapp_number')?.toString(),
            phone_number: formData.get('phone_number')?.toString(),
            father_name: formData.get('father_name')?.toString(),
            first_name: formData.get('first_name')?.toString(),
            last_name: formData.get('last_name')?.toString(),
            upi_id: formData.get('upi_id')?.toString(),
            gender: formData.get('gender')?.toString(),
            address: {
                additional_details: formData.get('additional_details')?.toString(),
                landmarks: formData.get('landmarks')?.toString(),
                building: formData.get('building')?.toString(),
                city: formData.get('city')?.toString(),
            },
            ...(currentUserType === "GNERAL" || currentUserType === "ADMIN" ? ({
                ...(formData.get('aadhar_number')?.toString() ? {
                    aadhar_number: Number.parseInt(formData.get('aadhar_number')?.toString() as string),
                } : null),
                ...(formData.get('student_id')?.toString() ? {
                    student_id: Number.parseInt(formData.get('student_id')?.toString() as string),
                } : null),
                blood_group: formData.get('blood_group')?.toString(),
                date_of_birth: formData.get('date_of_birth')?.toString() ? new Date(formData.get('date_of_birth')?.toString() as string) : null,
            }) : ({})),
        });
    } catch (e) {
        console.error(e);
    }
    revalidatePath("/");
}

export const changeUserType = async ({ email, to_user_type }: { email: string, to_user_type: AccountType }) => {
    await UserRequestActions.CHANGE_USER_TYPE.create({
        from_user: email,
        to_user_type
    });
}

export const addDocument = async (formData: FormData) => {
    const session = await getServerSession(authOptions);
    const theFile = (formData.get("file") as File);
    const theUserFile = UserFile({
        description: formData.get("description"),
        extension: theFile.type,
        doc_type: formData.get("doc_type"),
        title: theFile.name,
        file: Buffer.from(await (formData.get('file') as File).arrayBuffer()),
    });
    await theUserFile.save();
    if (formData.get("doc_type")?.toString() === "MEDICAL") {
        await Account.findByIdAndUpdate(session?.user.custome_data.db_id, {
            $push: { medical_history: theUserFile._id.toString() }
        })
    } else {
        await Account.findByIdAndUpdate(session?.user.custome_data.db_id, {
            $push: { proof_documents: theUserFile._id.toString() }
        })
    }
    revalidatePath('/');
}

export const getUserDocuments = async () => {
    const session = await getServerSession(authOptions);
    return toJSON(
        await Account.findById(session?.user.custome_data.db_id)
            .select({ medical_history: 1, proof_documents: 1, _id: 0 })
            .populate({ path: 'medical_history', select: { doc_type: 1, title: 1, timestamp: 1 } })
            .populate({ path: 'proof_documents', select: { doc_type: 1, title: 1, timestamp: 1 } })
            .lean().exec()
    );
}

export const getUserFile = async (file_db_id: string) => {
    return toJSON(await UserFile.findById(file_db_id).select({ file: 1, _id: 0 }).lean().exec())
}