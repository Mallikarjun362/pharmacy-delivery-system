import mongoose, { Schema, SchemaTypes } from "mongoose";
import ".";

export interface IUserFile {
    description: string,
    extension: string,
    doc_type: string,
    timestamp: Date,
    title: string,
    file: File,
};

const user_file_schema = new Schema<IUserFile>({
    timestamp: { type: SchemaTypes.Date, default: () => Date.now() },
    file: { type: SchemaTypes.Buffer, required: true },
    description: { type: SchemaTypes.String },
    extension: { type: SchemaTypes.String },
    doc_type: { type: SchemaTypes.String },
    title: { type: SchemaTypes.String },
});

const UserFile = mongoose.models.UserFile as any || mongoose.model<IUserFile>('UserFile', user_file_schema);

export default UserFile;