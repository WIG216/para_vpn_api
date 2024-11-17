import mongoose, { Schema, Document } from 'mongoose';

export interface IPermission extends Document {
    title: string;
    description?: string;
    testing?: string;
}

const PermissionSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    testing: { type: String },
});

const Permission = mongoose.model<IPermission>('Permission', PermissionSchema);

export default  Permission
