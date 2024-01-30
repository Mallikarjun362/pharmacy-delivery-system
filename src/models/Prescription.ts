import { MONGODB_URI } from "@/utils/Constants";
import mongoose, { Schema, SchemaTypes } from "mongoose";
import { AccountActions } from "./Account";

export interface IPrescription {
    image_files: Array<Buffer>,
    main_order: any,
    timestamp: Date,
    title: string,
    buyer: any,
};

const prescription_schema = new Schema<IPrescription>({
    timestamp: { type: SchemaTypes.Date, default: () => Date.now() },
    main_order: { type: SchemaTypes.ObjectId, ref: "Order" },
    title: { type: SchemaTypes.String, maxlength: 100, },
    buyer: { type: SchemaTypes.ObjectId, ref: "Buyer" },
    image_files: [{ type: SchemaTypes.Buffer }],
});

if (!(global as any)._mongooseConnection) {
    mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
    (global as any)._mongooseConnection = mongoose.connection;
}

const Prescription = mongoose.models.Prescription as any || mongoose.model<IPrescription>('Prescription', prescription_schema);

export default Prescription;

interface IPrescriptionActions {
    addPrescription({ image_files, title, buyer_db_id }: { image_files: Array<any>, title: string, buyer_db_id: string }): Promise<boolean>,
    getMyPrescriptions(buyer_db_id: string): Promise<Array<any>>,
    deletePrescription(_id: string): Promise<boolean>,
    placeOrder(props: any): Promise<boolean>,
    getImages(_id: string): Promise<any>,
}

export const PrescriptionActions: IPrescriptionActions = {
    addPrescription: async ({ image_files, title, buyer_db_id }: { image_files: Array<any>, title: string, buyer_db_id: string }): Promise<boolean> => !!(
        await Prescription.create({ buyer: buyer_db_id, image_files, title, })
    ),
    deletePrescription: async (_id: string): Promise<boolean> => !!(await Prescription.findOneAndDelete({ _id }).exec()),
    getMyPrescriptions: async (buyer_db_id: string): Promise<Array<IPrescription>> => await Prescription
        .find({ buyer: new mongoose.Types.ObjectId(buyer_db_id) }).select({ timestamp: 1, title: 1 }).lean().exec().then((data: any) => JSON.parse(JSON.stringify(data))),
    placeOrder: async (_id): Promise<boolean> => {
        // const the_prescription = Prescription.findById(_id);
        // const new_order = 
        return true;
    },
    getImages: async (_id): Promise<Array<string>> => {
        const val = (await Prescription.findById(_id).select({ image_files: 1, _id: 0 }).lean().exec()).image_files.map((val: any) => val.toString('base64'));
        return val
    },
}