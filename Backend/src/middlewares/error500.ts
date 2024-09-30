import { Request, Response } from "express";

export default function handleError500(
  err: unknown,
  _req: Request,
  res: Response
) {
  console.log(err);
  res.status(500).json({
    message: "Internal server error",
    error: err,
  });
}
