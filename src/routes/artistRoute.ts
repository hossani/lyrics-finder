import express from 'express';
import { uploadArtist } from '../middlewares/uploadArtistPicture';
import { addArtist, deleteArtist, updateArtist, getAllArtists, getArtist } from '../controllers/artistControllers'
import { isAdmin } from '../middlewares/checkAdmin';
import authenticateUser from '../middlewares/authMiddlewares';
const artistRouter = express.Router();

// Routes for artists
artistRouter.post('/artists',authenticateUser, isAdmin, uploadArtist.single('picture'), addArtist);
artistRouter.put('/artists/:id',authenticateUser, isAdmin, uploadArtist.single('picture'), updateArtist);
artistRouter.delete('/artists/:id',authenticateUser, isAdmin, deleteArtist);
/****************************************************** */
artistRouter.get('/artists', getAllArtists);
artistRouter.get('/artist',getArtist)
export default artistRouter;
