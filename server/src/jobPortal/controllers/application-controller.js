import {
  ApplicationModel as Application,
  JobModel as Job,
} from "#jobPortal/models";

import { asyncErrorHandler, ErrorHandler } from "#ecommerece/middlewares";

const applyJob = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return new ErrorHandler(400, "Job id is required.");
    }
    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return new ErrorHandler(400, "You have already applied for this jobs");
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      return new ErrorHandler(404, "Job not found");
    }
    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
const getAppliedJobs = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return new ErrorHandler(404, "No Applications");
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
// admin dekhega kitna user ne apply kiya hai
const getApplicants = asyncErrorHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return new ErrorHandler(404, "Job not found.");
    }
    return res.status(200).json({
      job,
      succees: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
const updateStatus = asyncErrorHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return new ErrorHandler(400, "status is required");
    }

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return new ErrorHandler(404, "Application not found.");
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});

const applicationController = {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
};
export default applicationController;
