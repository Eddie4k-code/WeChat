import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';


//used to verify a valid JWT token for a user on protected routes.
const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers;
    const authorizationHeader = headers.authorization as string;

    


    try {

        
        if (!authorizationHeader) {
            throw new Error("Not Authenticated....")
        }


        const token = authorizationHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET!);

        next();
    } catch(err:any) {
        return res.status(401).json({ErrorMessage: err.message});
    }

};

export default verifyJWT;