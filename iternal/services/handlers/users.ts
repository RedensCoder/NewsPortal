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
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const user = await prisma.users.findFirst({ where: { id: Number(req.params.id) } });

    if (user === null) {
        res.sendStatus(400);
        return;
    }

    res.send(JSON.stringify(
        user, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}


export const GetUserInfoById = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const user = await prisma.user_infos.findFirst({ where: { userId: Number(req.params.id) } });

    if (user === null) {
        res.sendStatus(400);
        return;
    }

    res.send(JSON.stringify(
        user, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetUserSocialsById = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const user = await prisma.user_socials.findMany({ where: { userId: Number(req.params.id) } });

    if (user === null) {
        res.sendStatus(400);
        return;
    }

    res.send(JSON.stringify(
        user, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const UpdateUserInfo = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id) {
        res.sendStatus(204);
        return;
    }

    if (req.body.nickname && req.body.nickname !== "") {
        await prisma.user_infos.update({
            where: { userId: req.body.id },
            data: { nickname: req.body.nickname }
        })
    }

    if (req.body.avatar && req.body.avatar !== "") {
        await prisma.user_infos.update({
            where: { userId: req.body.id },
            data: { avatar: req.body.avatar }
        })
    }

    if (req.body.about && req.body.about !== "") {
        await prisma.user_infos.update({
            where: { userId: req.body.id },
            data: { about: req.body.about }
        })
    }

    if (req.body.link && req.body.link !== "") {
        await prisma.user_infos.update({
            where: { userId: req.body.id },
            data: { link: req.body.link }
        })
    }

    res.sendStatus(200);
}

export const CreateSocial = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.social || !req.body.url) {
        res.sendStatus(204);
        return;
    }

    await prisma.user_socials.create({
        data: {
            userId: req.body.id,
            soc_name: req.body.social,
            url: req.body.url
        }
    });

    res.send(200);
}

export const UpdateSocial = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id) {
        res.sendStatus(204);
        return;
    }

    if (req.body.social && req.body.social !== "") {
        await prisma.user_socials.update({
            where: { id: req.body.id },
            data: { soc_name: req.body.social }
        })
    }

    if (req.body.url && req.body.url !== "") {
        await prisma.user_socials.update({
            where: { id: req.body.id },
            data: { url: req.body.url }
        })
    }

    res.sendStatus(200);
}