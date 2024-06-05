import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/userModels';
import dotenv from 'dotenv';
dotenv.config();

export const isAdmin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(401).json({ message: "Unathorized: Missing token"});
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET as Secret) as {userId: string};
        const user = await User.findById(decodeToken.userId);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized: Only admin users are allowed to perform this action" })
        }

        next();

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}