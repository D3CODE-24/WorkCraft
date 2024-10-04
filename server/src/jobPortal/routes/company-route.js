import express from "express";
import { isAuthenticated } from "#jobPortal/middlewares";
import { companyController } from "#jobPortal/controllers";
import { singleUpload } from "#jobPortal/middlewares";

const router = express.Router();

router.post("/register", isAuthenticated, companyController.registerCompany);
router.get("/get", isAuthenticated, companyController.getCompany);
router.get("/get/:id", isAuthenticated, companyController.getCompanyById);
router.put(
  "/update/:id",
  isAuthenticated,
  singleUpload,
  companyController.updateCompany,
);

export default router;
