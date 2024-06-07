import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/userModels';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: any; 
  }

export const isAdmin: RequestHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        console.log("user : ", user)
        console.log("isAdmin: ",user.isAdmin)
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized: Only admin users are allowed to perform this action" })
        }

        next();

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
