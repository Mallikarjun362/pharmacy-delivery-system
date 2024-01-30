import { MONGODB_URI } from "@/utils/Constants";
import mongoose, { Schema, SchemaTypes } from "mongoose";

export interface ICatalogueItem {
    stock_count: number,
    title: string,
    price: number,
    seller: any,
};

const catalogue_item_schema = new Schema<ICatalogueItem>({
    seller: { type: SchemaTypes.String, ref: "Seller", required: true },
    stock_count: { type: SchemaTypes.Number, min: 0, default: 0 },
    title: { type: SchemaTypes.String, maxlength: 100 },
    price: { type: SchemaTypes.Number, min: 0 },
});

if (!(global as any)._mongooseConnection) {
    mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
    (global as any)._mongooseConnection = mongoose.connection;
}

const CatalogueItem = mongoose.models.CatalogueItem as any || mongoose.model<ICatalogueItem>('CatalogueItem', catalogue_item_schema);

export default CatalogueItem;

interface ICatalogueItemActions {
    create({ seller_email, title, price }: any): Promise<boolean>,
    delete(_id: string): Promise<boolean>,
};

export const CatalogueItemActions: ICatalogueItemActions = {
    async create({ seller_email, title, price }: any): Promise<boolean> {
        if (!seller_email) return false;
        await CatalogueItem.create({ seller: seller_email, price, title, })
        return true;
    },
    async delete(_id: string): Promise<boolean> {
        await CatalogueItem.findByIdAndDelete(_id).exec();
        return true;
    },
};