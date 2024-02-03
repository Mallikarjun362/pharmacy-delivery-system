'use server'
import UserRequest, { UserRequestActions } from "@/models/UserRequest";
import { revalidatePath } from "next/cache";
import { toJSON } from "@/utils";

export const getReqsReceivedPending = async (my_email: string): Promise<Array<any>> => await UserRequest.find({ to_user: my_email, status: "PENDING" }).lean().exec();
export const getReqsReceivedDone = async (my_email: string): Promise<Array<any>> => toJSON(await UserRequest.find({ to_user: my_email }).lean().exec());
export const getReqsSent = async (my_email: string): Promise<Array<any>> => await UserRequest.find({ from_user: my_email }).lean().exec();
export const handleResponseSubmit = async (formData: FormData) => {
    if (formData.get('reject')) {
        UserRequestActions[formData.get('req_type') as string]?.reject({ db_id: formData.get("db_id")?.toString(), reject_message: formData.get("message") });
    } else {
        UserRequestActions[formData.get('req_type') as string]?.accept({ db_id: formData.get("db_id")?.toString(), reject_message: formData.get("message") });
    }
    revalidatePath("/")
}
export const handleGeneralRequestSubmit = async (formData: FormData) => {
    const req_type: string = formData.get('req_type')?.toString() || '';
    if (req_type === "GENERAL") {
        UserRequestActions.GENERAL.create({
            description: formData.get('description')?.toString() || '',
            from_user: formData.get('from_user')?.toString() || '',
            to_user: formData.get('to_user')?.toString() || '',
        });
    }
    revalidatePath("");
}