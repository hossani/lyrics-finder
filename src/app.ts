import express, { Application, Request, Response } from 'express';
import connectDB from "./config/database";
import dotenv from 'dotenv';
import Song from './models/songModel';
import Artist from './models/artistModel';


import routes from './routes/authRoute'
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

 /** ******************************** */
// Route POST pour créer une nouvelle chanson
app.post('/songs', async (req: Request, res: Response) => {
    const { genre, title, recorded_date, lyrics, artist } = req.body;
    
    const newSong = new Song({
    genre,
    title,
    recorded_date: new Date(recorded_date),
    lyrics,
    artist
    });
    
    try {
    await newSong.validate(); // Validation des données
    const savedSong = await newSong.save();
    // Mise à jour de l'artiste avec la nouvelle chanson
    const findArtist = await Artist.findById(artist);
    if (findArtist) {
    findArtist.songs.push(savedSong._id);
    await findArtist.save();
    }res.status(201).json(savedSong);
} catch (error) {
res.status(400).json({ message: 'Error saving song', error });
}
});
    
    app.post('/artists', async (req: Request, res: Response) => {
    const { firstname, lastname, picture_url, genre, born_date, born_city, died_date, songs } = req.body;
    
    // Créer un nouvel artiste
    const newArtist = new Artist({
    firstname,
    lastname,
    picture_url,
    genre,
    born_date: new Date(born_date),
    born_city,
    died_date: died_date ? new Date(died_date) : undefined,
    songs
    });
    const artist = await newArtist.save();
    
    res.status(200).json(artist);
    });

 /*********************************** */
const port:number|any=process.env.APP_PORT || 7000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})