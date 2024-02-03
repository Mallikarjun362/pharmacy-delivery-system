import mongoose, { Model, Schema, SchemaType, SchemaTypes } from "mongoose";
import { MONGODB_URI } from "@/utils/Constants";

export interface IAddress {
    additional_details: string,
    landmarks: string,
    building: string,
    city: string,
};

export interface INotification {
    message: string,
    timestamp: Date,
    title: string,
}

export type AccountType = "BUYER" | "SELLER" | "DISPATCHER";

export interface IAccount {
    whatsapp_number: string,
    telegram_number: string,
    primary_email: string,
    aadhar_number: number,
    phone_number: string,
    student_id: number,

    user_type: "BUYER" | "SELLER" | "DISPATCHER" | "ADMIN" | "GENERAL",
    notifications: Array<INotification>,
    is_verified_by_admin: boolean,
    proof_documents: Array<any>,
    medical_history: Array<any>,
    last_field_update: Date,
    gst_number: string,
    field_update: any,
    seller_owner: any,
    joined_at: Date,
    upi_id: string,

    gender: "MALE" | "FEMALE",
    father_name: string,
    blood_group: string,
    date_of_birth: Date,
    first_name: string,
    address: IAddress,
    last_name: string,
    longitude: number,
    latitude: number,
};

const account_schema = new Schema<IAccount>({
    primary_email: { type: SchemaTypes.String, maxlength: 100, required: true, unique: true },
    aadhar_number: { type: SchemaTypes.Number, unique: true, sparse: true },
    student_id: { type: SchemaTypes.Number, unique: true, sparse: true },
    whatsapp_number: { type: SchemaTypes.String, maxlength: 20, },
    telegram_number: { type: SchemaTypes.String, maxlength: 20, },
    phone_number: { type: SchemaTypes.String, maxlength: 20, },

    gender: { type: SchemaTypes.String, enum: ["MALE", "FEMALE"] },
    blood_group: { type: SchemaTypes.String, max_length: 10 },
    first_name: { type: SchemaTypes.String, maxlength: 50 },
    last_name: { type: SchemaTypes.String, maxlength: 50 },
    date_of_birth: SchemaTypes.Date,
    father_name: SchemaTypes.String,
    longitude: SchemaTypes.Number,
    latitude: SchemaTypes.Number,

    user_type: { type: SchemaTypes.String, enum: ["BUYER", "SELLER", "DISPATCHER", "ADMIN", "GENERAL"], default: "GENERAL" },
    joined_at: { type: SchemaTypes.Date, default: () => Date.now() },
    seller_owner: { type: SchemaTypes.ObjectId, ref: "Account" },
    medical_history: [{ type: SchemaTypes.Buffer }],
    is_verified_by_admin: SchemaTypes.Boolean,
    last_field_update: SchemaTypes.Date,
    gst_number: SchemaTypes.String,
    upi_id: SchemaTypes.String,

    address: {
        additional_details: SchemaTypes.String,
        landmarks: SchemaTypes.String,
        building: SchemaTypes.String,
        city: SchemaTypes.String,
    },
    field_update: {
        proof_documents: { t: { type: SchemaTypes.Date, default: () => Date.now() }, s: { type: SchemaTypes.Boolean, default: false }, },
        blood_group: { t: { type: SchemaTypes.Date, default: () => Date.now() }, s: { type: SchemaTypes.Boolean, default: false }, },
        gst_number: { t: { type: SchemaTypes.Date, default: () => Date.now() }, s: { type: SchemaTypes.Boolean, default: false }, },
    },
    notifications: [{
        message: SchemaTypes.String,
        timestamp: SchemaTypes.Date,
        title: SchemaTypes.String,
    }],
    proof_documents: [{
        file_type: SchemaTypes.String,
        document: SchemaTypes.Buffer,
        title: SchemaTypes.String,
    }],
});


if (!(global as any)._mongooseConnection) {
    mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
    (global as any)._mongooseConnection = mongoose.connection;
}

const Account = mongoose.models.Account as any || mongoose.model<IAccount>('Account', account_schema);

interface IAccountActions {
    isEmailExists(primary_email: string): Promise<Boolean>,
    createBasicAccount(props: any): Promise<any>,
    delete(db_id: string): Promise<Boolean>,

    getUserTypeByEmail(primary_email: string): Promise<string | null>,
    getUserRefAndTypeIdByEmail(primary_email: string): Promise<any>,
    getUserDetailsMini(db_id: string): Promise<any>,
    getUserDetailsFull(db_id: string): Promise<any>,
}

export const AccountActions: IAccountActions = {
    async isEmailExists(primary_email) {
        return !!((await Account.findById(primary_email).select({ _id: 1 }).lean().exec())._id);
    },

    async getUserRefAndTypeIdByEmail(primary_email) {
        return await Account.findOne({ primary_email }).select({ _id: 1, user_type: 1 }).exec();
    },

    async createBasicAccount({ first_name = '', last_name = '', primary_email, user_type, }) {
        const the_user = Account({ primary_email, user_type, first_name, last_name });
        await the_user.save();
        return the_user;
    },

    async getUserTypeByEmail(primary_email) {
        return (await Account.findOne({ primary_email }).select({ _id: 0, user_type: 1 }).lean().exec()).user_type
    },

    async delete(db_id) { return !!(await Account.findByIdAndDelete(db_id)) },

    async getUserDetailsMini(db_id) {
        return await Account.findById(db_id).select({
            is_verified_by_admin: 1,
            student_id: 1,
            first_name: 1,
            last_name: 1,
            user_type: 1,
            _id: 1,
        }).lean().exec();
    },

    async getUserDetailsFull(db_id) {
        return await Account.findById(db_id).select({
            is_verified_by_admin: 1, last_field_update: 1, whatsapp_number: 1, telegram_number: 1,
            primary_email: 1, aadhar_number: 1, date_of_birth: 1, notifications: 1, phone_number: 1,
            blood_group: 1, father_name: 1, student_id: 1, first_name: 1, last_name: 1, user_type: 1,
            address: 1, gender: 1, upi_id: 1, _id: 1,
        }).lean().exec();
    },
}

export default Account;