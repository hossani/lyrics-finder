import mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/userModels';
import {BadRequestError, NotFoundError} from '../errors/index'

interface AuthenticatedRequest extends Request {
  user: any; 
}

// S'abonner à la newsletter
const subscribeNewsletter:any = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId=req.user.id;
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
const unsubscribeNewsletter:any = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId=req.user.id;
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

//change user's to udmin and viceversa 

export const makeAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isAdmin } = req.body;
  try {
    const userTomakeAdmin = await User.findById(id);
    console.log(`User: ${userTomakeAdmin}\nisAdmin: ${isAdmin}`);

    if(!userTomakeAdmin) {
      res.status(404).json("user not found");
      throw new NotFoundError('User not found');
    }

    if (isAdmin && isAdmin !== ''){
      userTomakeAdmin.isAdmin = isAdmin;
    }

    await userTomakeAdmin.save();
    if (isAdmin){
      res.status(200).json(`user turned to admin: ${userTomakeAdmin.firstname}`);
    }else{
      res.status(200).json(`user no longer an admin: ${userTomakeAdmin.firstname}`);
    }
  } catch (error) {
    console.log(error)
    throw new BadRequestError('operation failed ')
  }
}