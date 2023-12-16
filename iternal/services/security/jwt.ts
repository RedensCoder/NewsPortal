import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export const generateAccessToken = (username: string): string => {
    return jwt.sign({
        data: {
            username: username
        }
    }, process.env.SECRET_TOKEN || "Secret", {expiresIn: "7d"});
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (token === undefined) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_TOKEN || "Secret", (err) => {
        if (err) return res.sendStatus(403)
        next()
    })
}

export const authenticateTokenParams = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (token === undefined) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_TOKEN || "Secret", (err, decoded) => {
        if (err) return res.sendStatus(403)
        
        if (decoded === undefined) return res.sendStatus(403)

        if (typeof decoded !== "string") {
            if (decoded.data.username !== req.params.username) return res.sendStatus(403);
            next()
        } else {
            return res.sendStatus(403)
        }
    })
}

export const authenticateTokenBody = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (token === undefined) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_TOKEN || "Secret", (err, decoded) => {
        if (err) return res.sendStatus(403)
        
        if (decoded === undefined) return res.sendStatus(403)

        if (typeof decoded !== "string") {
            if (decoded.data.username !== req.body.username) return res.sendStatus(403);
            next()
        } else {
            return res.sendStatus(403)
        }
    })
}