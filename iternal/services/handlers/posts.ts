import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const CreatePost = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.content) {
        res.sendStatus(204);
        return;
    }

    const post = await prisma.user_posts.create({
        data: {
            userId: req.body.id,
            content: req.body.content
        }
    });

    await prisma.post_views.create({
        data: {
            postId: post.id,
            views: 0
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

    res.sendStatus(200);
}

export const DeletePost = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    await prisma.post_views.delete({ where: { postId: Number(req.params.id) } });
    await prisma.post_likes.deleteMany({ where: { postId: Number(req.params.id) } });
    await prisma.post_dislikes.deleteMany({ where: { postId: Number(req.params.id) } });
    await prisma.post_comments.deleteMany({ where: { postId: Number(req.params.id) } });

    await prisma.user_posts.delete({ where: { id: Number(req.params.id) } });

    res.sendStatus(200);
}

// LIKES

export const Like = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.post) {
        return res.sendStatus(204)
    }

    const like = await prisma.post_likes.findFirst({ where: { AND: { userId: req.body.id, postId: req.body.post } } })
    const dislike = await prisma.post_dislikes.findFirst({ where: { AND: { userId: req.body.id, postId: req.body.post } } })

    if (like !== null) {
        await prisma.post_likes.delete({ where: { id: like.id } });
    } else {
        if (dislike === null) {
            await prisma.post_likes.create({
                data: {
                    userId: req.body.id,
                    postId: req.body.post
                }
            });
        } else {
            await prisma.post_dislikes.delete({ where: { id: dislike.id } });
            await prisma.post_likes.create({
                data: {
                    userId: req.body.id,
                    postId: req.body.post
                }
            });
        }
    }

    res.sendStatus(200);
}

export const GetUserLike = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.post) {
        return res.sendStatus(204)
    }

    const like = await prisma.post_likes.findFirst({ where: { AND: { userId: req.body.id, postId: req.body.post } } })

    res.send(JSON.stringify(
        like, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetLikeByPostId = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400);
    }

    const likes = await prisma.post_likes.count({ where: { postId: Number(req.params.id) } })

    res.send(likes.toString());
}

// DISLIKES

export const Dislike = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.post) {
        return res.sendStatus(204)
    }

    const dislike = await prisma.post_dislikes.findFirst({ where: { AND: { userId: req.body.id, postId: req.body.post } } })
    const like = await prisma.post_likes.findFirst({ where: { AND: { userId: req.body.id, postId: req.body.post } } })

    if (dislike !== null) {
        await prisma.post_dislikes.delete({ where: { id: dislike.id } });
    } else {
        if (like === null) {
            await prisma.post_dislikes.create({
                data: {
                    userId: req.body.id,
                    postId: req.body.post
                }
            });
        } else {
            await prisma.post_likes.delete({ where: { id: like.id } });
            await prisma.post_dislikes.create({
                data: {
                    userId: req.body.id,
                    postId: req.body.post
                }
            });
        }
    }

    res.sendStatus(200);
}

export const GetUserDislike = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.post) {
        return res.sendStatus(204)
    }

    const dislike = await prisma.post_dislikes.findFirst({ where: { AND: { userId: req.body.id, postId: req.body.post } } })

    res.send(JSON.stringify(
        dislike, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const GetDislikeByPostId = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400);
    }

    const dislikes = await prisma.post_dislikes.count({ where: { postId: Number(req.params.id) } })

    res.send(dislikes.toString());
}

// VIEWS

export const AddView = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    await prisma.post_views.update({
        where: { postId: Number(req.params.id) },
        data: { views: { increment: 1 } }
    })

    res.sendStatus(200);
}

export const GetViews = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const views = await prisma.post_views.findFirst({ where: { postId: Number(req.params.id) } })

    // @ts-ignore
    res.send(views?.views.toString());
}

// COMMENTS

export const CreateComment = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.id || !req.body.post || !req.body.comment && req.body.comment !== "") {
        return res.sendStatus(204)
    }

    await prisma.post_comments.create({
        data: {
            userId: req.body.id,
            postId: req.body.post,
            comment: req.body.comment
        }
    })

    res.sendStatus(200);
}

export const GetPostComments = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const comments = await prisma.post_comments.findFirst({ where: { postId: Number(req.params.id) } })

    res.send(JSON.stringify(
        comments, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
}

export const DeleteComment = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    await prisma.post_comments.delete({ where: { id: Number(req.params.id) } });

    res.sendStatus(200);
}