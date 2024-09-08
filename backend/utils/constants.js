const constants = {
  responseStatus: {
    success: "SUCCESS",
    badRequest: "BAD_REQUEST",
    internalServerError: "INTERNAL_SERVER_ERROR",
    pageNotFound: "PAGE_NOT_FOUND",
    unauthorized: "UNAUTHORIZED",
  },
  gender: {
    male: "Male",
    female: "Female",
    binary: "Binary",
  },
  adminPrivilages: {
    admin: "Admin",
    jobPoster: "JobPoster",
    scheduler: "Scheduler",
    viewer: "Viewer",
  },
  validStatuses: ["waitlist", "shortlist", "underway", "rejected", "selected"],
};
module.exports = constants;
