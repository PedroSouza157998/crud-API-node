import {Router} from "express";
import UserController from "../controllers/UserController";

export const routes = Router()

routes.post("/kk", UserController.create)
routes.get("/", UserController.index)
routes.delete("/delete", UserController.delete)
routes.get("/login", UserController.login)