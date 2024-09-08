const mongoose = require("mongoose");

const interviewRoundSchema = new mongoose.Schema({
  date: {
    type: Date,
    // required: true,
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    // required: true,
  },
  feedbackTech: {
    type: String,
    default: "",
  },
  feedbackOther: {
    type: String,
    default: "",
  },
  feedbackFinal: {
    type: String,
    default: "",
  },
  nextRoundRecommend: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
});

const candidateInterviewSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidates",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    resume: {
      type: String,
      default: "",
    },
    rounds: { type: [interviewRoundSchema], default: [] },
    scores: {
      experience: { type: Number, default: 0 },
      education: { type: Number, default: 0 },
      skills: { type: Number, default: 0 },
      filteringQuestions: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["waitlist", "shortlist", "underway", "rejected", "selected"],
      default: "underway",
    },
  },
  { timestamps: true }
);

const CandidateInterview = mongoose.model(
  "candidatesInterviews",
  candidateInterviewSchema
);

module.exports = CandidateInterview;
