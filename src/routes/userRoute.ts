import express from 'express';
import {unsubscribeNewsletter,subscribeNewsletter, makeAdmin}from '../controllers/userControllers';
import authenticateUser from '../middlewares/authMiddlewares';
import { isAdmin } from '../middlewares/checkAdmin';


const userRouter = express.Router();
// Routes for user
userRouter.put('/newsletter/unsubscribe', authenticateUser,unsubscribeNewsletter);
userRouter.put('/newsletter/subscribe',authenticateUser, subscribeNewsletter);


userRouter.put('/user/:id/makeadmin', authenticateUser, isAdmin, makeAdmin);

export default userRouter;
