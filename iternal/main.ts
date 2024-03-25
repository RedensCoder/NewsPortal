import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';

//@ts-ignore
import userAva from "./services/file/file.cjs";
//@ts-ignore
import publicAva from "./services/file/publicImgFile.cjs";

import * as User from "./services/handlers/users";
import * as Post from "./services/handlers/posts";
import * as Article from "./services/handlers/articles";
import * as Public from "./services/handlers/publics";
import * as Files from "./services/handlers/files";
import {authenticateToken, authenticateTokenBody, authenticateTokenParams} from "./services/security/jwt";

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
//UPLOAD
app.put("/uploadUserAvatar/:id", authenticateToken, userAva.single("avatar"), async (req: Request, res: Response) => Files.UploadUserAvatar(req, res, prisma));
app.put("/uploadPublicAvatar/:id", authenticateToken, publicAva.single("avatar"), async (req: Request, res: Response) => Files.UploadPublicAvatar(req, res, prisma));

//USERS
app.post("/createUser", async (req: Request, res: Response) => await User.CreateUser(req, res, prisma));
app.post("/auth", async (req: Request, res: Response) => await User.Auth(req, res, prisma));
app.post("/createSocial", authenticateTokenBody, async (req: Request, res: Response) => await User.CreateSocial(req, res, prisma));
app.get("/getUserById/:id", authenticateTokenParams, async (req: Request, res: Response) => await User.GetUserById(req, res, prisma));
app.get("/getUserInfoById/:id", async (req: Request, res: Response) => await User.GetUserInfoById(req, res, prisma));
app.get("/getUserInfoByLink/:link", async (req: Request, res: Response) => await User.GetUserInfoByLink(req, res, prisma));
app.get("/getUserSocialsById/:id", async (req: Request, res: Response) => await User.GetUserSocialsById(req, res, prisma));
app.put("/updateUserInfo", authenticateTokenBody, async (req: Request, res: Response) => await User.UpdateUserInfo(req, res, prisma));
app.put("/updateSocial", authenticateTokenBody, async (req: Request, res: Response) => await User.UpdateSocial(req, res, prisma));
app.delete("/deleteSocial/:id", authenticateToken, async (req: Request, res: Response) => await User.DeleteSocial(req, res, prisma));

//POSTS
app.post("/createPost", authenticateTokenBody, async (req: Request, res: Response) => await Post.CreatePost(req, res, prisma));
app.post("/postLike", authenticateTokenBody, async (req: Request, res: Response) => await Post.Like(req, res, prisma));
app.post("/postDislike", authenticateTokenBody, async (req: Request, res: Response) => await Post.Dislike(req, res, prisma));
app.post("/getUserPostLike", authenticateTokenBody, async (req: Request, res: Response) => await Post.GetUserLike(req, res, prisma));
app.post("/getUserPostDislike", authenticateTokenBody, async (req: Request, res: Response) => await Post.GetUserDislike(req, res, prisma));
app.post("/createPostComment", authenticateTokenBody, async (req: Request, res: Response) => await Post.CreateComment(req, res, prisma));
app.get("/getAllPosts/:take", async (req: Request, res: Response) => await Post.GetAllPosts(req, res, prisma));
app.get("/getUserPosts/:id", async (req: Request, res: Response) => await Post.GetUserPosts(req, res, prisma));
app.get("/getPostById/:id", async (req: Request, res: Response) => await Post.GetPostById(req, res, prisma));
app.get("/getPostLikes/:id", async (req: Request, res: Response) => await Post.GetLikeByPostId(req, res, prisma));
app.get("/getPostDislikes/:id", async (req: Request, res: Response) => await Post.GetDislikeByPostId(req, res, prisma));
app.get("/getPostViews/:id", async (req: Request, res: Response) => await Post.GetViews(req, res, prisma));
app.get("/getPostComments/:id", async (req: Request, res: Response) => await Post.GetPostComments(req, res, prisma));
app.put("/updatePost", authenticateTokenBody, async (req: Request, res: Response) => await Post.UpdatePost(req, res, prisma));
app.put("/addView/:id", authenticateToken, async (req: Request, res: Response) => await Post.AddView(req, res, prisma));
app.delete("/deletePost/:id", authenticateToken, async (req: Request, res: Response) => await Post.DeletePost(req, res, prisma));
app.delete("/deletePostComment/:id", authenticateToken, async (req: Request, res: Response) => await Post.DeleteComment(req, res, prisma));

//ARTICLES
app.post("/createArticle", authenticateTokenBody, async (req: Request, res: Response) => await Article.Create(req, res, prisma));
app.post("/ArticleLike", authenticateTokenBody, async (req: Request, res: Response) => await Article.Like(req, res, prisma));
app.post("/ArticleDislike", authenticateTokenBody, async (req: Request, res: Response) => await Article.Dislike(req, res, prisma));
app.post("/getUserArticleLike", authenticateTokenBody, async (req: Request, res: Response) => await Article.GetUserLike(req, res, prisma));
app.post("/getUserArticleDislike", authenticateTokenBody, async (req: Request, res: Response) => await Article.GetUserDislike(req, res, prisma));
app.post("/createArticleComment", authenticateTokenBody, async (req: Request, res: Response) => await Article.CreateComment(req, res, prisma));
app.get("/getAllArticles/:take", async (req: Request, res: Response) => await Article.GetAll(req, res, prisma));
app.get("/getUserArticles/:id", async (req: Request, res: Response) => await Article.GetUserArt(req, res, prisma));
app.get("/getArticleById/:id", async (req: Request, res: Response) => await Article.GetById(req, res, prisma));
app.get("/getArticleLikes/:id", async (req: Request, res: Response) => await Article.GetLikeById(req, res, prisma));
app.get("/getArticleDislikes/:id", async (req: Request, res: Response) => await Article.GetDislikeById(req, res, prisma));
app.get("/getArticleViews/:id", async (req: Request, res: Response) => await Article.GetViews(req, res, prisma));
app.get("/getArticleComments/:id", async (req: Request, res: Response) => await Article.GetPostComments(req, res, prisma));
app.put("/updateArticle", authenticateTokenBody, async (req: Request, res: Response) => await Article.Update(req, res, prisma));
app.put("/addViewArticle/:id", authenticateToken, async (req: Request, res: Response) => await Article.AddView(req, res, prisma));
app.delete("/deleteArticle/:id", authenticateToken, async (req: Request, res: Response) => await Article.Delete(req, res, prisma));
app.delete("/deleteArticleComment/:id", authenticateToken, async (req: Request, res: Response) => await Article.DeleteComment(req, res, prisma));

//PUBLICS
app.post("/createPublic", authenticateTokenBody, async (req: Request, res: Response) => await Public.CreatePublic(req, res, prisma));
app.post("/addAdmin", authenticateTokenBody, async (req: Request, res: Response) => await Public.AddAdmin(req, res, prisma));
app.post("/subscribe", authenticateTokenBody, async (req: Request, res: Response) => await Public.Subscribe(req, res, prisma));
app.post("/searchPublic", async (req: Request, res: Response) => await Public.SearchPublic(req, res, prisma));
app.get("/getAllPublics/:take", async (req: Request, res: Response) => await Public.GetAllPublics(req, res, prisma));
app.get("/getUserPublics/:id", authenticateToken, async (req: Request, res: Response) => await Public.GetUserPublics(req, res, prisma));
app.get("/getPublicById/:id", async (req: Request, res: Response) => await Public.GetPublicById(req, res, prisma));
app.get("/getPublicAdmins/:id", authenticateToken, async (req: Request, res: Response) => await Public.GetPublicAdmins(req, res, prisma));
app.get("/getPublicSubs/:id", async (req: Request, res: Response) => await Public.GetPublicSubscribers(req, res, prisma));
app.get("/getPublicSubsCount/:id", async (req: Request, res: Response) => await Public.GetPublicSubsCount(req, res, prisma));
app.put("/updatePublic", authenticateTokenBody, async (req: Request, res: Response) => await Public.UpdatePublic(req, res, prisma));
app.delete("/deletePublic/:id", authenticateTokenBody, async (req: Request, res: Response) => await Public.DeletePublic(req, res, prisma));

app.listen(8080, () => {
    console.log("[Server] Enabled!");
});