import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

export async function sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${process.env.BASE_URL}/verify?token=${token}`;

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `
            <h1>Verify your email</h1>
            <p>Please click the following link to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
        `
    };
    
    await transporter.sendMail(mailOptions);
}