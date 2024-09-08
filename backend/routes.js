const express = require("express");
const constants = require("./utils/constants.js");
const passport = require("passport");
const fileupload = require("express-fileupload");
const jwt = require("jsonwebtoken");

const {
  RegisterUser,
  validateLoginRequest,
  getAllJobOpenings,
  getJobOpening,
  deleteJobOpening,
  createJobOpening,
  updateJobOpening,
  getProcesses,
  updateProcessStatus,
  updateProcessByAddingRound,
  createCandidate,
  uploadResumesAgainstJob,
  generateEmail,
  loginUser,
  getUsersList,
  generateJobDescription,
  generateQuestions,
  sendEmail,
} = require("./controller");
const { findUserById } = require("./middlewares/user.db.middleware.js");
const { jwtSecret } = require("./config/config.js");

const userRouter = express.Router();
const jobsRouter = express.Router();
const candidateRouter = express.Router();
const processRouter = express.Router();

function sendResponse(res, response) {
  console.log(response.status);
  switch (response.status) {
    case constants.responseStatus.success:
      res.status(200).send(response);
      break;
    case constants.responseStatus.badRequest:
      res.status(400).send(response);
      break;
    case constants.responseStatus.unauthorized:
      res.status(401).send(response);
      break;
    case constants.responseStatus.pageNotFound:
      res.status(404).send(response);
      break;
    case constants.responseStatus.internalServerError:
      res.status(500).send(response);
      break;
  }
}

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        sendResponse(res, {
          status: constants.responseStatus.unauthorized,
          message: `Provide token`,
        });
        return;
      }

      const decoded = await jwt.verify(token, jwtSecret);

      req.user = await findUserById(decoded.id);
      req.token = token;
      next();
    } catch (error) {
      console.log(error);
      sendResponse(res, {
        status: constants.responseStatus.unauthorized,
        message: `Unauthorized`,
      });
    }
    return;
  }
  if (!token) {
    sendResponse(res, {
      status: constants.responseStatus.unauthorized,
      message: `Provide token`,
    });
  }
};

/*  -------------- USER ROUTES --------------   */
userRouter.get("/", protect, (req, res) => {
  console.log("Session is : ", req.session);
  if (req.user)
    sendResponse(res, {
      status: constants.responseStatus.success,
      user: req.user,
    });
  else {
    sendResponse(res, {
      status: constants.responseStatus.pageNotFound,
      message: "No logged in user",
    });
  }
});
userRouter.post("/register", (req, res) => {
  console.log(`POST [/user/signup] User Signup Request => ${req.body?.email}`);

  const user = req.body;
  RegisterUser(user)
    .then((response) => {
      console.log(`User register response ${req.body?.email}) => response`);
      sendResponse(res, response);
    })
    .catch((err) => {
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const validation = validateLoginRequest(email, password);

  if (validation != null) {
    console.error("User Login Resposne for", email, validation);
    return sendResponse(res, validation);
  }

  loginUser(email, password)
    .then((response) => {
      console.log(`POST [/users/] New Job opening request) => response`);
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
userRouter.get("/all", protect, async (req, res) => {
  getUsersList()
    .then((response) => {
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});

/*  -------------- JOB ROUTES --------------   */
jobsRouter.post("/", protect, async (req, res) => {
  console.log(`POST [/jobs/] New Job opening request`);
  const job = req.body;

  createJobOpening(job)
    .then((response) => {
      console.log(
        `POST [/jobs/] New Job opening request ${job?.title}) => response`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
jobsRouter.get("/", protect, async (req, res) => {
  console.log(`GET [/jobs/] Get All Job openings request`);

  getAllJobOpenings()
    .then((response) => {
      console.log(`GET [/jobs/] Get All Job openings request => response}`);
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
jobsRouter.post("/generate-jd", protect, async (req, res) => {
  const job = req.body;
  generateJobDescription(job, req.user)
    .then((response) => {
      console.log(`POST generate JD for ${job?.title}}`);
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});

jobsRouter.post("/generate-email", protect, async (req, res) => {
  const { candidateInfo, meetingInfo } = req.body;
  generateEmail(candidateInfo, meetingInfo)
    .then((response) => {
      console.log(
        `POST generate email for ${candidateInfo?.email}) => response ${response}`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
jobsRouter.post("/generate-questions", protect, async (req, res) => {
  const { prompt } = req.body;

  generateQuestions(prompt)
    .then((response) => {
      console.log(`POST generate questions for ${prompt}}`);
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
jobsRouter.get("/:id", protect, async (req, res) => {
  console.log(`GET [/jobs/:id] GET Job opening by id request`);

  const { id } = req.params;
  getJobOpening(id)
    .then((response) => {
      console.log(
        `GET [/jobs/:id] GET Job opening by id request ${id}) => response`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
jobsRouter.post(
  "/:id/upload-resumes",
  protect,
  fileupload(),
  async (req, res) => {
    const { id } = req.params;
    console.log(
      `POST [/jobs/:id/resume] POST upload resumes against jobId ${id}`
    );
    const resumes = req.files;
    const token = req.headers.authorization;

    uploadResumesAgainstJob(id, resumes, token)
      .then((response) => {
        console.log(
          `POST [/jobs/:id/resume] POST upload resumes against jobId ${id} => response`
        );
        sendResponse(res, response);
      })
      .catch((err) => {
        console.log("Error Occurred", err);
        sendResponse(res, {
          status: constants.responseStatus.internalServerError,
          message: err.message,
        });
      });
  }
);
jobsRouter.patch("/:id", protect, async (req, res) => {
  console.log(`PATCH [/jobs/:id] UPDATE Job opening by id request`);

  const { id } = req.params;
  const job = req.body;

  updateJobOpening(id, job)
    .then((response) => {
      console.log(
        `PATCH [/jobs/:id] UPDATE Job opening by id request ${id}) => response`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
jobsRouter.delete("/:id", protect, async (req, res) => {
  console.log(`DELETE [/jobs/:id] DELETE Job opening by id request`);

  deleteJobOpening(req.params.id)
    .then((response) => {
      console.log(
        `DELETE [/jobs/:id] DELETE Job opening by id request ${id}) => response`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});

/*  -------------- CANDIDATE ROUTES --------------   */
candidateRouter.post("/", fileupload(), (req, res) => {
  console.log(`POST [/candidates/] Post a candidate`);

  const { candidateInfo, scores, resumeLink, jobId } = req.body;

  createCandidate(candidateInfo, scores, resumeLink, jobId)
    .then((response) => {
      console.log(`GET [/jobs/] Get All Job openings request => response`);
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});

/*  -------------- PROCESS ROUTES --------------   */
processRouter.get("/", protect, async (req, res) => {
  const { filter, jobId } = req.query;
  console.log(
    `GET [/process/?filter] GET process according to filter ${filter} default:underway`
  );

  getProcesses(filter, jobId)
    .then((response) => {
      console.log(
        `GET [/process/?filter] GET process according to filter ${filter} default:underway) => response}`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
processRouter.patch("/:id/change-status", protect, async (req, res) => {
  console.log(`PATCH [/process/?filter] PATCH request to change the status`);
  const status = req.body.newStatus;
  const { id } = req.params;

  updateProcessStatus(id, status)
    .then((response) => {
      console.log(
        `PATCH [/process/?filter] PATCH request to change the status) => response`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});
processRouter.patch("/:id/rounds", protect, async (req, res) => {
  console.log(`PATCH [/process/:id/rounds] PATCH request to change the status`);
  const { roundDetails, roundNumber } = req.body;
  const { id } = req.params;

  updateProcessByAddingRound(id, roundDetails, roundNumber)
    .then((response) => {
      console.log(
        `PATCH [/process/?filter] PATCH request to change the status) => response`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});

processRouter.post("/:id/send-mail", protect, async (req, res) => {
  console.log(
    `POST [/process/:id/send-email]  Sending email to candidate with email ${req.body.email}`
  );

  sendEmail(req.params.id, req.body, req.user)
    .then((response) => {
      console.log(
        `POST [/process/:id/send-email]  Sending email to candidate with email ${req.body.email}) => response}`
      );
      sendResponse(res, response);
    })
    .catch((err) => {
      console.log("Error Occurred", err);
      sendResponse(res, {
        status: constants.responseStatus.internalServerError,
        message: err.message,
      });
    });
});

module.exports = {
  userRouter,
  jobsRouter,
  candidateRouter,
  processRouter,
};
