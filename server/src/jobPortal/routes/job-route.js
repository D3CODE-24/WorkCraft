import express from "express";
import { isAuthenticated } from "#jobPortal/middlewares";
import { jobController } from "#jobPortal/controllers";

const router = express.Router();

router.post("/post", isAuthenticated, jobController.postJob);
router.get("/get", isAuthenticated, jobController.getAllJobs);
router.get("/getadminjobs", isAuthenticated, jobController.getAdminJobs);
router.get("/get/:id", isAuthenticated, jobController.getJobById);

export default router;
