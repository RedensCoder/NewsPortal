import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import md5 from "md5";
import { generateAccessToken } from "../security/jwt";

export const CreateUser = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.login || !req.body.password || !req.body.email) {
        res.sendStatus(204);
        return;
    }
    
    const user = await prisma.users.findFirst({ where: { OR: [ {login: md5(req.body.login)}, {email: req.body.email} ] } });

    if (user !== null) {
        res.sendStatus(409);
    } else {
        const createdUser = await prisma.users.create({
            data: {
                login: md5(req.body.login),
                password: md5(req.body.password),
                email: req.body.email,
                role: "user"
            }
        });

        await prisma.user_infos.create({
            data: {
                userId: createdUser.id,
                nickname: req.body.login,
                link: req.body.login
            }
        });

        const token = generateAccessToken(Number(createdUser.id), req.body.login);

        res.send(token);
    }
}

export const Auth = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.login || !req.body.password) {
        res.sendStatus(204);
        return;
    }
    
    const user = await prisma.users.findFirst({ where: { AND: { login: md5(req.body.login), password: md5(req.body.password) } } });

    if (user !== null) {
        const token = generateAccessToken(Number(user.id), req.body.login);

        res.send(token);
    } else {
        res.sendStatus(401);
    }
}

export const GetUserById = async (req: Request, res: Response, prisma: PrismaClient) => {
    const user = await prisma.users.findFirst({ where: { id: Number(req.params.id) } });

    if (user === null) {
        res.sendStatus(401);
        return;
    }

    res.send(JSON.stringify({...user, id: user.id.toString()}))
}


export const GetUserInfoById = async (req: Request, res: Response, prisma: PrismaClient) => {
    try {
        Number(req.params.id)
    } catch(e) {
        res.sendStatus(401);
        return;
    }

    const user = await prisma.user_infos.findFirst({ where: { userId: Number(req.params.id) } });

    if (user === null) {
        res.sendStatus(401);
        return;
    }

    res.send(JSON.stringify({...user, id: user.id.toString(), userId: user.userId.toString()}))
}

export const GetUserSocialsById = async (req: Request, res: Response, prisma: PrismaClient) => {
    try {
        Number(req.params.id)
    } catch(e) {
        res.sendStatus(401);
        return;
    }

    const user = await prisma.user_socials.findMany({ where: { userId: Number(req.params.id) } });

    if (user === null) {
        res.sendStatus(401);
        return;
    }

    res.send(JSON.stringify({...user, id: user.forEach(el => el.id.toString()), userId: user.forEach(el => el.userId.toString())}))
}