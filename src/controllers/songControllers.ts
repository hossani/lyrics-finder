import { Request, Response } from "express";
import Song from "../models/songModel";
import Artist from "../models/artistModel";
import { BadRequestError, NotFoundError } from "../errors";

//create a song
export const addSong = async (req: Request, res: Response) => {
    const {genre, title, recorded_date, lyrics} = req.body;
    const artistId = req.params.id
    try {
        const artist = await Artist.findById(artistId);
        if(!artist) {
            throw new NotFoundError('Artist not found');
        }

        console.log(`genre: ${genre} \n title: ${title} \n recorded_date: ${recorded_date} \n lyrics: ${lyrics} \n artist id: ${artist}`)

        const song = new Song({
            artist,
            genre,
            title,
            recorded_date,
            lyrics,
        });
        await song.save();

        artist.songs.push(song._id);
        await artist.save();

        res.status(201).json({ message: "created succefully" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
};

//Update a song 

export const updateSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {genre, title, recorded_date, lyrics} = req.body;

    console.log(`${genre}\n${title}\n${recorded_date}\n${lyrics}`)

    try{
        const updatedSong = await Song.findById(id);
        if(!updatedSong) {
            throw new NotFoundError('Song not found');
        }

        if(genre && genre !== ''){
            updatedSong.genre = genre;
        }
        if(title && title !== ''){
            updatedSong.title = title;
        }
        if(recorded_date && recorded_date !== ''){
            updatedSong.recorded_date = recorded_date;
        }
        if(lyrics && lyrics !== ''){
            updatedSong.lyrics = lyrics;
        }
        
        await updatedSong.save();
        res.status(200).json(updatedSong);
    }catch (error) {
        res.status(500).json({ message: error })
    }
}

//delete a song 

export const deleteSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const songToDelete = await Song.findById(id);
        if(!songToDelete){
            throw new NotFoundError('Song not found');
        }
        await songToDelete.deleteOne({ _id: id});
        res.status(200).json({ message: `Song deleted: ${songToDelete}` });
    }catch (error){
        res.status(500).json({ message: error })
    }}


/****************************************salma **************************************/
    export const getAllSongsByArtist = async (req: Request, res: Response) => {
        const {id}  = req.params;
    
        try {
            const artist = await Artist.findById(id).populate('songs');
    
            if (!artist) {
                throw new NotFoundError('Artist not found');
            }
    
            res.status(200).json(artist.songs);
            console.log(artist);
        } catch (error) {
            res.status(500).json({ message: error });
        }
};

export const getLyrics = async (req: Request, res: Response) => {
    const {title}  =req.query;
    console.log("req",req);

 
    try {
       const song = await Song.findOne({ title });
  
      if (!song) {
        throw new NotFoundError('Song not found');
      }

      res.status(200).json({ lyrics: song.lyrics }); 
     
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      res.status(500).json({ message: 'Error fetching lyrics' });
    }
  };