import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const CreatePost = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.content || !req.body.tags) {
        res.sendStatus(204);
        return;
    }

    await prisma.user_posts.create({
        data: {
            userId: req.body.id,
            content: req.body.content,
            tags: req.body.tags
        }
    });

    res.sendStatus(200);
}

export const GetAllPosts = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.take))) {
        return res.sendStatus(400)
    }

    const posts = await prisma.user_posts.findMany({take: Number(req.params.take)});

    if (posts === null) {
        res.sendStatus(400);
        return;
    }

    res.send(JSON.stringify(
        posts, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetUserPosts = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const posts = await prisma.user_posts.findMany({where: { userId: Number(req.params.id) }});

    res.send(JSON.stringify(
        posts, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetPostById = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const posts = await prisma.user_posts.findFirst({where: { id: Number(req.params.id) }});

    res.send(JSON.stringify(
        posts, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const UpdatePost = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.userId || !req.body.postId) {
        res.sendStatus(204);
        return;
    }

    if (req.body.content && req.body.content !== "") {
        await prisma.user_posts.update({
            where: { id: req.body.postId },
            data: { content: req.body.content }
        })
    }

    if (req.body.tags) {
        await prisma.user_posts.update({
            where: { id: req.body.postId },
            data: { tags: req.body.tags }
        })
    }

    res.sendStatus(200);
}

export const DeletePost = async (req: Request, res: Response, prisma: PrismaClient) => {
    try {
        Number(req.params.id)
    } catch(e) {
        res.sendStatus(400);
        return;
    }

    await prisma.user_posts.delete({ where: { id: Number(req.params.id) } });

    res.sendStatus(200);
}