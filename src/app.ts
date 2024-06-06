import express, { Application, Request, Response } from 'express';
import connectDB from "./config/database";
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './models/db';
dotenv.config();
const app:Application=express();

app.use(express.json());
console.log(connectDB());
app.use("/", routes);
//Example de test 
app.get('/root',(req:Request,res:Response)=>{

    console.log('Reponse de server!!!');
    res.status(200).json({message:'hello world'});
})
connectDB();
app.use(routes);

const port:number|any=process.env.APP_PORT || 8000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})