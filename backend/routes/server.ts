import express, {Request, Response, NextFunction, Router} from 'express';
import UserModel from '../models/User';
import ServerModel from '../models/Server';
import verifyJWT from '../middleware/verifyJWT';
import Server from '../models/Server';

const serverRouter = Router();


//Create a new server!
serverRouter.post('/api/server/create', verifyJWT, async (req:Request, res:Response, next: NextFunction) => {
    try {
        const {serverName, username} = req.body;

        const serverExists = await ServerModel.findOne({serverName: serverName});
        const user = await UserModel.findOne({username});

        if (serverExists) {
            throw new Error("Server with that name already exists!");
        }

        const server = await ServerModel.create({
            serverName: serverName,
            channels: [],
            users: [user!._id] //Automatically assign the user that creates the server to the server.
        });

        server.save();


        return res.status(200).json({server});



    } catch(err: any) {
        return res.json({ErrorMessage: err.message});
    }
});


//Join a new server
serverRouter.post("/api/server/join", verifyJWT, async (req: Request, res: Response) => {

    try {

        const {serverName} = req.body;

        if (!serverName) {
            throw new Error("You must provide a server name.")
            return
        }

        //use web socket here to join the server in a live matter




    } catch(err:any) {


        return res.status(400).json({ErrorMessage: err.message});

    }

});

//add a new message to a server 
serverRouter.post("/api/server/message/new", verifyJWT, async (req: Request, res: Response) => {
    try {
        const { serverName, message, user} = req.body;

        if (!serverName) {
            throw new Error("Server name is missing...");
        }

        const server = await Server.findOne({ serverName });

        if (!server) {
            throw new Error("No server exists with the given name.");
        }

        server.messages.push({sender: req.body.user.id, text: message.text});
        await server.save();

        return res.status(200).json({ success: true, message: "Message added successfully." });

    } catch (err: any) {
        return res.status(400).json({ ErrorMessage: err.message });
    }
});









export default serverRouter;
