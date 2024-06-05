import mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/userModels';
import {NotFoundError} from '../errors/index'

interface AuthenticatedRequest extends Request {
  user: any; 
}

// S'abonner à la newsletter
const subscribeNewsletter = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {userId}=req.user;

    const user = await User.findById(userId);
    if (!user)  throw new NotFoundError('User not found');
    if(user.newsletter){
        res.json({ message: 'Already, subscribed' });
    }else{
        user.newsletter = true;
        await user.save();
        res.json({ message: 'Subscribed to newsletter' });
    }
  } catch (err:any) {
    res.status(err.statusCode||500).json({ message: err.message });
  }
};

// Se désabonner de la newsletter
const unsubscribeNewsletter = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {userId}=req.user;
    const user = await User.findById(userId);
    if (!user)  throw new NotFoundError('User not found');
    if(!user.newsletter){
        res.json({ message: 'Already, unsubscribed' });
    }else{
        user.newsletter = false;
        await user.save();
        res.json({ message: 'Unsubscribed from newsletter' });
    }
  } catch (err:any) {
    res.status(err.statusCode||500).json({ message: err.message });
  }
};

export {unsubscribeNewsletter,subscribeNewsletter}