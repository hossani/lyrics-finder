import express from 'express';
import {unsubscribeNewsletter,subscribeNewsletter}from '../controllers/userControllers';
import authenticateUser from '../middlewares/authMiddlewares'

const userRouter = express.Router();
// Routes for user
userRouter.post('/newsletter/unsubscribe', authenticateUser,unsubscribeNewsletter);
userRouter.post('/newsletter/subscribe',authenticateUser, subscribeNewsletter);

export default userRouter;
