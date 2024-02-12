import mongoose, { Schema, SchemaTypes } from "mongoose";
import ".";
import UserFile from "./UserFile";

export interface IPrescription {
    timestamp: Date,
    title: string,
    buyer: any,
    file: any,
};

const prescription_schema = new Schema<IPrescription>({
    timestamp: { type: SchemaTypes.Date, default: () => Date.now() },
    file: { type: SchemaTypes.ObjectId, ref: "UserFile" },
    title: { type: SchemaTypes.String, maxlength: 100, },
    buyer: { type: SchemaTypes.ObjectId, ref: "Buyer" },
});

const Prescription = mongoose.models.Prescription as any || mongoose.model<IPrescription>('Prescription', prescription_schema);

export default Prescription;

interface IPrescriptionActions {
    addPrescription(props: { file: File, title: string, buyer_db_id: string }): Promise<boolean>,
    getMyPrescriptions(buyer_db_id: string): Promise<Array<IPrescription>>,
    deletePrescription(_id: string): Promise<boolean>,
    getImage(_id: string): Promise<any>,
}

export const PrescriptionActions: IPrescriptionActions = {
    addPrescription: async ({ file, title, buyer_db_id }) => {
        const newUserFile = new UserFile({
            file: Buffer.from(await file?.arrayBuffer()),
            doc_type: "PRESCRIPTION",
            extension: file.type,
            title: title,
        });
        await newUserFile.save();
        const new_prescription = new Prescription({ buyer: buyer_db_id, file: newUserFile?._id, title, });
        await new_prescription.save();
        return new_prescription;
    },

    getMyPrescriptions: async (buyer_db_id: string) => await Prescription
        .find({ buyer: new mongoose.Types.ObjectId(buyer_db_id) })
        .select({ timestamp: 1, title: 1, file: 1, }).lean().exec()
        .then((data: any) => JSON.parse(JSON.stringify(data))),

    getImage: async (_id): Promise<Array<string>> => (await Prescription.findById(_id)
        .select({ file: 1, _id: 0 })
        .populate({ path: 'file', select: { file: 1 } }).lean().exec()).file.file.toString('base64'),
    deletePrescription: async (_id: string) => !!(await Prescription.findOneAndDelete({ _id }).exec()),
}