import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'

import { Auth, CreateUser, GetUserById, GetUserInfoById, GetUserSocialsById } from "./services/handlers/users";
import { authenticateTokenBody, authenticateTokenParams } from "./services/security/jwt";

const prisma = new PrismaClient();

dotenv.config();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/files', express.static('files'));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", ["Content-Type", "Access-Control-Allow-Credentials", "Authorization", "Accept-Encoding"]);
    next();
});

//ROUTES
app.post("/createUser", async (req: Request, res: Response) => await CreateUser(req, res, prisma));
app.post("/auth", async (req: Request, res: Response) => await Auth(req, res, prisma));
app.get("/getUserById/:id", authenticateTokenParams, async (req: Request, res: Response) => await GetUserById(req, res, prisma));
app.get("/getUserInfoById/:id", async (req: Request, res: Response) => await GetUserInfoById(req, res, prisma));
app.get("/getUserSocialsById/:id", async (req: Request, res: Response) => await GetUserSocialsById(req, res, prisma));

app.listen(8080, () => {
    console.log("[Server] Enabled!");
});