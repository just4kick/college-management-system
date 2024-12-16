import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"juciepiladomausambika@gmail.com",
        pass:process.env.OTP_KEY_PASS
    }
});

export  const sendVerificationEmail = async(email,token,role)=>{
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}&role=${role}`;
    const mailOptions ={
        from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h2>Please verify your email</h2>
      <p>Click <a href="${verificationUrl}">here</a> to verify your email</p>
    `
    }
    return await transporter.sendMail(mailOptions);
}