import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export const generateAccessToken = (id: number, login: string, role: string): string => {
    return jwt.sign({
        data: {
            id: id,
            login: login,
            role: role
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
            if (decoded.data.id === req.params.id || decoded.data.role === "admin") { next() } else {
                return res.sendStatus(403);
            }
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
            if (decoded.data.id === req.body.id || decoded.data.id === req.body.userId || decoded.data.role === "admin" || decoded.data.role === "moderator") { next() } else {
                return res.sendStatus(403);
            }
        } else {
            return res.sendStatus(403)
        }
    })
}