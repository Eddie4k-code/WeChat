import express from "express";
import cors from "cors";
import mongoose, { mongo } from 'mongoose';
import authRouter from "./routes/auth";
import {createServer} from 'http';
import { Server, Socket } from "socket.io";
import socketUtil from "./socket/socket";
require('dotenv').config();

const app = express();
const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});





app.use(cors());
app.use(express.json());

app.use(authRouter);


server.listen(process.env.port || 5000, () => {
    console.log("Backend is running");
    socketUtil({io});
});

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("Connected to MongoDB"));



