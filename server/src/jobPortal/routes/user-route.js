import express from "express";
import { userController } from "#jobPortal/controllers";
import { isAuthenticated, singleUpload } from "#jobPortal/middlewares";

const router = express.Router();

router.post("/register", singleUpload, userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post(
  "/profile/update",
  isAuthenticated,
  singleUpload,
  userController.updateProfile,
);

export default router;
