import express from "express";
import { isAuthenticated } from "#jobPortal/middlewares";
import { companyController } from "#jobPortal/controllers";
import { singleUpload } from "#jobPortal/middlewares";

const router = express.Router();

router
  .route("/register")
  .post(isAuthenticated, companyController.registerCompany);
router.route("/get").get(isAuthenticated, companyController.getCompany);
router.route("/get/:id").get(isAuthenticated, companyController.getCompanyById);
router
  .route("/update/:id")
  .put(isAuthenticated, singleUpload, companyController.updateCompany);

export default router;
