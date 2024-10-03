import express from "express";
import { isAuthenticated } from "#jobPortal/middlewares";
import { jobController } from "#jobPortal/controllers";

const router = express.Router();

router.route("/post").post(isAuthenticated, jobController.postJob);
router.route("/get").get(isAuthenticated, jobController.getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, jobController.getAdminJobs);
router.route("/get/:id").get(isAuthenticated, jobController.getJobById);

export default router;
