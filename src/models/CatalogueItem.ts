import { debugLog } from "@/utils";
import { MONGODB_URI } from "@/utils/Constants";
import mongoose, { Schema, SchemaTypes } from "mongoose";

export interface ICatalogueItem {
    stock_count: number,
    description: string,
    title: string,
    price: number,
    seller: any,
};

const catalogue_item_schema = new Schema<ICatalogueItem>({
    seller: { type: SchemaTypes.ObjectId, ref: "Account", required: true },
    stock_count: { type: SchemaTypes.Number, min: 0, default: 0 },
    title: { type: SchemaTypes.String, maxlength: 200 },
    price: { type: SchemaTypes.Number, min: 0 },
    description: { type: SchemaTypes.String },
});

if (!(global as any)._mongooseConnection) {
    mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
    (global as any)._mongooseConnection = mongoose.connection;
}

const CatalogueItem = mongoose.models.CatalogueItem as any || mongoose.model<ICatalogueItem>('CatalogueItem', catalogue_item_schema);

export default CatalogueItem;

interface ICatalogueItemActions {
    create(props: { seller_db_id: string, title: string, price: number, stock_count?: number, description: string }): Promise<boolean>,
    delete(_id: string): Promise<boolean>,
};

export const CatalogueItemActions: ICatalogueItemActions = {
    async create({ seller_db_id, title, price, stock_count = 0, description }) {
        if (!seller_db_id || price < 0) return false;
        await CatalogueItem.create({ seller: seller_db_id, price, title, stock_count, description });
        return true;
    },
    async delete(_id) {
        console.log("-----------------DELETE-------------------")
        await CatalogueItem.findByIdAndDelete(_id);
        return true;
    },
};