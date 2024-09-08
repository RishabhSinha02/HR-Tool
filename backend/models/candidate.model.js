const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  name: {
    type: String,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobs",
    required: true,
  },
  location: {
    type: String,
  },
  yearsOfExperience: {
    type: String,
  },
  coreTech: {
    type: [String],
    // required: true,
  },
  secondaryTech: {
    type: [String],
    default: [],
  },
  utilities: {
    type: [String],
    default: [],
  },
  utilityWiseExperience: {
    type: Map,
    of: Number,
    default: {},
  },
  noticePeriod: {
    type: String,
  },
  currentCompany: {
    type: String,
  },
  previousCompanies: {
    type: [String],
    default: [],
  },
  education: {
    type: Object,
    default: null,
  },
  gradCollege: {
    type: String,
  },
  postGradCollege: {
    type: String,
  },
  passingMarks: {
    type: Number,
  }, //ambigous
  locationOpenTo: {
    type: [String],
    default: [],
  },
  currentSalary: {
    type: Number,
  },
  expectedSalary: {
    type: Number,
  },
});

const Candidate = mongoose.model("candidates", candidateSchema);

module.exports = Candidate;
