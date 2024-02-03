import mongoose, { Schema, SchemaTypes } from "mongoose";
import { MONGODB_URI } from "@/utils/Constants";

export interface ICatalogueItem {
    is_prescription_required: boolean,
    stock_count: number,
    description: string,
    unit_price: number,
    title: string,
    seller: any,
};

const catalogue_item_schema = new Schema<ICatalogueItem>({
    is_prescription_required: { type: SchemaTypes.Boolean, default: false },
    seller: { type: SchemaTypes.ObjectId, ref: "Account", required: true },
    stock_count: { type: SchemaTypes.Number, min: 0, default: 0 },
    title: { type: SchemaTypes.String, maxlength: 200 },
    unit_price: { type: SchemaTypes.Number, min: 0 },
    description: { type: SchemaTypes.String },
});

if (!(global as any)._mongooseConnection) {
    mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
    (global as any)._mongooseConnection = mongoose.connection;
}

const CatalogueItem = mongoose.models.CatalogueItem as any || mongoose.model<ICatalogueItem>('CatalogueItem', catalogue_item_schema);

export default CatalogueItem;

interface ICatalogueItemActions {
    create(props: { seller_db_id: string, title: string, unit_price: number, stock_count?: number, description: string, is_prescription_required?: boolean }): Promise<boolean>,
    delete(db_id: string): Promise<boolean>,
};

export const CatalogueItemActions: ICatalogueItemActions = {
    async create({ seller_db_id, title, unit_price, stock_count = 0, description, is_prescription_required = false }) {
        if (!seller_db_id || unit_price < 0) return false;
        await CatalogueItem.create({ seller: seller_db_id, unit_price, title, stock_count, description, is_prescription_required });
        return true;
    },
    async delete(db_id) {
        await CatalogueItem.findByIdAndDelete(db_id);
        return true;
    },
};