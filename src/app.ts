import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app:Application=express();

app.use(express.json());

//Example de test 
app.get('/root',(req:Request,res:Response)=>{

    console.log('Reponse de server!!!');
    res.status(200).json({message:'hello world'});
})

const port:number|any=process.env.APP_PORT || 8000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})