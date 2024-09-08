const constants = require("../utils/constants");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    company: {
      type: String,
    },
    joined: {
      type: Date,
      default: Date.now,
    },
    adminPrivilage: {
      type: [String],
      enum: [
        constants.adminPrivilages.admin,
        constants.adminPrivilages.jobPoster,
        constants.adminPrivilages.scheduler,
        constants.adminPrivilages.viewer,
      ],
      default: [constants.adminPrivilages.viewer],
    },
  },
  {
    timestamps: true,
  }
);

user.plugin(passportLocalMongoose);
const users = mongoose.model("users", user);
module.exports = users;
