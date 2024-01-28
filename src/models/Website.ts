import mongoose, { Model, Schema, SchemaTypes } from "mongoose";
import { MONGODB_URI } from "@/utils/Constants";

export interface IConfirmationRequest {
    updated_fields: [string],
    user_type: string,
    email: string,
}

export interface IAccount {
    primary_record: boolean,
    confirmation_requests: Array<IConfirmationRequest>,
};

const account_schema = new Schema<IAccount>({
    primary_record: { type: SchemaTypes.Boolean, default: true, unique: true },
    confirmation_requests: [],
});


if (!(global as any)._mongooseConnection) {
    mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
    (global as any)._mongooseConnection = mongoose.connection;
}

const Account = mongoose.models.Account as any || mongoose.model<IAccount>('Account', account_schema);

export default Account;