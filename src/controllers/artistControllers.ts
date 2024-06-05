import { Request, Response } from "express";
import Artist from '../models/artistModel';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()


//config Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//Add an artist

export const addArtist = async (req: Request, res: Response) =>{
    const { firstname, lastname, genre, born_date, born_city, died_date} = req.body;
    const picture = req.file;
    try {

        let picture_url = '';

        if(picture) {
            const result = await cloudinary.v2.uploader.upload(picture.path);
            picture_url = result.secure_url;
        }

        const artist = new Artist({
            firstname,
            lastname,
            picture_url,
            genre,
            born_date,
            born_city,
            died_date
        });
    
        await artist.save({wtimeout: 20000});
        res.status(201).json({ message: "artist created seccusefully!!"});
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error});
    }
}

//Update an artist

export const updateArtist = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstname, lastname, genre, born_date, born_city, died_date } = req.body;
    const picture = req.file;
    try {
        const updatedArtist = await Artist.findById(id);

        if (!updatedArtist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        let picture_url = '';

        if (picture) {
            const result = await cloudinary.v2.uploader.upload(picture.path);
            picture_url = result.secure_url;
        }

        updatedArtist.firstname = firstname;
        updatedArtist.lastname = lastname;
        updatedArtist.genre = genre;
        updatedArtist.born_date = born_date;
        updatedArtist.born_city = born_city;
        updatedArtist.died_date = died_date;
        if (picture_url !== '') {
            updatedArtist.picture_url = picture_url;
        }
        await updatedArtist.save();
        res.status(200).json(updatedArtist);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//Remove an artist

export const deleteArtist = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedArtist = await Artist.findByIdAndDelete(id);
        if (!deletedArtist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error });  
    }
}

//Display all artist

export const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await Artist.find();
        if(!artists){
            return res.status(404).json({ message: "No artist found!!"});
        }
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}