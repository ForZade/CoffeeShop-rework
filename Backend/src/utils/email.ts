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
    const verificationLink = `${process.env.BASE_URL}/api/v1/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `
            <h1>Verify your email</h1>
            <p>Please verify your email by clicking the button below:</p>
            <a href="${verificationLink}" style="
                background-color: #4CAF50; 
                color: white; 
                padding: 10px 20px; 
                text-align: center; 
                text-decoration: none; 
                display: inline-block; 
                font-size: 16px; 
                border-radius: 5px;
                font-family: Arial, sans-serif;
            ">Verify Your Email</a>
        `
    };
    
    await transporter.sendMail(mailOptions);
}