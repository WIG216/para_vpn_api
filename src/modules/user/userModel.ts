import mongoose, { Schema, Document } from 'mongoose';
import { IProfile } from '../profile/profileModel';

export interface IUser extends Document {
    username: string;
    password: string;
    profile: IProfile;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
    timestamps: true, 
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User