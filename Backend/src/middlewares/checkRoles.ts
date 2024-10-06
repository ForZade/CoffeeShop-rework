import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenInterface } from "../utils/token";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: TokenInterface = verifyToken(token);

    if (!decoded.roles.includes("admin")) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

    next();
  } catch (err: unknown) {
    next(err);
  }
}
