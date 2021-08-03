import {Router} from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middleware/auth-middleware";

export const routes = Router()

routes.post("/kk", UserController.create)
routes.get("/", authMiddleware, UserController.index)
routes.delete("/delete", UserController.delete)
routes.post("/login", UserController.login)