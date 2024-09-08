const jobs = require("../models/job.model");

const createJob = async (job) => {
  try {
    const newJob = await jobs.create(job);
    return newJob;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllJobs = async () => {
  try {
    const allJobs = await jobs.find().exec();
    return allJobs;
  } catch (error) {
    return null;
  }
};
const getJobById = async (id) => {
  try {
    const job = await jobs.findById(id).exec();
    return job;
  } catch (error) {
    return null;
  }
};

const updateJob = async (job) => {
  try {
    const updatedJob = await jobs.findByIdAndUpdate(id, job).exec();
    return updatedJob;
  } catch (error) {
    return null;
  }
};

const deleteJobById = async (id) => {
  try {
    await jobs.findByIdAndDelete(id).exec();
    return true;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJobById,
};
