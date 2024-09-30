import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenInterface } from "../utils/token";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: TokenInterface = await verifyToken(token);

    if (!decoded.roles.includes("admin")) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  } catch (err: unknown) {
    next(err);
  }
}

export async function isUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: TokenInterface = await verifyToken(token);

    if (!decoded.roles.includes("user")) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  } catch (err: unknown) {
    next(err);
  }
}
