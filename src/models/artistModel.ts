import mongoose from 'mongoose';

const artistSchema= new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  picture_url: { type: String,required:true },
  genre: { type: String,required:true },
  born_date: { type: Date,required:true },
  born_city: { type: String,required:true },
  died_date: { type: Date,required:false },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
  
});

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;
