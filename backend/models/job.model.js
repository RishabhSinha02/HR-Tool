const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyDetails: {
    type: Object,
    default: {},
  },
  experience: {
    type: Number,
  },
  coreTechSkills: {
    type: [String],
  },
  location: {
    type: String,
  },
  remote: {
    type: String,
    enum: ["Yes", "No"],
  },
  secondarySkills: {
    type: [String],
    default: [],
  },
  industry: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  salaryFrom: {
    type: Number,
  },
  salaryTo: {
    type: Number,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  jobType: {
    type: String,
    enum: ["Contractual", "Full time"],
  },
  hrManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  hrLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  questions: {
    type: [String],
    default: [],
  },
  jobDescription: {
    type: String,
  },
});

const job = mongoose.model("jobs", jobSchema);

module.exports = job;
