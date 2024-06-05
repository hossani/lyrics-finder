import express from 'express';
import { addSong, updateSong, deleteSong } from '../controllers/songControllers';

const songRouter = express.Router();

// Routes for songs
songRouter.post('/artists/:id/songs', addSong);
songRouter.put('/songs/:id', updateSong);
songRouter.delete('/songs/:id', deleteSong);

export default songRouter;
