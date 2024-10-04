import { getDataUri, cloudinary } from "#utils";
import { CompanyModel as Company } from "#jobPortal/models";

import { asyncErrorHandler, ErrorHandler } from "#ecommerece/middlewares";

const registerCompany = asyncErrorHandler(async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return new ErrorHandler(400, "Company name is required.");
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return new ErrorHandler(400, "You can't register same company.");
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
const getCompany = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return new ErrorHandler(404, "Companies not found.");
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
// get company by id
const getCompanyById = asyncErrorHandler(async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return new ErrorHandler(404, "Company not found.");
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
const updateCompany = asyncErrorHandler(async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    // idhar cloudinary ayega
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return new ErrorHandler(404, "Company not found.");
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});

const companyController = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
};

export default companyController;
