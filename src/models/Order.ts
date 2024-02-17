import mongoose, { Schema, SchemaTypes } from "mongoose";
import Prescription from "./Prescription";
import ".";

export interface IOrderItem {
    dosage_details: string,
    unit_price: number,
    quantity: number,
    title: string,
};

export interface IMessage {
    m: string,
    s: "BUYER" | "SELLER" | "DISPATCHER",
    t: Date,
}

interface IAddress {
    additional_details: string,
    landmarks: string,
    building: string,
    city: string,
};

export type OrderStatus = "PLACED" | "CONFIRMED" | "DISPATCHED" | "RECEIVED" | "CONFIRMATION-REQUEST" | "REJECTED" | "CANCELED" | "REFUND-REQUEST" | "REFUND-WAITING" | "REFUND-DONE";
export const OrderStatusValues: Array<OrderStatus> = [
    // PRE
    "PLACED", "CONFIRMATION-REQUEST",
    // MAIN
    "CONFIRMED", "DISPATCHED", "RECEIVED",
    // MISC
    "REJECTED", "CANCELED",
    // POST
    "REFUND-REQUEST", "REFUND-WAITING", "REFUND-DONE"
];
export interface IOrder {
    delivery_feedback: { review: string, rating: 1 | 2 | 3 | 4 | 5, },
    seller_feedback: { review: string, rating: 1 | 2 | 3 | 4 | 5, },
    delivery_location: { longitude: number, latitude: number, },
    timeline: Array<{ event: OrderStatus, t: Date }>,
    non_available_items: Array<IOrderItem>,
    available_items: Array<IOrderItem>,
    delivery_address: IAddress,
    order_status: OrderStatus,
    cancel_reason: string,
    reject_reason: string,
    total_cost: number,
    prescription: any,
    dispatcher: any,
    seller: any,
    otp: number,
    messages: Array<IMessage>,
    buyer: any,
    payment: {
        package_holder: { B: -1 | 0 | 1, S: -1 | 0 | 1, D: -1 | 0 | 1, },
        payment_holder: { B: -1 | 0 | 1, S: -1 | 0 | 1, D: -1 | 0 | 1, },
        mode: "UPI" | "COD" | "WALLET",
        upi_id: string,
    },
};

const order_schema = new Schema<IOrder>({
    delivery_feedback: { review: SchemaTypes.String, rating: { type: SchemaTypes.Number, enum: [1, 2, 3, 4, 5,] } },
    seller_feedback: { review: SchemaTypes.String, rating: { type: SchemaTypes.Number, enum: [1, 2, 3, 4, 5,] } },
    timeline: [{ event: { type: SchemaTypes.String, enum: OrderStatusValues }, t: SchemaTypes.Date }],
    delivery_location: { longitude: SchemaTypes.Number, latitude: SchemaTypes.Number, },
    seller: { type: SchemaTypes.ObjectId, ref: "Account", required: true },
    buyer: { type: SchemaTypes.ObjectId, ref: "Account", required: true },
    order_status: { type: SchemaTypes.String, enum: OrderStatusValues },
    prescription: { type: SchemaTypes.ObjectId, ref: "Prescription" },
    dispatcher: { type: SchemaTypes.ObjectId, ref: "Account" },
    total_cost: { type: SchemaTypes.Number, min: 0 },
    cancel_reason: SchemaTypes.String,
    reject_reason: SchemaTypes.String,
    otp: SchemaTypes.Number,
    delivery_address: {
        additional_details: SchemaTypes.String,
        landmarks: SchemaTypes.String,
        building: SchemaTypes.String,
        city: SchemaTypes.String,
    },
    non_available_items: [{
        title: { type: SchemaTypes.String, maxlength: 100 },
        unit_price: { type: SchemaTypes.Number, min: 0 },
        dosage_details: SchemaTypes.String,
        quantity: SchemaTypes.Number,
    }],
    available_items: [{
        title: { type: SchemaTypes.String, maxlength: 100 },
        unit_price: { type: SchemaTypes.Number, min: 0 },
        dosage_details: SchemaTypes.String,
        quantity: SchemaTypes.Number,
    }],
    messages: [{
        s: { type: SchemaTypes.String, enum: ["BUYER", "SELLER", "DISPATCHER"] },
        m: SchemaTypes.String,
        t: SchemaTypes.Date
    }],
    payment: {
        package_holder: {
            B: { type: SchemaTypes.Number, enum: [-1, 0, 1] },
            S: { type: SchemaTypes.Number, enum: [-1, 0, 1] },
            D: { type: SchemaTypes.Number, enum: [-1, 0, 1] },
        },
        payment_holder: {
            B: { type: SchemaTypes.Number, enum: [-1, 0, 1] },
            S: { type: SchemaTypes.Number, enum: [-1, 0, 1] },
            D: { type: SchemaTypes.Number, enum: [-1, 0, 1] },
        },
        mode: { type: SchemaTypes.String, enum: ["UPI", "COD", "WALLET"] },
        upi_id: SchemaTypes.String,
    },
});

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