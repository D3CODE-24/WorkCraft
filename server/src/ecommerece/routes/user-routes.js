import { Router } from "express";
import { UserController } from "#ecommerece/controllers";

const UserRouter = Router();

UserRouter.post("/signup", UserController.signup);
UserRouter.post("/login", UserController.login);
UserRouter.get("/", UserController.getUsers);
UserRouter.get("/:id/orders", UserController.getUserOrders);
UserRouter.put("/:id/updateNotifications", UserController.updateNotifications);

export default UserRouter;
