import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const UploadUserAvatar = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }
    //@ts-ignore
    if (req.file) {
        await prisma.user_infos.update({
            where: { userId: Number(req.params.id)},
            data: {
                //@ts-ignore
                avatar: `${req.protocol}://${req.get('host')}/${req.file.path}`
            }
        })

        res.sendStatus(200);
    } else {
        res.sendStatus(422);
    }
}

export const UploadPublicAvatar = async (req: Request, res: Response, prisma: PrismaClient) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }
    //@ts-ignore
    if (req.file) {
        await prisma.publics.update({
            where: { id: Number(req.params.id)},
            data: {
                //@ts-ignore
                avatar: `${req.protocol}://${req.get('host')}/${req.file.path}`
            }
        })

        res.sendStatus(200);
    } else {
        res.sendStatus(422);
    }
}