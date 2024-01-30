import mongoose, { Model, Schema, SchemaType, SchemaTypes } from "mongoose";
import { MONGODB_URI } from "@/utils/Constants";

interface IAddress {
    additional_details: string,
    building: string,
    landmarks: string,
    city: string,
};

interface INotification {
    message: string,
    timestamp: Date,
    title: string,
}

export interface IAccount {
    whatsapp_number: string,
    telegram_number: string,
    primary_email: string,
    aadhar_number: number,
    phone_number: string,
    student_id: number,

    upi_id: string,
    gst_number: string,

    gender: "MALE" | "FEMALE",
    father_name: string,
    blood_group: string,
    date_of_birth: Date,
    first_name: string,
    address: IAddress,
    last_name: string,
    longitude: number,
    latitude: number,

    user_type: "BUYER" | "SELLER" | "DISPATCHER" | "ADMIN" | "GENERAL",
    notifications: Array<INotification>,
    is_verified_by_admin: boolean,
    proof_documents: Array<any>,
    medical_history: Array<any>,
    last_field_update: Date,
    field_update: any,
    joined_at: Date,
};

const account_schema = new Schema<IAccount>({
    primary_email: { type: SchemaTypes.String, maxlength: 100, required: true, unique: true },
    aadhar_number: { type: SchemaTypes.Number, unique: true, sparse: true },
    student_id: { type: SchemaTypes.Number, unique: true, sparse: true },
    whatsapp_number: { type: SchemaTypes.String, maxlength: 20, },
    telegram_number: { type: SchemaTypes.String, maxlength: 20, },
    phone_number: { type: SchemaTypes.String, maxlength: 20, },

    user_type: { type: SchemaTypes.String, enum: ["BUYER", "SELLER", "DISPATCHER", "ADMIN", "GENERAL"], default: "GENERAL" },
    medical_history: [{ type: SchemaTypes.ObjectId, ref: 'Prescription' }],
    joined_at: { type: SchemaTypes.Date, default: () => Date.now() },
    is_verified_by_admin: SchemaTypes.Boolean,
    last_field_update: SchemaTypes.Date,
    gst_number: SchemaTypes.String,
    upi_id: SchemaTypes.String,

    gender: { type: SchemaTypes.String, enum: ["MALE", "FEMALE"] },
    first_name: { type: SchemaTypes.String, maxlength: 50 },
    last_name: { type: SchemaTypes.String, maxlength: 50 },
    date_of_birth: SchemaTypes.Date,
    father_name: SchemaTypes.String,
    blood_group: SchemaTypes.String,
    longitude: SchemaTypes.Number,
    latitude: SchemaTypes.Number,
    address: {
        additional_details: SchemaTypes.String,
        building: SchemaTypes.String,
        landmarks: SchemaTypes.String,
        city: SchemaTypes.String,
    },
    field_update: {
        proof_documents: { t: { type: SchemaTypes.Date, default: () => Date.now() }, s: { type: SchemaTypes.Boolean, default: false }, },
        blood_group: { t: { type: SchemaTypes.Date, default: () => Date.now() }, s: { type: SchemaTypes.Boolean, default: false }, },
        gst_number: { t: { type: SchemaTypes.Date, default: () => Date.now() }, s: { type: SchemaTypes.Boolean, default: false }, },
        address: { t: { type: SchemaTypes.Date, default: () => Date.now() }, s: { type: SchemaTypes.Boolean, default: false }, },
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
    deleteAccount(db_id: string): Promise<Boolean>,

    getUserRefAndTypeIdByEmail(primary_email: string): Promise<any>,
    getUserTypeByEmail(primary_email: string): Promise<string | null>,
    getUserDetailsMini(db_id: string): Promise<any>,
    getUserDetailsFull(db_id: string): Promise<any>,
}

export const AccountActions: IAccountActions = {
    async isEmailExists(primary_email: string): Promise<boolean> {
        return !!((await Account.findById(primary_email).select({ _id: 1 }).lean().exec())._id);
    },
    async getUserRefAndTypeIdByEmail(primary_email: string): Promise<any> {
        return await Account.findOne({ primary_email }).select({ _id: 1, user_type: 1 }).exec();
    },
    async createBasicAccount({
        first_name = '', last_name = '', primary_email, user_type,
    }: {
        primary_email: string, first_name?: string, last_name?: string, user_type: string,
    }) {
        const the_user = Account({ primary_email, user_type, first_name, last_name });
        await the_user.save();
        return the_user;
    },
    async getUserTypeByEmail(primary_email: string): Promise<string> {
        return (await Account.findOne({ primary_email }).select({ _id: 0, user_type: 1 }).lean().exec()).user_type
    },
    async deleteAccount(db_id: string): Promise<boolean> { return !!(await Account.findByIdAndDelete(db_id)) },

    async getUserDetailsMini(db_id: string): Promise<any> {
        return await Account.findById(db_id).select({
            is_verified_by_admin: 1,
            student_id: 1,
            first_name: 1,
            last_name: 1,
            user_type: 1,
            _id: 1,
        }).lean().exec();
    },
    async getUserDetailsFull(db_id: string): Promise<any> {
        return await Account.findById(db_id).select({
            is_verified_by_admin: 1, last_field_update: 1, whatsapp_number: 1, telegram_number: 1,
            primary_email: 1, aadhar_number: 1, date_of_birth: 1, notifications: 1, phone_number: 1,
            blood_group: 1, father_name: 1, student_id: 1, first_name: 1, last_name: 1, user_type: 1,
            address: 1, gender: 1, upi_id: 1, _id: 1,
        }).lean().exec()
    },
}

export default Account;