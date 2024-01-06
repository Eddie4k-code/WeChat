import express, {Request, Response, NextFunction, Router} from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcryptjs';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const authRouter = Router();


//Register
authRouter.post('/api/auth/register', async (req: Request, res: Response) => {
    try {

        const {username, password} = req.body;

        const userExists = await UserModel.findOne({username: username});

        if (userExists) {
            throw new Error("User with that Username already exists.");
        }

        if (!username || !password) {
            throw new Error("Username and password is required.")
        }


        //Generate Salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt.
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            username: username,
            password: hashedPassword
        });

        user.save();


        return res.status(200).json({message: "User Registered!"});

    } catch(err:any) {
        return res.json({ErrorMessage: err.message});
    }
});



//Login
authRouter.post('/api/auth/login', async (req: Request, res: Response) => {
    try {

        const {username, password} = req.body;

        if (!username || !password) {
            throw new Error("Username and password is required.")
        }

        const user = await UserModel.findOne({username: username});

        if (!user) {
            throw new Error("Incorrect username or password...");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error("Incorrect username or password...");
        }

        
        const userJwt = jwt.sign({id: user._id}, process.env.JWT_SECRET!);


        return res.status(200).json({username: username, token: userJwt});


    } catch(err:any) {
        return res.json({ErrorMessage: err.message});
    }
});




export default authRouter;