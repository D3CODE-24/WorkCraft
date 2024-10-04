import express from "express";
import { isAuthenticated } from "#jobPortal/middlewares";
import { applicationController } from "#jobPortal/controllers";

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applicationController.applyJob);
router.get("/get", isAuthenticated, applicationController.getAppliedJobs);
router.get(
  "/:id/applicants",
  isAuthenticated,
  applicationController.getApplicants,
);
router.post(
  "/status/:id/update",
  isAuthenticated,
  applicationController.updateStatus,
);

export default router;
