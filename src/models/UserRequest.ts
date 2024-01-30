import { MONGODB_URI } from "@/utils/Constants";
import mongoose, { Schema, SchemaTypes } from "mongoose";
import Account from "./Account";

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

if (!(global as any)._mongooseConnection) {
    mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
    (global as any)._mongooseConnection = mongoose.connection;
}

const UserRequest = mongoose.models.UserRequest as any || mongoose.model<IUserRequest>('UserRequest', user_request_schema);


export default UserRequest;

const ReqTypes = {
    CHANGE_USER_TYPE: {
        id: "CHANGE_USER_TYPE",
        data: typeof { to_user_type: "", },
        title: "Change user type",
    },
}

// interface IUserRequestActions { };

export const UserRequestActions = {
    changeUserType: {
        create: async ({ from_user, description = '', to_user_type }: any) => !!(await UserRequest.create({
            req_type: ReqTypes.CHANGE_USER_TYPE.id, to_user: "ADMIN", description, from_user, data: { to_user_type },
        })),
        accept: async (_id: string) => {
            const the_req = await UserRequest.findById(_id).exec();
            const { from_user, data: { to_user_type } } = the_req;
            await Account.findByIdAndUpdate(from_user, { user_type: to_user_type, }).exec();
            return true;
        },
        reject: async ({ _id, reject_message }: any) => !!(await UserRequest.findByIdAndUpdate(_id, { reject_message, status: "REJECTED" }).exec()),
        cancel: async ({ _id, cancel_reason }: any) => !!(await UserRequest.findByIdAndUpdate(_id, { cancel_reason, status: "CANCEL" }).exec()),
    },
    async getMyRequestSent(user_email: string): Promise<Array<any>> {
        await UserRequest.find({ from_user: user_email });
        return [];
    },
};