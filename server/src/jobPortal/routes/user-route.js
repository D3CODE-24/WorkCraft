import express from "express";
import { userController } from "#jobPortal/controllers";
import { isAuthenticated, singleUpload } from "#jobPortal/middlewares";

const router = express.Router();

router.route("/register").post(singleUpload, userController.register);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logout);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, userController.updateProfile);

export default router;
