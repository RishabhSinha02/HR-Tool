const candidateInterviews = require("../models/process.model");

const createCandidateInterview = async (candidateInterview) => {
  try {
    const newCandidateInterview = await candidateInterviews.create(
      candidateInterview
    );
    return newCandidateInterview;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checkCandidateInterviewByEmailAndJobId = async (email, jobId) => {
  const allCandidates = await candidateInterviews
    .find({ jobId })
    .populate({ path: "candidateId", select: "email" });
  for (let candidate of allCandidates) {
    if (candidate.candidateId?.email == email) return true;
  }
  return false;
};

const getInterviewProcessById = async (id) => {
  try {
    const candidateInterview = await candidateInterviews.findById(id).exec();
    return candidateInterview;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProcessesByFilterAndJobId = async (jobId) => {
  try {
    const processes = await candidateInterviews
      .find({ jobId })
      .populate({
        path: "candidateId",
        select: "_id name email yearsOfExperience coreTech secondaryTech",
      })
      .populate({
        path: "jobId",
        select: "_id title compnay designation",
      })
      .exec();
    return processes;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProcess = async (id, candidateInterview) => {
  try {
    const updatedCandidateInterview = await candidateInterviews
      .findByIdAndUpdate({ _id: id }, candidateInterview, { new: true })
      .exec();
    return updatedCandidateInterview;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  checkCandidateInterviewByEmailAndJobId,
  createCandidateInterview,
  getInterviewProcessById,
  updateProcess,
  getProcessesByFilterAndJobId,
};
