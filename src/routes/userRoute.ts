import express from 'express';
import {unsubscribeNewsletter,subscribeNewsletter, makeAdmin}from '../controllers/userControllers';
import authenticateUser from '../middlewares/authMiddlewares';
import { isAdmin } from '../middlewares/checkAdmin';

const userRouter = express.Router();
// Routes for user
userRouter.post('/newsletter/unsubscribe', unsubscribeNewsletter);
userRouter.post('/newsletter/subscribe', subscribeNewsletter);


userRouter.put('/user/:id/makeadmin', authenticateUser, isAdmin, makeAdmin);

export default userRouter;
