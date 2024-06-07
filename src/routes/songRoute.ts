import express from 'express';
import { addSong, updateSong, deleteSong,getAllSongsByArtist,getLyrics } from '../controllers/songControllers';
import { isAdmin } from '../middlewares/checkAdmin';
import authenticateUser from '../middlewares/authMiddlewares';

const songRouter = express.Router();

// Routes for songs
songRouter.post('/artists/:id/songs',authenticateUser, isAdmin, addSong);
songRouter.put('/songs/:id',authenticateUser, isAdmin, updateSong);
songRouter.delete('/songs/:id',authenticateUser, isAdmin, deleteSong);
/*************************************************** */
songRouter.get('/songs', getAllSongsByArtist);
songRouter.get('/lyrics', getLyrics);


export default songRouter;
