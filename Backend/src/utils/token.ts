import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateToken(email: string, id: number, roles: string[]) {
  return jwt.sign({ email, id, roles }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload &
    TokenInterface;
}

export function generateResetToken(email: string, id: number) {
  return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

export interface TokenInterface {
  email: string;
  id: number;
  roles?: string[];
}
