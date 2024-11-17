import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../user/userModel';

export interface IServer extends Document {
    name: string;
    image: string;
    creator: IUser['_id'];
}

const ServerSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, {
    timestamps: true, 
});
const Server = mongoose.model<IServer>('Server', ServerSchema);

export default Server