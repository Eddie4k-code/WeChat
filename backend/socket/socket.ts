import { Server, Socket } from "socket.io";
import ServerModel from "../models/Server";

const EVENTS = {
    connection: "connection",
    CREATE_ROOM: "CREATE_ROOM",
    JOIN: "JOIN",
    SEND_MESSAGE: "SEND_MESSAGE"
};

//Shape of data for th
interface IUser {
    username: string
    token: string
}

//Shape of data that is sent through the "SEND_MESSAGE" event.
interface SendMessageData {
    roomName: string
    user: IUser
    message: string
}

//Shape of data that is sent through the "JOIN" event.
interface JoinData {
    roomName: string
    user: IUser
}



const socketUtil = ({ io }: { io: Server }) => {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log("User connected", socket.id);

        /*
        * Join a chat room.
        */
        socket.on(EVENTS.JOIN, async (joinData: JoinData) => {
            socket.join(joinData.roomName);
            
            // Emit an event to the room that a user has joined
            io.to(joinData.roomName).emit(EVENTS.SEND_MESSAGE, { roomName: joinData.roomName, user: {username: 'admin', token: '123'}, message: `${joinData.user.username} has joined the room!`});
        });

        /* Send Message to room */
        socket.on(EVENTS.SEND_MESSAGE, (sendMessagaData: SendMessageData) => {
            // Broadcast the message to everyone in the room
            io.to(sendMessagaData.roomName).emit(EVENTS.SEND_MESSAGE, { roomName: sendMessagaData.roomName, user: sendMessagaData.user, message: sendMessagaData.message });
        });
    });
}

export default socketUtil;

