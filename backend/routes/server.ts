import express, {Request, Response, NextFunction, Router} from 'express';
import UserModel from '../models/User';
import ServerModel from '../models/Server';
import verifyJWT from '../middleware/verifyJWT';

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






export default serverRouter;
