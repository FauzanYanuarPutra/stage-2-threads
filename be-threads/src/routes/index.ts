import * as express from "express";
import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import UserController from "../controllers/UserController";
import RepliesController from "../controllers/RepliesController";
import AuthMiddware from "../middlewares/AuthMiddleware";
const { storage } = require('./../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

const router = Router();
router.get("/threads", ThreadController.find);
router.get("/thread/:id",  ThreadController.findOne);
router.post("/thread", upload.single('image'), ThreadController.create);
router.patch("/thread/:id", ThreadController.update);

router.get("/users", UserController.find);
router.get("/user/:id", UserController.findOne);
router.post("/user", UserController.create);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

router.get("/replies", RepliesController.find);
router.get("/replie/:id", RepliesController.findOne);
router.post("/replie", upload.single('image'), RepliesController.create);
router.patch("/replie/:id", RepliesController.update);
router.delete("/replie/:id", RepliesController.delete);

router.post('/like/:id', UserController.like);
router.post('/follow', UserController.follow);

router.post('/auth/login', UserController.login);
router.post('/auth/register', UserController.register);
router.get('/check-token', AuthMiddware, UserController.check);



export default router;

