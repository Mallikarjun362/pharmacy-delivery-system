import mongoose, { Schema, SchemaTypes } from "mongoose";
import ".";


export interface ICatalogItem {
    is_prescription_required: boolean,
    stock_count: number,
    description: string,
    unit_price: number,
    title: string,
    seller: any,
};

const catalog_item_schema = new Schema<ICatalogItem>({
    is_prescription_required: { type: SchemaTypes.Boolean, default: false },
    seller: { type: SchemaTypes.ObjectId, ref: "Account", required: true },
    stock_count: { type: SchemaTypes.Number, min: 0, default: 0 },
    title: { type: SchemaTypes.String, maxlength: 200 },
    unit_price: { type: SchemaTypes.Number, min: 0 },
    description: { type: SchemaTypes.String },
});

const CatalogItem = mongoose.models.CatalogItem as any || mongoose.model<ICatalogItem>('CatalogItem', catalog_item_schema);

export default CatalogItem;

interface ICatalogItemActions {
    create(props: { seller_db_id: string, title: string, unit_price: number, stock_count?: number, description: string, is_prescription_required: boolean }): Promise<boolean>,
    delete(db_id: string): Promise<boolean>,
};

export const CatalogItemActions: ICatalogItemActions = {
    async create({ seller_db_id, title, unit_price, stock_count = 0, description, is_prescription_required }) {
        if (!seller_db_id || unit_price < 0) return false;
        await CatalogItem.create({ seller: seller_db_id, unit_price, title, stock_count, description, is_prescription_required });
        return true;
    },
    async delete(db_id) {
        await CatalogItem.findByIdAndDelete(db_id);
        return true;
    },
};