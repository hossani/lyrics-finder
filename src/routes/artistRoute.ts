import express from 'express';
import { uploadArtist } from '../middlewares/uploadArtistPicture';
import { addArtist, deleteArtist, updateArtist, getAllArtists, getArtist } from '../controllers/artistControllers'
const artistRouter = express.Router();

// Routes for artists
artistRouter.post('/artists', uploadArtist.single('picture'), addArtist);
artistRouter.put('/artists/:id', uploadArtist.single('picture'), updateArtist);
artistRouter.delete('/artists/:id', deleteArtist);
artistRouter.get('/artists', getAllArtists);
artistRouter.get('/artists/:id',getArtist)
export default artistRouter;
