import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const Create = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.title || !req.body.content || !req.body.tags) {
        res.sendStatus(204);
        return;
    }

    const art = await prisma.user_articles.create({
        data: {
            userId: req.body.id,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        }
    });

    await prisma.article_views.create({
        data: {
            articleId: art.id,
            views: 0
        }
    });

    res.sendStatus(200);
}

export const GetAll = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.take))) {
        return res.sendStatus(400)
    }

    const art = await prisma.user_articles.findMany({take: Number(req.params.take)});

    if (art === null) {
        res.sendStatus(400);
        return;
    }

    res.send(JSON.stringify(
        art, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetUserArt = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const art = await prisma.user_articles.findMany({where: { userId: Number(req.params.id) }});

    res.send(JSON.stringify(
        art, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetById = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const art = await prisma.user_articles.findFirst({where: { id: Number(req.params.id) }});

    res.send(JSON.stringify(
        art, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const Update = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.userId || !req.body.articleId) {
        res.sendStatus(204);
        return;
    }

    if (req.body.title && req.body.title !== "") {
        await prisma.user_articles.update({
            where: { id: req.body.articleId },
            data: { content: req.body.content }
        })
    }

    if (req.body.content && req.body.content !== "") {
        await prisma.user_articles.update({
            where: { id: req.body.articleId },
            data: { content: req.body.content }
        })
    }

    res.sendStatus(200);
}

export const Delete = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    await prisma.article_views.delete({ where: { articleId: Number(req.params.id) } });
    await prisma.article_likes.deleteMany({ where: { articleId: Number(req.params.id) } });
    await prisma.article_dislikes.deleteMany({ where: { articleId: Number(req.params.id) } });
    await prisma.article_comments.deleteMany({ where: { articleId: Number(req.params.id) } });

    await prisma.user_articles.delete({ where: { id: Number(req.params.id) } });

    res.sendStatus(200);
}

// LIKES

export const Like = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.article) {
        return res.sendStatus(204)
    }

    const like = await prisma.article_likes.findFirst({ where: { AND: { userId: req.body.id, articleId: req.body.article } } })
    const dislike = await prisma.article_dislikes.findFirst({ where: { AND: { userId: req.body.id, articleId: req.body.article } } })

    if (like !== null) {
        await prisma.article_likes.delete({ where: { id: like.id } });
    } else {
        if (dislike === null) {
            await prisma.article_likes.create({
                data: {
                    userId: req.body.id,
                    articleId: req.body.article
                }
            });
        } else {
            await prisma.article_dislikes.delete({ where: { id: dislike.id } });
            await prisma.article_likes.create({
                data: {
                    userId: req.body.id,
                    articleId: req.body.article
                }
            });
        }
    }

    res.sendStatus(200);
}

export const GetUserLike = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.article) {
        return res.sendStatus(204)
    }

    const like = await prisma.article_likes.findFirst({ where: { AND: { userId: req.body.id, articleId: req.body.article } } })

    res.send(JSON.stringify(
        like, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetLikeById = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400);
    }

    const likes = await prisma.article_likes.count({ where: { articleId: Number(req.params.id) } })

    res.send(likes.toString());
}

// DISLIKES

export const Dislike = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.article) {
        return res.sendStatus(204)
    }

    const dislike = await prisma.article_dislikes.findFirst({ where: { AND: { userId: req.body.id, articleId: req.body.article } } })
    const like = await prisma.article_likes.findFirst({ where: { AND: { userId: req.body.id, articleId: req.body.article } } })

    if (dislike !== null) {
        await prisma.article_dislikes.delete({ where: { id: dislike.id } });
    } else {
        if (like === null) {
            await prisma.article_dislikes.create({
                data: {
                    userId: req.body.id,
                    articleId: req.body.article
                }
            });
        } else {
            await prisma.article_likes.delete({ where: { id: like.id } });
            await prisma.article_dislikes.create({
                data: {
                    userId: req.body.id,
                    articleId: req.body.article
                }
            });
        }
    }

    res.sendStatus(200);
}

export const GetUserDislike = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.article) {
        return res.sendStatus(204)
    }

    const dislike = await prisma.article_dislikes.findFirst({ where: { AND: { userId: req.body.id, articleId: req.body.article } } })

    res.send(JSON.stringify(
        dislike, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetDislikeById = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400);
    }

    const dislikes = await prisma.article_dislikes.count({ where: { articleId: Number(req.params.id) } })

    res.send(dislikes.toString());
}

// VIEWS

export const AddView = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    await prisma.article_views.update({
        where: { articleId: Number(req.params.id) },
        data: { views: { increment: 1 } }
    })

    res.sendStatus(200);
}

export const GetViews = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const views = await prisma.article_views.findFirst({ where: { articleId: Number(req.params.id) } })

    // @ts-ignore
    res.send(views.views.toString());
}

// COMMENTS

export const CreateComment = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.article || !req.body.comment && req.body.comment !== "") {
        return res.sendStatus(204)
    }

    await prisma.article_comments.create({
        data: {
            userId: req.body.id,
            articleId: req.body.article,
            comment: req.body.comment
        }
    })

    res.sendStatus(200);
}

export const GetPostComments = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const comments = await prisma.article_comments.findFirst({ where: { articleId: Number(req.params.id) } })

    res.send(JSON.stringify(
        comments, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const DeleteComment = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    await prisma.article_comments.delete({ where: { id: Number(req.params.id) } });

    res.sendStatus(200);
}