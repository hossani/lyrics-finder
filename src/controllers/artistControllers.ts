import { Request, Response } from "express";
import Artist from '../models/artistModel';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
import { BadRequestError, NotFoundError } from "../errors";
import Song from "../models/songModel";
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
        res.status(500).json({ message: error })
        throw new BadRequestError("Failed to create artist");
    }
}

//Update an artist

export const updateArtist = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstname, lastname, genre, born_date, born_city, died_date } = req.body;
    const picture = req.file;
    try {
        const updatedArtist = await Artist.findById(id);

        console.log(`firstname: ${firstname}\nlastname: ${lastname}\ngenre: ${genre}\nborn city: ${born_city}\n died date: ${died_date}`)

        if (!updatedArtist) {
            throw new NotFoundError('Artist not found');
        }

        let picture_url = '';

        if (picture) {
            const result = await cloudinary.v2.uploader.upload(picture.path);
            picture_url = result.secure_url;
        }

        if (firstname && firstname !== '') {
            updatedArtist.firstname = firstname;
        }
        if (lastname && lastname !== '') {
            updatedArtist.lastname = lastname;
        }
        if (genre && genre !== '') {
            updatedArtist.genre = genre;
        }
        if (born_date && born_date !== '') {
            updatedArtist.born_date = born_date;
        }
        if (born_city && born_city !== '') {
            updatedArtist.born_city = born_city;
        }
        if (died_date && died_date !== '') {
            updatedArtist.died_date = died_date;
        }
        if (picture_url && picture_url !== '') {
            updatedArtist.picture_url = picture_url;
        }

        await updatedArtist.save();
        res.status(200).json(updatedArtist);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: error })
        throw new BadRequestError("Failed to update artist");
    }
}


//Remove an artist

export const deleteArtist = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedArtist = await Artist.findByIdAndDelete(id);
        
        if (!deletedArtist) {
            res.status(404).json("artist not found");
            throw new NotFoundError('Artist not found');
        }

        await Song.deleteMany({ artist: id });

        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error })
        throw new BadRequestError("Failed to delete artist");  
    }
}

//Display all artist
/******************************start**************** */
export const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await Artist.find().select('firstname lastname -_id');
        if(!artists){
            throw new NotFoundError("No artists found");
        }
        res.status(200).json(artists);
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}
/******************* end ***************************** */
// get one artist 
export const getArtist = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const artist = await Artist.findById(id);
        console.log(artist)
        if(!artist){
            throw new NotFoundError('artist not found');
        }
        res.status(200).json(artist);
    } catch (error:any) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}