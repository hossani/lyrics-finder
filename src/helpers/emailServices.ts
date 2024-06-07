import nodemailer from 'nodemailer';

const sendEmail=async(email:string,subjectMail:string,textMail:string)=>{
    const transporter = await nodemailer.createTransport({
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });
    
    const mailOptions = {
        from:  process.env.user,
        to: email,
        subject: subjectMail,
        text: textMail
    };
    await transporter.sendMail(mailOptions);
}

export default sendEmail;