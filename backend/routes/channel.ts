import express, {Request, Response, NextFunction, Router} from 'express';
import UserModel from '../models/User';
import ServerModel from '../models/Server';
import verifyJWT from '../middleware/verifyJWT';
import { Server } from 'http';
import ChannelModel from '../models/Channel';

const channelRouter = Router();


//Create a new server!
channelRouter.post('/api/channel/create', verifyJWT, async (req:Request, res:Response, next: NextFunction) => {
    try {
        const {serverName, channelName} = req.body;

        const server = await ServerModel.findOne({serverName: serverName});

        if (!server) {
            throw new Error("Server does not exist");
        }

        const newChannel = await ChannelModel.create({
            channelName: channelName,
            server: server._id,
            messages: []
        });

        newChannel.save();

        server.channels.push(newChannel._id);

        server.save();

        return res.json({server: server.channels});

        



      
    } catch(err: any) {
        return res.json({ErrorMessage: err.message});
    }
});


export default channelRouter;
