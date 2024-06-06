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
        res.status(201).json({ message: "created succefully" })
    } catch (error) {
        throw new BadRequestError("Failed to create song");
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
        throw new BadRequestError("Failed to update song");
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
        throw new BadRequestError("Failed to delete song");
    }
}

//display all songs 

export const getAllSongs = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find();
        if(!songs){
            throw new NotFoundError("No songs found");
        }
        res.status(200).json(songs);
    } catch (error) {
        throw new BadRequestError("Failed to fetch songs");
    }
}


// Get all songs of an artist
export const getSongsByArtist = async (req: Request, res: Response) => {
    const { artistId } = req.params;
    try {
        const artist = await Artist.findById(artistId);
        if (!artist) {
            throw new NotFoundError('Artist not found');
        }
        const songs = await Song.find({ artist: artistId });
        if (!songs || songs.length === 0) {
            throw new NotFoundError("No songs found for this artist");
        }
        res.status(200).json(songs);
    } catch (error) {
        throw new BadRequestError("Failed to fetch songs for this artist");
    }
};


// Get lyrics of a song
export const getSongLyrics = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const song = await Song.findById(id);
        if (!song) {
            throw new NotFoundError('Song not found');
        }
        res.status(200).json({ lyrics: song.lyrics });
    } catch (error) {
        throw new BadRequestError("Failed to fetch song lyrics");
    }
};