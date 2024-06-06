import express from 'express';
import { addSong, updateSong, deleteSong,getAllSongsByArtist,getLyrics } from '../controllers/songControllers';

const songRouter = express.Router();

// Routes for songs
songRouter.post('/artists/:id/songs', addSong);
songRouter.put('/songs/:id', updateSong);
songRouter.delete('/songs/:id', deleteSong);
/*************************************************** */
songRouter.get('/songs/:id', getAllSongsByArtist);
songRouter.get('/lyrics', getLyrics);

export default songRouter;
