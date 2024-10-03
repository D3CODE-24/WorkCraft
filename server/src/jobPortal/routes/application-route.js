import express from "express";
import { isAuthenticated } from "#jobPortal/middlewares";
import { applicationController } from "#jobPortal/controllers";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applicationController.applyJob);
router.route("/get").get(isAuthenticated, applicationController.getAppliedJobs);
router
  .route("/:id/applicants")
  .get(isAuthenticated, applicationController.getApplicants);
router
  .route("/status/:id/update")
  .post(isAuthenticated, applicationController.updateStatus);

export default router;
