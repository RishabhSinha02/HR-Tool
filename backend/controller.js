const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("./config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  deleteCandidate,
  createNewCandidate,
  checkIfCandidateExistsByEmailAndJobId,
} = require("./middlewares/candidate.db.middleware");
const {
  getAllJobs,
  updateJob,
  createJob,
  getJobById,
  deleteJobById,
} = require("./middlewares/job.db.middleware");
const {
  getInterviewProcessById,
  createCandidateInterview,
  getProcessesByFilterAndJobId,
  updateProcess,
} = require("./middlewares/process.db.middleware");
const {
  findUserByEmail,
  createUser,
  deleteUserByEmail,
  getAllUsers,
} = require("./middlewares/user.db.middleware");

const constants = require("./utils/constants");
const { encryptPassword } = require("./utils/hash");
const path = require("path");
const fs = require("fs");
const {
  isNullOrEmpty,
  isValidEmail,
  isValidPassword,
} = require("./utils/strings");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);
const sgMail = require("@sendgrid/mail");
const { default: axios } = require("axios");
sgMail.setApiKey(config.sendGridApiKey);
/*  -------------- USER CONTROLLERS --------------   */
const RegisterUser = async (user) => {
  const userExists = await findUserByEmail(user.email);

  if (userExists) {
    return {
      status: constants.responseStatus.badRequest,
      message: "User already exists",
    };
  } else {
    const { name, email, password } = user;

    if (isNullOrEmpty(name)) {
      return { status: "BAD_REQUEST", message: "Name cannot be empty" };
    }

    if (isNullOrEmpty(email) || !isValidEmail(email)) {
      return { status: "BAD_REQUEST", message: "Email cannot be empty" };
    }
    if (isNullOrEmpty(password) || !isValidPassword(password)) {
      return { status: "BAD_REQUEST", message: "Password cannot be empty" };
    }
  }
  user.password = await encryptPassword(user.password.toString());
  const newUser = await createUser(user);

  if (!newUser) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      message: "Failed registering a user.",
    };
  }
  return {
    status: "SUCCESS",
    message: "User created successfully",
    user: newUser,
  };
};
const validateLoginRequest = (email, password) => {
  console.log(email, password);

  if (isNullOrEmpty(email)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Email cannot be empty",
    };
  }
  if (isNullOrEmpty(password)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Password cannot be empty",
    };
  }
  return null;
};
const loginUser = async (email, password) => {
  let user = await findUserByEmail(email);

  if (
    user &&
    user.password &&
    (await bcrypt.compare(password, user.password))
  ) {
    user = user.toObject(); // Convert to plain JavaScript object
    const updatedUser = {
      ...user,
      token: generateToken(user._id),
    };
    return {
      status: "SUCCESS",
      message: "User loggedIn successfully",
      user: updatedUser,
    };
  }

  if (!user) {
    return {
      status: constants.responseStatus.badRequest,
      message: `Email not registered`,
    };
  }

  return {
    status: constants.responseStatus.badRequest,
    message: `Invalid credentials`,
    job: null,
  };
};
const getUsersList = async () => {
  const users = await getAllUsers();

  if (users != null) {
    return {
      status: constants.responseStatus.success,
      message: "Users List retrived successfully",
      users,
    };
  }

  return {
    status: constants.responseStatus.internalServerError,
    message: "Failed to retrieve users list.",
  };
};
// const updatePrivilagesOfUser = async (privilages) => {
//   if (!privilages) {
//     return {
//       status: constants.responseStatus.badRequest,
//       message: "Privilages cannot be empty",
//     };
//   }
// };

/*  -------------- JOB CONTROLLERS --------------   */
const getJobDescription = async (job, user) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Create a detailed job description for a ${job.title} position at ${job.company}. 
    Include a brief introduction about the company, outlining its mission, values, and what makes it unique. 
    Describe the role of the ${job.title}, including key responsibilities and primary objectives. 
    List the required qualifications, necessary skills, and any preferred experience. 
    Highlight the benefits and perks offered to employees. 
    Provide clear instructions on how candidates can apply, and include a statement about the company's commitment to diversity and inclusion.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text ? text : null;
  } catch (error) {
    console.error("Error generating job description:", error);
    return null;
  }
};

const generateJobDescription = async (job, user) => {
  if (!job) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide job details!",
    };
  }
  const jd = await getJobDescription(job, user);

  if (jd) {
    return {
      status: constants.responseStatus.success,
      message: "Job description created successfully!",
      jobDescription: jd,
    };
  }

  return {
    status: constants.responseStatus.internalServerError,
    message: "Failed to create Job description!",
  };
};

const generateQuestions = async (data) => {
  if (!data) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide questions details!",
    };
  }
  const questions = await getJobQuestions(data);

  if (questions) {
    return {
      status: constants.responseStatus.success,
      message: "Questions generated successfully!",
      questions,
    };
  }

  return {
    status: constants.responseStatus.internalServerError,
    message: "Failed to generate questions!",
  };
};

const generateEmail = async (candidateInfo, meetingInfo) => {
  const { name, email } = candidateInfo;
  const { date, time, timezone, meetingLink, role, company } = meetingInfo;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `write an email to ${name} congratulating him for success selection to next round at ${company} for ${role} role. Giving him details of next interview with date ${date}, ${time} ${timezone}, and give an option to select slot from calendar invite with link ${meetingLink} sending mail from ${"Rahul Shrivastava"}, Hiring Manager. 
  Give me the string of content inside the HTML body tag with well structure about its fonts-weights, sub-headings,paragraphs margins,etc. the response should not contain body tag, cards layout, etc. it should look like professional email. also response should only contain HTML string.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  if (text) {
    return {
      status: constants.responseStatus.success,
      message: "Email generated successfully",
      email: text,
    };
  } else {
    return {
      status: constants.responseStatus.badRequest,
      message: `Failed to generate email`,
    };
  }
};

const getJobQuestions = async (inputPrompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // const prompt = `
  //   Generate a list of interview questions for the position of ${
  //     job?.title
  //   } at ${job?.company}.
  //   The candidate should ideally have ${
  //     job?.experience || "unspecified"
  //   } years of experience and be proficient in ${
  //   job?.topics?.join(", ") || "the relevant technologies"
  // }.
  //   The job is ${job?.remote === "Yes" ? "remote" : "on-site"} and located in ${
  //   job?.location || "an unspecified location"
  // }.
  //   Focus on questions that assess technical skills, experience in the ${
  //     job?.industry || "relevant"
  //   } industry, and behavioral attributes.
  //   Include both technical and behavioral questions.
  // `;

  const prompt = `
  Generate in html tags for ${inputPrompt}
  In response give me the only string of content inside the HTML body tag with well structure about its fonts-weights, sub-headings,paragraphs margins,etc. the response should not contain body tag, cards layout, etc. also response should only contain HTML string`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text ? text.split("\n").filter(Boolean) : null;
  } catch (error) {
    console.error("Error generating job questions:", error);
    return null;
  }
};

const getAllJobOpenings = async () => {
  const allJobs = await getAllJobs();
  if (!allJobs)
    return {
      status: constants.responseStatus.success,
      message: "There are no job openings",
      jobs: [],
    };
  return {
    status: constants.responseStatus.success,
    message: "Job openings fetched successfully!",
    jobs: allJobs,
  };
};
const getJobOpening = async (jobId) => {
  if (isNullOrEmpty(jobId)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide JobId!",
    };
  }
  const job = await getJobById(jobId);
  if (!job)
    return {
      status: constants.responseStatus.badRequest,
      message: `There are no job opening with given jobId ${jobId}`,
      job: null,
    };
  return {
    status: constants.responseStatus.success,
    message: "Job opening fetched successfully!",
    job: job,
  };
};

const createJobOpening = async (job) => {
  if (!job) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide Job Details",
    };
  }

  const createdJob = await createJob(job);
  if (!createdJob)
    return {
      status: constants.responseStatus.internalServerError,
      message: "Failed to create job opening",
    };

  console.log(__dirname, createdJob._id);
  const folderPath = path.join(
    __dirname,
    "../resumes",
    createdJob._id.toString()
  );
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder created: ${folderPath}`);
    }
  } catch (error) {
    await deleteJobById(createdJob._id.toString());
    console.log(error);
    return {
      status: constants.responseStatus.internalServerError,
      message: "Failed to create job opening",
    };
  }

  return {
    status: constants.responseStatus.success,
    message: "Job opening created successfully!",
    job: createdJob,
  };
};
const updateJobOpening = async (jobId, job) => {
  if (isNullOrEmpty(jobId)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide JobId!",
    };
  }

  if (!job) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide job details!",
    };
  }

  const updatedJob = await updateJob(job);
  if (!updatedJob)
    return {
      status: constants.responseStatus.badRequest,
      message: "There are no job opening with given Id",
      job: null,
    };
  return {
    status: constants.responseStatus.success,
    message: "Job openings fetched successfully!",
    job: updatedJob,
  };
};
const deleteJobOpening = async (jobId) => {
  if (isNullOrEmpty(jobId)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide JobId!",
    };
  }
  const deletedJOb = await deleteJobById(jobId);
  if (!deletedJOb)
    return {
      status: constants.responseStatus.badRequest,
      message: "Failed to delete the given Job with jobId",
    };
  return {
    status: constants.responseStatus.badRequest,
    message: "Deleted Job successfully!",
  };
};

const uploadResumesAgainstJob = async (jobId, resumesObj) => {
  if (isNullOrEmpty(jobId)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide JobId!",
    };
  }

  if (
    !resumesObj ||
    !Array.isArray(resumesObj.resumes) ||
    resumesObj.resumes.length === 0
  ) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide resumes!",
    };
  }

  // Define the folder path where resumes will be saved
  const folderPath = path.join(__dirname, "../resumes", jobId);
  const failed = [];
  const resumesUploaded = [];

  try {
    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Process and save resumes
    for (const resume of resumesObj.resumes) {
      if (resume && resume.name && resume.data) {
        const filePath = path.join(folderPath, resume.name); // Use resume.name for the file name
        fs.writeFileSync(filePath, resume.data); // Write the Buffer data to the file
        resumesUploaded.push(resume.name);
      } else {
        failed.push(resume.name);
        console.warn(`Skipping invalid resume: ${JSON.stringify(resume)}`);
      }
    }
  } catch (error) {
    console.error(`Error uploading resumes: ${error.message}`);
    return {
      status: constants.responseStatus.internalServerError,
      message: "Failed to upload resumes",
    };
  }

  // genAI api call

  // const genaiResp = await axios.get("http://127.0.0.1:55354/features/");

  // console.log(genaiResp);

  // const failed = [];

  // for (const [key, value] of Object.entries(genaiResp)) {
  //   if (value !== 200) failed.push(key);
  // }

  return {
    status: constants.responseStatus.success,
    message: `Successfully uploaded resumes against jobId ${jobId}`,
    resumesFailed: failed,
    resumesUploaded,
  };
};

/*  -------------- CANDIDATE CONTROLLERS --------------   */
const createCandidate = async (candidate, scores, resumeLink, jobId) => {
  if (!candidate) {
    return {
      status: constants.responseStatus.internalServerError,
      message: "Candidate Information not ready!",
    };
  }

  const ifCandidateExists = await checkIfCandidateExistsByEmailAndJobId(
    candidate?.email,
    jobId
  );

  if (ifCandidateExists) {
    return {
      status: constants.responseStatus.badRequest,
      message: `Applicant with given email ${candidate?.email} is already a candidate with jobId ${jobId}`,
    };
  }
  candidate.jobId = jobId;
  const createdCandidate = await createNewCandidate(candidate);

  if (!createdCandidate) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Failed to add candidate entry!",
    };
  }

  const candidateInterview = {
    candidateId: createdCandidate._id,
    jobId,
    resume: resumeLink,
    scores,
  };
  const createdInterview = await createCandidateInterview(candidateInterview);

  if (!createdInterview) {
    await deleteCandidate(createdCandidate._id);
    return {
      status: constants.responseStatus.internalServerError,
      message: "Failed to create candidate & interview instance!",
    };
  }
  return {
    status: constants.responseStatus.success,
    message: "Interview instance created succesfully!",
    process: createdInterview,
  };
};

/*  -------------- PROCESS CONTROLLERS --------------   */
const getProcesses = async (filter, jobId) => {
  if (isNullOrEmpty(jobId)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide jobId",
    };
  }

  const processes = await getProcessesByFilterAndJobId(jobId);

  if (!processes) {
    return {
      status: constants.responseStatus.internalServerError,
      message: "Failed to fetch processes",
    };
  }

  const updatedProcesses = processes.map((process) => {
    // Convert Mongoose document to plain object
    const plainProcess = process.toObject();

    const { experience, education, skills, filteringQuestions } =
      plainProcess.scores;

    const averageScore =
      (experience + education + skills + filteringQuestions) / 4;

    const overallScore = (averageScore / 10) * 100;

    return {
      ...plainProcess,
      scores: {
        ...plainProcess.scores,
        overallScore,
      },
    };
  });

  return {
    status: constants.responseStatus.success,
    message: "Processes fetched successfully",
    processes: updatedProcesses,
  };
};
const updateProcessStatus = async (processId, status) => {
  if (isNullOrEmpty(processId)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "ProcessId not provided!",
    };
  }

  if (isNullOrEmpty(status)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide status to change!",
    };
  }

  if (!constants.validStatuses.includes(status)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Invalid status value",
    };
  }

  let candidateInterview = await getInterviewProcessById(processId);

  if (!candidateInterview) {
    return {
      status: constants.responseStatus.badRequest,
      message: "No such process with given Id",
    };
  }

  candidateInterview.status = status;

  const updatedProcess = await updateProcess(processId, candidateInterview);

  if (!updatedProcess) {
    return {
      status: constants.responseStatus.internalServerError,
      message: "Failed to change status of process!",
    };
  }

  return {
    status: constants.responseStatus.success,
    message: "Status of process changed successfully!",
  };
};
const updateProcessByAddingRound = async (processId, round, roundNumber) => {
  if (isNullOrEmpty(processId)) {
    return {
      status: constants.responseStatus.badRequest,
      message: "ProcessId not provided!",
    };
  }

  if (!round) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Please provide the round details to be added!",
    };
  }

  let candidateInterview = await getInterviewProcessById(processId);

  if (!candidateInterview) {
    return {
      status: constants.responseStatus.badRequest,
      message: "No such process with given Id",
    };
  }

  if (roundNumber == candidateInterview.rounds.length) {
    return {
      status: constants.responseStatus.badRequest,
      message: "Already added the feedback of round " + round,
    };
  }

  if (candidateInterview.status != "shortlist") {
    return {
      status: constants.responseStatus.badRequest,
      message: "Cannot add round with the current status!",
    };
  }
  candidateInterview.rounds.push(round);

  if (round.nextRoundRecommend == "No") {
    const updatedProcess = await updateProcess(processId, candidateInterview);

    return {
      status: constants.responseStatus.success,
      message:
        "Round details added successfully to process & rejected the candidate",
    };
  }

  if (roundNumber == 3) {
    candidateInterview.status = "selected";
  }

  const updatedProcess = await updateProcess(processId, candidateInterview);

  if (!updatedProcess) {
    return {
      status: constants.responseStatus.internalServerError,
      message: "Failed to add the new round's detail to interview process!",
    };
  }

  return {
    status: constants.responseStatus.success,
    message: "Round details added successfully to process!",
  };
};

const sendEmail = async (data, user) => {
  const { email, hrEmail, hrManagerEmail, date, time, emailBody } = data;
  const msg = {
    to: email, // Replace with your recipient
    from: "workfoxmail@gmail.com", // Replace with your verified sender
    subject: "Call for interview",
    // text: "This is a test email sent from SendGrid using Node.js!",
    html: emailBody,
  };

  try {
    await sgMail.send(msg);
    return {
      status: constants.responseStatus.success,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: constants.responseStatus.internalServerError,
      message:
        "Error sending email" + error?.response
          ? ": " + error.response?.body
          : "!",
    };
  }
};

const generateToken = (id) => {
  const token = jwt.sign({ id }, config.jwtSecret, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = {
  validateLoginRequest,
  RegisterUser,
  generateEmail,
  getAllJobOpenings,
  getJobOpening,
  createJobOpening,
  updateJobOpening,
  deleteJobOpening,
  uploadResumesAgainstJob,
  createCandidate,
  updateProcessStatus,
  getProcesses,
  updateProcessByAddingRound,
  loginUser,
  getUsersList,
  generateJobDescription,
  generateQuestions,
  sendEmail,
};
