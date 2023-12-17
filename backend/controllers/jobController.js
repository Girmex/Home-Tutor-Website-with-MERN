import Job from "../models/jobModel.js";
import asyncHandler from "express-async-handler";

const getJobs = asyncHandler (async (req, res) => {
  try {
    const { company, subject, location, experience } = req.query;

    // Build the query object based on selected criteria
    const query = {};

    if (company) {
      query.company = company;
    }

    if (subject) {
      query.subject = subject;
    }

    if (location) {
      query.location = location;
    }

    if (experience) {
      query.experience = experience;
    }

    const jobs = await Job.find(query);

    res.json({ data: jobs });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching jobs" });
  }
});
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  console.log(req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "job not found" });
  }

  res.json(job);
});

//@description     Create single Job
//@route           GET /api/jobs/create
//@access          Private
const CreateJob = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const job = new Job({ user: req.user._id, title, content, category });

    const createdJob = await job.save();

    res.status(201).json(createdJob);
  }
});

//@description     Delete single Job
//@route           GET /api/jobs/:id
//@access          Private
const DeleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (job) {
    await job.deleteOne();
    res.json({ message: "Job Removed" });
  } else {
    res.status(404);
    throw new Error("Job not Found");
  }
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
const UpdateJob = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const job = await Job.findById(req.params.id);

  if (job.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (job) {
    job.title = title;
    job.content = content;
    job.category = category;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

export { getJobById, getJobs, CreateJob, DeleteJob, UpdateJob };
