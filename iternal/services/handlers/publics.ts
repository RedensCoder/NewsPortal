import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const CreatePublic = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.userId || !req.body.name || !req.body.description || !req.body.avatar || !req.body.site) {
        res.sendStatus(204);
        return;
    }

    const group = await prisma.publics.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            avatar: req.body.avatar,
            site: req.body.site,
            comment: req.body.comment,
            status: false
        }
    });

    await prisma.public_subscribers.create({
        data: {
            publicId: group.id,
            userId: req.body.userId
        }
    });

    await prisma.public_admins.create({
        data: {
            publicId: group.id,
            userId: req.body.userId
        }
    });

    res.sendStatus(200);
}
export const AddAdmin = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.userId || !req.body.public) {
        res.sendStatus(204);
        return;
    }

    const admin = await prisma.public_admins.findFirst({ where: { AND: { userId: req.body.userId, publicId: req.body.public } } })

    if (admin !== null) {
        await prisma.public_admins.delete({ where: { id: admin.id } })

        res.sendStatus(200);
        return;
    }

    await prisma.public_admins.create({
        data: {
            publicId: req.body.public,
            userId: req.body.userId
        }
    });

    res.sendStatus(200);
}

export const Subscribe = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.userId || !req.body.public) {
        res.sendStatus(204);
        return;
    }

    const sub = await prisma.public_subscribers.findFirst({ where: { AND: { userId: req.body.userId, publicId: req.body.public } } })

    if (sub !== null) {
        await prisma.public_subscribers.delete({ where: { id: sub.id } })

        res.sendStatus(200);
        return;
    }

    await prisma.public_subscribers.create({
        data: {
            publicId: req.body.public,
            userId: req.body.userId
        }
    });

    res.sendStatus(200);
}

export const GetAllPublics = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.take))) {
        return res.sendStatus(400)
    }

    const publics = await prisma.publics.findMany({take: Number(req.params.take)});

    if (publics === null) {
        res.sendStatus(400);
        return;
    }

    res.send(JSON.stringify(
        publics, (key, value) => (typeof value === 'bigint' || typeof value === 'boolean' ? value.toString() : value)
    ));
}

export const GetUserPublics = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const subs = await prisma.public_subscribers.findMany({where: { userId: Number(req.params.id) }});

    const publics: {id: bigint, name: string, description: string, avatar: string, site: string, comment: string, status: boolean}[]= [];

    for (const el of subs) {
        const group = await prisma.publics.findFirst({ where: { id: el.publicId } });
        if (group !== null) {
            publics.push(group);
        }
    }

    res.send(JSON.stringify(
        publics, (key, value) => (typeof value === 'bigint' || typeof value === 'boolean' ? value.toString() : value)
    ));
}

export const GetPublicById = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const group = await prisma.publics.findFirst({where: { id: Number(req.params.id) }});

    res.send(JSON.stringify(
        group, (key, value) => (typeof value === 'bigint' || typeof value === 'boolean' ? value.toString() : value)
    ));
}

export const GetPublicAdmins = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const group = await prisma.public_admins.findMany({where: {publicId: Number(req.params.id)}});

    res.send(JSON.stringify(
        group, (key, value) => (typeof value === 'bigint' || typeof value === 'boolean' ? value.toString() : value)
    ));
}

export const GetPublicSubscribers = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const group = await prisma.public_subscribers.findMany({where: {publicId: Number(req.params.id)}});

    res.send(JSON.stringify(
        group, (key, value) => (typeof value === 'bigint' || typeof value === 'boolean' ? value.toString() : value)
    ));
}

export const SearchPublic = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.value) {
        res.sendStatus(204);
        return;
    }

    const group = await prisma.publics.findMany({
        where: {
            name: {
                startsWith: `%${req.body.value}%`
            }
        }
    });

    res.send(JSON.stringify(
        group, (key, value) => (typeof value === 'bigint' || typeof value === 'boolean' ? value.toString() : value)
    ));
}

export const GetPublicSubsCount = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400);
    }

    const subs = await prisma.public_subscribers.count({ where: { publicId: Number(req.params.id) } })

    res.send(subs.toString());
}

export const UpdatePublic = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!req.body.userId || !req.body.public) {
        res.sendStatus(204);
        return;
    }

    const admin = await prisma.public_admins.findFirst({ where: { AND: { publicId: req.body.public, userId: req.body.userId } } });

    if (admin === null) {
        res.sendStatus(403);
        return;
    }

    if (req.body.name && req.body.name !== "") {
        await prisma.publics.update({
            where: { id: req.body.public },
            data: { name: req.body.name }
        })
    }

    if (req.body.description && req.body.description !== "") {
        await prisma.publics.update({
            where: { id: req.body.public },
            data: { description: req.body.description }
        })
    }

    if (req.body.avatar && req.body.avatar !== "") {
        await prisma.publics.update({
            where: { id: req.body.public },
            data: { avatar: req.body.avatar }
        })
    }

    res.sendStatus(200);
}

export const DeletePublic = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    await prisma.public_subscribers.deleteMany({ where: { publicId: Number(req.params.id) } });
    await prisma.public_admins.deleteMany({ where: { publicId: Number(req.params.id) } });

    await prisma.publics.delete({ where: { id: Number(req.params.id) } });

    res.sendStatus(200);
}