import { Server, Socket } from "socket.io";
import ServerModel from "../models/Server";

const EVENTS = {
    connection: "connection",
    CREATE_ROOM: "CREATE_ROOM",
    JOIN: "JOIN",
    SEND_MESSAGE: "SEND_MESSAGE"
};



const socketUtil = ({ io }: { io: Server }) => {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log("User connected", socket.id);

        /*
        * Join a chat room.
        */
        socket.on(EVENTS.JOIN, async (roomName: string, user: any) => {
            socket.join(roomName);
            console.log(`${user.username} joined room ${roomName}`);
            
            // Emit an event to the room that a user has joined
            io.to(roomName).emit(EVENTS.SEND_MESSAGE, { roomName: roomName, message: `${user.username} has joined the room!`, user: 'admin' });
        });

        /* Send Message to room */
        socket.on(EVENTS.SEND_MESSAGE, (roomName: string, message: string, user: any) => {
            // Broadcast the message to everyone in the room
            io.to(roomName).emit(EVENTS.SEND_MESSAGE, { user: user.username, message });
        });
    });
}

export default socketUtil;

