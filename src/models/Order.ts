import mongoose, { Schema, SchemaTypes } from "mongoose";
import { MONGODB_URI } from "@/utils/Constants";
import Prescription from "./Prescription";

export interface IOrderItem {
    dosage_details: string,
    unit_price: number,
    quantity: number,
    title: string,
};

interface IAddress {
    additional_details: string,
    landmarks: string,
    building: string,
    city: string,
};

interface IOrder {
    delivery_feedback: { review: string, rating: 1 | 2 | 3 | 4 | 5, },
    seller_feedback: { review: string, rating: 1 | 2 | 3 | 4 | 5, },
    delivery_location: { longitude: number, latitude: number, },
    non_available_items: Array<IOrderItem>,
    available_items: Array<IOrderItem>,
    delivery_address: IAddress,
    total_cost: number,
    order_status: "PLACED" | "CONFIRMED" | "DISPATCHED" | "RECEIVED" | "CONFIRMATION-REQUEST" | "REJECTED" | "CANCELED" | "REFUND-REQUEST" | "REFUND-WAITING" | "REFUND-DONE",
    prescription: any,
    dispatcher: any,
    otp: number,
    seller: any,
    buyer: any,
    timestamp: {
        orderPlaced: Date,
        requestBuyerApproal: Date,
        buyerConfirm: Date,
        dispatched: Date,
        delivered: Date,
        canceled: Date,
        expected_delivary: Date,
    },
    payment: {
        payment_holder: "BUYER" | "SELLER" | "DISPATCHER",
        mode: "UPI" | "COD" | "WALLET",
        upi_id: string,
    },
};

const order_schema = new Schema<IOrder>({
    delivery_location: { longitude: SchemaTypes.Number, latitude: SchemaTypes.Number, },
    prescription: { type: SchemaTypes.ObjectId, ref: "Prescription", required: true },
    seller: { type: SchemaTypes.ObjectId, ref: "Account", required: true },
    buyer: { type: SchemaTypes.ObjectId, ref: "Account", required: true },
    total_cost: { type: SchemaTypes.Number, min: 0 },
    delivery_address: {
        building: SchemaTypes.String,
        additional_details: SchemaTypes.String,
        landmarks: SchemaTypes.String,
        city: SchemaTypes.String,
    },

    non_available_items: [{
        title: { type: SchemaTypes.String, maxlength: 100 },
        cost: { type: SchemaTypes.Number, min: 0 },
        dosage_details: SchemaTypes.String,
    }],
    available_items: [{
        title: { type: SchemaTypes.String, maxlength: 100 },
        cost: { type: SchemaTypes.Number, min: 0 },
        dosage_details: SchemaTypes.String,
    }],
    delivery_feedback: { review: SchemaTypes.String, rating: { type: SchemaTypes.Number, enum: [1, 2, 3, 4, 5,] } },
    seller_feedback: { review: SchemaTypes.String, rating: { type: SchemaTypes.Number, enum: [1, 2, 3, 4, 5,] } },
    dispatcher: { type: SchemaTypes.String, ref: "Dispatcher" },
    otp: SchemaTypes.Number,
    timestamp: {
        orderPlaced: SchemaTypes.Date,
        requestBuyerApproal: SchemaTypes.Date,
        buyerConfirm: SchemaTypes.Date,
        dispatched: SchemaTypes.Date,
        delivered: SchemaTypes.Date,
        canceled: SchemaTypes.Date,
        expected_delivary: SchemaTypes.Date,
    },
    payment: {
        package_holder: { type: SchemaTypes.String, enum: ["BUYER", "SELLER", "DISPATCHER"] },
        payment_holder: { type: SchemaTypes.String, enum: ["BUYER", "SELLER", "DISPATCHER"] },
        mode: { type: SchemaTypes.String, enum: ["UPI", "COD", "WALLET"] },
        upi_id: SchemaTypes.String,
    },
});

if (!(global as any)._mongooseConnection) {
    mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
    (global as any)._mongooseConnection = mongoose.connection;
}

const Order = mongoose.models.Order as any || mongoose.model<IOrder>('Order', order_schema);

export default Order;

interface IOrderActions {
    placeOrderFromPrescription(props: {
        prescription_db_id: string, seller_db_id: string, buyer_db_id: string,
    }): Promise<boolean>,
    confirmOrderAndMakePayment(props: any): Promise<boolean>,
};

export const OrderActions: IOrderActions = {
    async placeOrderFromPrescription({ prescription_db_id, seller_db_id, buyer_db_id, }) {
        const the_order = Order({ prescription: prescription_db_id, seller: seller_db_id, buyer: buyer_db_id, });
        await the_order.save();
        await Prescription.findByIdAndUpdate(prescription_db_id, {
            main_order: the_order._id,
        });
        return true;
    },
    async confirmOrderAndMakePayment() { return true; },
};