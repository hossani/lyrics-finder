import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './models/db';
import User from './models/userModels';
dotenv.config();
import Song from './models/songModel'; // Assurez-vous que le chemin est correct
import Artist from './models/artistModel'; // Assurez-vous que le chemin est correct

const app:Application=express();

connectDB();

app.use(express.json());

//Example de test 
app.get('/root',(req:Request,res:Response)=>{

    console.log('Reponse de server!!!');
    res.status(200).json({message:'hello world'});
});

app.post('/api/users', async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, email, password } = req.body;
  
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = new User({
        firstname,
        lastname,
        email,
        password
      });
  
      await user.save();
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Route POST pour créer une nouvelle chanson
app.post('/songs', async (req: Request, res: Response) => {
    const { genre, title, recorded_date, lyrics, artist } = req.body;
  
    const newSong = await Song.create({
      genre,
      title,
      recorded_date: new Date(recorded_date),
      lyrics,
      artist
    });
  
    try {
// Mise à jour de l'artiste avec la nouvelle chanson
const findArtist = await Artist.findById(artist);
if (findArtist) {
  findArtist.songs.push(newSong._id);
    await findArtist.save();
}

      res.status(201).json(newSong);
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

const port:number|any=process.env.APP_PORT || 8000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})