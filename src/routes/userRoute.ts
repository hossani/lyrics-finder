import express from 'express';
import {unsubscribeNewsletter,subscribeNewsletter, makeAdmin}from '../controllers/userControllers';
import authenticateUser from '../middlewares/authMiddlewares';
import { isAdmin } from '../middlewares/checkAdmin';
import {unsubscribeNewsletter,subscribeNewsletter}from '../controllers/userControllers';
import authenticateUser from '../middlewares/authMiddlewares'

const userRouter = express.Router();
// Routes for user
userRouter.post('/newsletter/unsubscribe', authenticateUser,unsubscribeNewsletter);
userRouter.post('/newsletter/subscribe',authenticateUser, subscribeNewsletter);


userRouter.put('/user/:id/makeadmin', authenticateUser, isAdmin, makeAdmin);

export default userRouter;
