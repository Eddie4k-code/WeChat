
import { Schema, model, Document } from 'mongoose';

interface UserDocument extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;