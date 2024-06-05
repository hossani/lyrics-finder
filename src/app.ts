import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './models/db';
import cron from 'node-cron';
import sendNewsletter from './middlewares/sendNewsletterMiddlewares';
import User from './models/userModels';

dotenv.config();
connectDB();

const app:Application=express();
cron.schedule('0 52 19 * * 3',sendNewsletter);
app.use(express.json());
//Example de test 
app.get('/root',(req:Request,res:Response)=>{

    console.log('Reponse de server!!!');
    res.status(200).json({message:'hello world'});
})
app.use(routes);

app.post('/users', async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password, isAdmin, otp, dateExpiration, newsletter } = req.body;

        // Créer un nouvel utilisateur
        const newUser = new User({
            firstname,
            lastname,
            email,
            password,
            isAdmin,
            otp,
            dateExpiration,
            newsletter
        });

        // Enregistrer le nouvel utilisateur dans la base de données
        const savedUser = await newUser.save();

        res.status(201).json(savedUser); // Répondre avec les données de l'utilisateur créé
    } catch (error:any) {
        res.status(400).json({ message: error.message }); // Gérer les erreurs
    }
});

const port:number|any=process.env.APP_PORT || 8000;
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})