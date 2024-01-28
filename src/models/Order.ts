import { Schema, SchemaTypes } from "mongoose";

interface IItem {
    dosage_details: string,
    title: string,
    cost: number,
};

enum OrderStatusType { "SAVED", "ORDER-PLACED", "PENDING", "REQUEST-APPROVAL", "CONFIRM", "OUT-FOR-DELIVARY", "DELIVERED", "CANCELED" };

interface IOrderEvent {
    event_type: OrderStatusType,
    timestamp: Date,
    by: any,
};

interface IOrder {
    buyer: any,
    seller: any,
    order_id: number,
    prescription: any,
    delivery_person: any,
    available_items: Array<IItem>,
    non_available_items: Array<IItem>,
    ordered_at: Date,
    expected_delivary: Date,
    order_status: OrderStatusType,
    order_timeline: Array<IOrderEvent>,
    payment_holder: "BUYER" | "SELLER" | "DELIVERY",
    payment_mode: "UPI" | "COD" | "WALLET",
    seller_feedback: {
        review: string,
        rating: 1 | 2 | 3 | 4 | 5,
    },
    delivery_feedback: {
        review: string,
        rating: 1 | 2 | 3 | 4 | 5,
    },
    location: {
        longitude: number,
        latitude: number,
    }
};

const order_schema = new Schema<IOrder>({});

export default order_schema;