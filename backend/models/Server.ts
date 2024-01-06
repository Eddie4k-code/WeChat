import mongoose, {Schema} from "mongoose";

//The shape of our server model.
interface ServerDocument extends Document {
    serverName: string
    channels: string[]
}

const serverSchema = new Schema({
    serverName: {type: String, required: true},
    channels: [{type: Schema.Types.ObjectId, ref: 'Channel'}],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const ServerModel = mongoose.model<ServerDocument>('Server', serverSchema);

export default ServerModel;


