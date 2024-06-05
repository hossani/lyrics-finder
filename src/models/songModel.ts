import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  genre: { type: String,required: true },
  title: { type: String, required: true },
  recorded_date: { type: Date,required: true },
  lyrics: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist',required:true}
});

const Song = mongoose.model('Song', songSchema);
export default Song;
