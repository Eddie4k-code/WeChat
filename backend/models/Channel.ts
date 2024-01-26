import { Schema, model, Document } from 'mongoose';

/*
interface ChannelDocument extends Document {
    channelName: string;
    server: string;  // Reference to the Server model
    messages: {
        sender: string;       
        text: string;
        timestamp: Date;
    }[];
}

const channelSchema = new Schema({
    channelName: { type: String, required: true },
    server: { type: Schema.Types.ObjectId, ref: 'Server', required: true },  // Reference to Server model
    messages: [{
        sender: { type: String, required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
});

const ChannelModel = model<ChannelDocument>('Channel', channelSchema);

export default ChannelModel;

*/
