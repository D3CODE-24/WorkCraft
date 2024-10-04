import { JobModel as Job } from "#jobPortal/models";
import { asyncErrorHandler, ErrorHandler } from "#ecommerece/middlewares";
// admin post krega job
const postJob = asyncErrorHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return new ErrorHandler(400, "All fields are required.");
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
// student k liye
const getAllJobs = asyncErrorHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return new ErrorHandler(404, "No Jobs found.");
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
// student
const getJobById = asyncErrorHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return new ErrorHandler(404, "Job not found.");
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
// admin kitne job create kra hai abhi tk
const getAdminJobs = asyncErrorHandler(async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return new ErrorHandler(404, "No Jobs found.");
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});

const jobController = {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
};

export default jobController;
