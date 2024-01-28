import mongoose, { Model, Schema, SchemaType, SchemaTypes } from "mongoose";
import { MONGODB_URI } from "@/utils/Constants";

interface IAddress {
    additional_details: string,
    hostel_building: string,
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

    user_type: "BUYER" | "SELLER" | "DISPATCHER" | "ADMIN",
    notifications: Array<INotification>,
    is_verified_by_admin: boolean,
    proof_documents: Array<any>,
    medical_history: Array<any>,
    last_field_update: Date,
    field_update: any,
    joined_at: Date,
};

const account_schema = new Schema<IAccount>({
    primary_email: { type: SchemaTypes.String, maxlength: 50, required: true, unique: true },
    whatsapp_number: { type: SchemaTypes.String, maxlength: 20, unique: true, sparse: true },
    telegram_number: { type: SchemaTypes.String, maxlength: 20, unique: true, sparse: true },
    phone_number: { type: SchemaTypes.String, maxlength: 20, unique: true, sparse: true },
    aadhar_number: { type: SchemaTypes.Number, unique: true, sparse: true },
    student_id: { type: SchemaTypes.Number, unique: true, sparse: true },

    user_type: { type: SchemaTypes.String, enum: ["BUYER", "SELLER", "DISPATCHER", "ADMIN"], default: "BUYER" },
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
        hostel_building: SchemaTypes.String,
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

export interface ISearchKey { primary_email?: string, _id?: string };

interface IAccountActions {
    createBasicAccount(props: any): Promise<Boolean>,
    isEmailExists(primary_email: string): Promise<Boolean>,
    deleteAccount(primary_email: string): Promise<Boolean>,

    getUserRefIdByEmail(primary_email: string): Promise<string>,
    getUserDetails(primary_email: string): Promise<any>,
    getSearchKeyFilter(props: ISearchKey): Promise<any>,
    getUserType(primary_email: string): Promise<string>,
}

export const AccountActions: IAccountActions = {
    getUserRefIdByEmail: async (primary_email: string): Promise<string> => ((await Account.findOne({ primary_email }).select({ _id: 1 }).lean().exec())._id as mongoose.Types.ObjectId).toString(),
    getUserType: async (primary_email: string): Promise<string> => (await Account.findOne({ primary_email }).select({ _id: 0, user_type: 1 }).lean().exec()).user_type,
    getSearchKeyFilter: async ({ primary_email, _id }: ISearchKey) => _id ? new mongoose.Types.ObjectId(_id) : AccountActions.getUserRefIdByEmail(primary_email || ""),
    isEmailExists: async (primary_email: string): Promise<boolean> => !!(await Account.findOne({ primary_email }).select({ _id: 1 }).lean().exec()),
    deleteAccount: async (primary_email: string): Promise<boolean> => !!(await Account.findOneAndDelete({ primary_email })),

    getUserDetails: async (primary_email: string): Promise<any> => await Account.findOne({ primary_email }).select({
        is_verified_by_admin: 1,
        last_field_update: 1,
        whatsapp_number: 1,
        telegram_number: 1,
        aadhar_number: 1,
        primary_email: 1,
        date_of_birth: 1,
        notifications: 1,
        phone_number: 1,
        blood_group: 1,
        father_name: 1,
        student_id: 1,
        first_name: 1,
        last_name: 1,
        user_type: 1,
        address: 1,
        gender: 1,
        upi_id: 1,
        _id: 0,
    }).lean().exec(),

    createBasicAccount: async ({
        first_name = '', last_name = '', primary_email, user_type,
    }: {
        primary_email: string, first_name?: string, last_name?: string, user_type: string,
    }) => !!(await Account.create({ primary_email, user_type, first_name, last_name }).then(() => true).catch(() => true)),
}

export default Account;