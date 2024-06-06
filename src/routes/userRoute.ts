import express from 'express';
import {unsubscribeNewsletter,subscribeNewsletter}from '../controllers/userControllers';

const userRouter = express.Router();
// Routes for user
userRouter.post('/newsletter/unsubscribe', unsubscribeNewsletter);
userRouter.post('/newsletter/subscribe', subscribeNewsletter);

export default userRouter;
