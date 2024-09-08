const candidates = require("../models/candidate.model");

const createNewCandidate = async (candidate) => {
  try {
    const newCandidate = await candidates.create(candidate);
    return newCandidate;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCandidateByEmail = async (email) => {
  try {
    const candidate = await candidates.findOne({ email: email }).exec();
    return candidate;
  } catch (error) {
    console.error("Error fetching candidate by email:", error);
    return null;
  }
};

const checkIfCandidateExistsByEmailAndJobId = async (email, jobId) => {
  try {
    const candidate = await candidates.findOne({ email, jobId }).exec();
    return candidate !== null;
  } catch (error) {
    console.error("Error checking candidate existence:", error);
    return false;
  }
};

const deleteCandidate = async (candidateId) => {
  try {
    const deletedCandidate = await candidates
      .findByIdAndDelete(candidateId)
      .exec();
    return deletedCandidate;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createNewCandidate,
  deleteCandidate,
  getCandidateByEmail,
  checkIfCandidateExistsByEmailAndJobId,
};
