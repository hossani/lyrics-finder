import sendEmail from '../helpers/emailServices';
import User from '../models/userModels';

const sendNewsletter=async()=>{
    const users= await User.find({newsletter:true});
   for(const user of users){
    await sendEmail(user.email,'Mail de newsletter','Nous sommes ravis de vous avoir avec nous.');
   }
}

export default sendNewsletter;