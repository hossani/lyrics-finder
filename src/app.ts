import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './models/db';
import cron from 'node-cron';
import sendNewsletter from './middlewares/sendNewsletterMiddlewares';
import User from './models/userModels';

import Song from './models/songModel';
import Artist from './models/artistModel';



dotenv.config();
connectDB();

const app:Application=express();
cron.schedule('0 52 19 * * 3',sendNewsletter);
app.use(express.json());
console.log(connectDB());
//Example de test 
app.use(express.urlencoded({extended:true}))
app.get('/root',(req:Request,res:Response)=>{

    console.log('Reponse de server!!!');
    res.status(200).json({message:'hello world'});
})
app.use(routes);

const port:number|any=process.env.APP_PORT || 7000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})