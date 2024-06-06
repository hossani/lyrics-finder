import express from 'express';
import { addSong, updateSong, deleteSong, getAllSongs, getSongsByArtist, getSongLyrics } from '../controllers/songControllers';

const songRouter = express.Router();

// Routes for songs
songRouter.post('/artists/:id/songs', addSong);
songRouter.put('/songs/:id', updateSong);
songRouter.delete('/songs/:id', deleteSong);
songRouter.get('/songs', getAllSongs);
songRouter.get('/artists/:artistId/songs', getSongsByArtist);
songRouter.get('/songs/:id/lyrics', getSongLyrics);
export default songRouter;
