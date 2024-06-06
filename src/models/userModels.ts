import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  otp:{type:String,require:false,default:null},
  dateExpiration:{type:Date,required:false,default:null},
  newsletter:{type:Boolean,default:false}

});

const User = mongoose.model('User', userSchema);
export default User;
