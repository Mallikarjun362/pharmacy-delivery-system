import { MONGODB_URI } from "@/utils/Constants";
import { debugLog } from "@/utils";
import mongoose from "mongoose";

const X: { [key: number]: string } = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    4: 'invalid credentials',
};

export const connectMongooseDB = async () => {
    await new Promise(r => setTimeout(r, 300));
    const status = mongoose.connection.readyState;
    if (!(status === 1 || status === 2) || true) {
        await mongoose.connect(MONGODB_URI).then(() => console.log("Mongoose connection successful"));
        mongoose.connection.on('connected', () => console.log('Connected'));
        mongoose.connection.on('disconnected', () => console.log('Disconnected'));
    }
    debugLog("DB connection", status, X[status as any],`(#Active conn: ${(mongoose?.connection as any)?.base?.connections?.length})`);
};
connectMongooseDB();