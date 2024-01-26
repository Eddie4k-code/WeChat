import mongoose, {Schema} from "mongoose";

//The shape of our server model.
interface ServerDocument extends Document {
    serverName: string
    channels: string[],
    messages: {
        sender: string;       
        text: string;
        timestamp?: Date
    }[];
}


const serverSchema = new Schema({
    serverName: {type: String, required: true},
    channels: [{type: Schema.Types.ObjectId, ref: 'Channel'}],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [{
        sender: { type: String, required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
});

const ServerModel = mongoose.model<ServerDocument>('Server', serverSchema);

export default ServerModel;


