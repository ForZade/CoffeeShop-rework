import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function generateToken(email: string) {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export async function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export async function generateResetToken(email: string, id: number) {
    return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export async function verifyResetToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
}