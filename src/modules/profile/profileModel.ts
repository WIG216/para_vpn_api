import mongoose, { Schema, Document } from 'mongoose';
import { IPermission } from '../permissions/permissionModel';

export interface IProfile extends Document {
    title: string;
    description: string;
    permissions: IPermission["_id"];
}

const ProfileSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
});

const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
export default Profile
