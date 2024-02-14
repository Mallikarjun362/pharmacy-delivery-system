import mongoose, { Schema, SchemaTypes } from "mongoose";
import Account, { AccountType } from "./Account";
import ".";

export interface IUserRequest {
    status: "ACCEPTED" | "REJECTED" | "PENDING",
    data: Map<[s: string], any>,
    reject_message: string,
    cancel_reason: string,
    description: string,
    from_user: string,
    req_type: string,
    to_user: string,
    timestamp: Date,
};

const user_request_schema = new Schema<IUserRequest>({
    status: { type: SchemaTypes.String, enum: ["ACCEPTED", "REJECTED", "PENDING", "CANCELED"], default: "PENDING" },
    timestamp: { type: SchemaTypes.Date, default: () => Date.now() },
    from_user: { type: SchemaTypes.String, required: true },
    req_type: { type: SchemaTypes.String, required: true },
    to_user: { type: SchemaTypes.String, required: true },
    reject_message: { type: SchemaTypes.String },
    cancel_reason: { type: SchemaTypes.String },
    description: SchemaTypes.String,
    data: SchemaTypes.Map,
});

const UserRequest = mongoose.models.UserRequest as any || mongoose.model<IUserRequest>('UserRequest', user_request_schema);

export default UserRequest;

interface IReqTypeFormat {
    title: string,
    id: string,
}

interface IReqTypes {
    CHANGE_USER_TYPE: IReqTypeFormat,
    [key: string]: IReqTypeFormat,
}

export const ReqTypes: IReqTypes = {
    CHANGE_USER_TYPE: {
        id: "CHANGE_USER_TYPE",
        title: "Change user type",
    },
    GENERAL: {
        id: "GENERAL",
        title: "General",
    },
}

interface IUserRequestActions {
    CHANGE_USER_TYPE: {
        create(props: { from_user: string, description?: string, to_user_type: AccountType }): Promise<boolean>,
        accept(db_id: { db_id: string, reject_message: string }): Promise<boolean>,
        reject(props: { db_id: string, reject_message: string }): Promise<boolean>,
        cancel(props: { db_id: string, cancel_reason: string }): Promise<boolean>,
    },
    GENERAL: {
        create(props: { from_user: string, to_user: string, description: string, data?: Map<[key: string], any> | null }): Promise<boolean>,
        accept(props: { db_id: string, reject_message: string }): Promise<boolean>,
        reject(props: { db_id: string, reject_message: string }): Promise<boolean>,
        cancel(props: { db_id: string, cancel_reason: string }): Promise<boolean>,
    },
    getRequestSent(user_email: string): Promise<Array<any>>,
    [key: string]: any,
};

export const UserRequestActions: IUserRequestActions = {
    CHANGE_USER_TYPE: {
        create: async ({ from_user, description = '', to_user_type }) => !!(await UserRequest.create({
            req_type: ReqTypes.CHANGE_USER_TYPE.id, to_user: "ADMIN", description, from_user, data: { to_user_type },
        })),
        accept: async ({ db_id, reject_message }) => {
            const theRequest = await UserRequest.findById(db_id).exec();
            await Account.findOneAndUpdate({ primary_email: theRequest.from_user }, { user_type: theRequest.data.get('to_user_type'), }).exec();
            theRequest.status = "ACCEPTED";
            theRequest.reject_message = reject_message;
            await theRequest.save()
            return true;
        },
        reject: async ({ db_id, reject_message }) => !!(await UserRequest.findByIdAndUpdate(db_id, { reject_message, status: "REJECTED" }).exec()),
        cancel: async ({ db_id, cancel_reason }) => !!(await UserRequest.findByIdAndUpdate(db_id, { cancel_reason, status: "CANCELED" }).exec()),
    },
    GENERAL: {
        create: async ({ from_user, to_user, description = '', data }) => !!(await UserRequest.create({
            req_type: ReqTypes.GENERAL.id, to_user, description, from_user, data,
        })),
        accept: async ({ db_id, reject_message }) => !!(await UserRequest.findByIdAndUpdate(db_id, { reject_message, status: "ACCEPTED" }).exec()),
        reject: async ({ db_id, reject_message }) => !!(await UserRequest.findByIdAndUpdate(db_id, { reject_message, status: "REJECTED" }).exec()),
        cancel: async ({ db_id, cancel_reason }) => !!(await UserRequest.findByIdAndUpdate(db_id, { cancel_reason, status: "CANCELED" }).exec()),
    },
    async getRequestSent(user_email) {
        return await UserRequest.find({ from_user: user_email });
    },
};