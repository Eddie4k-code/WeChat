import express from "express";
import cors from "cors";
import mongoose, { mongo } from 'mongoose';
import authRouter from "./routes/auth";
import serverRouter from "./routes/server";
import channelRouter from "./routes/channel";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(serverRouter);
app.use(channelRouter);

app.listen(process.env.port || 5000, () => {
    console.log("Backend is running");
});

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("Connected to MongoDB"));



