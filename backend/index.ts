import express from "express";
import cors from "cors";
import mongoose, { mongo } from 'mongoose';
import authRouter from "./routes/auth";
import serverRouter from "./routes/server";
import {createServer} from 'http';
import Websocket from "./websocket/websocket";
require('dotenv').config();

const app = express();
const server = createServer(app);

const ws = Websocket.getInstance(server);


ws.on('connection', (socket) => {

    socket.on('join', (roomCode: number) => {
        //logic to join a server
    }); 

    socket.on("leave", (roomCode: number) => {
        //logic to leave a server
    });

    socket.on("sendMessage", (message: any) => {
        ws.in(message.room!).emit("messageSent", message.body);
    });

});



app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(serverRouter);


app.listen(process.env.port || 5000, () => {
    console.log("Backend is running");
});

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("Connected to MongoDB"));



