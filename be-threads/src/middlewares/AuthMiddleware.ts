import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const AuthMiddware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if(!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const token = authorization.split(" ")[1];


  try {
    const verify = jwt.verify(token, "secret");
    res.locals.logginSession = verify
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }



}

export default AuthMiddware