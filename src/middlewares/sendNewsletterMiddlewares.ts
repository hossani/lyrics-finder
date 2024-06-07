import sendEmail from '../helpers/emailServices';
import User from '../models/userModels';

const sendNewsletter=async()=>{
    const users= await User.find({newsletter:true});
    const emailList = users.map(user => user.email).join(',');

    // Envoyer un seul email à toutes les adresses
    await sendEmail(emailList, 'Mail de newsletter', 'Nous sommes ravis de vous avoir avec nous.');
    
//    for(const user of users){
//     await sendEmail(user.email,'Mail de newsletter','Nous sommes ravis de vous avoir avec nous.');
//    }
}

export default sendNewsletter;