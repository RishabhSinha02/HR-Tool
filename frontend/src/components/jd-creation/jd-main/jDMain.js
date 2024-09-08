import { useState } from "react";
import {
  useCreateJobDescriptionMutation,
  useCreateJobMutation,
} from "../../../queries/job";
import JdTimeline from "../jd-timeline/jd-timeline";
import { useFetchUsers } from "../../../queries/users";
import { useAuth } from "../../../auth/authContext";

const JdMain = () => {
  const [summeryNavbar, setSummeryNavbar] = useState(1);
  const [jobDetails, setJobDetails] = useState({});
  const { mutate, isLoading, error } = useCreateJobMutation();
  const [jd, setJD] = useState("");
  const {
    mutate: jdMutate,
    isLoading: jdLoading,
    error: jdError,
  } = useCreateJobDescriptionMutation(setJD);
  const { user } = useAuth();
  const [timelineStage, setTimelineStage] = useState(1);

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useFetchUsers();

  console.log(users);

  const [formData, setFormData] = useState({
    title: "",
    designation: "",
    location: "",
    remote: false,
    coreTechSkills: "",
    qualifications: "",
    experience: "",
    secondarySkills: "",
    hrManager: "",
    hrManagerEmail: "",
    hrLead: "",
    hrLeadEmail: "",
    company: user?.company,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    const selectedUser = users && users.find((user) => user.email === value);

    if (name === "hrManagerEmail") {
      setFormData({
        ...formData,
        hrManagerEmail: value,
        hrManager: selectedUser?.name || "",
      });
    } else if (name === "hrLeadEmail") {
      setFormData({
        ...formData,
        hrLeadEmail: value,
        hrLead: selectedUser?.name || "",
      });
    }
  };

  const handleSubmitForJob = (e) => {
    e.preventDefault();
    console.log("Job Data:", formData);
    const updatedForm = { ...formData, remote: formData.remote ? "Yes" : "No" };

    delete updatedForm.hrManagerEmail;
    delete updatedForm.hrLeadEmail;

    const selectedHrManager = users.find(
      (u) => u.email == formData.hrManagerEmail
    );
    const selectedHrLead = users.find((u) => u.email == formData.hrLeadEmail);

    console.log(selectedHrLead, selectedHrManager);

    updatedForm.hrManager = selectedHrManager?._id || formData.hrManager;
    updatedForm.hrLead = selectedHrLead?._id || formData.hrLead;

    console.log(updatedForm);
    mutate({ formData: updatedForm, user: user });

    //Code for sending the data to an API ===== Ankush ====
  };

  const handleSubmitForJD = (e) => {
    e.preventDefault();
    console.log("Job Data:", formData);
    const updatedForm = { ...formData, remote: formData.remote ? "Yes" : "No" };

    jdMutate({ formData: updatedForm, user });

    //Code for sending the data to an API ===== Ankush ====
  };

  return (
    <div
      className="main card border rounded-lg m-8 h-full"
      style={{ backgroundColor: "white" }}
    >
      <div
        className="card border rounded-none rounded-t-lg text-white"
        style={{ backgroundColor: "#7F00FF" }}
      >
        <JdTimeline stage={timelineStage} />
      </div>

      {/* Create New Job Form  */}
      <form>
        <div className="m-8">
          <div className="text-2xl mb-4 font-bold">Company: {user.company}</div>
          <div className="flex flex-wrap gap-4">
            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">Job Title</span>
              </div>
              <input
                name="title"
                placeholder="Software Developer"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.title}
                onChange={handleChange}
              />
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">Department</span>
              </div>
              <input
                name="designation"
                placeholder="Engineer"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.designation}
                onChange={handleChange}
              />
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">Location</span>
              </div>
              <input
                name="location"
                placeholder="Mumbai"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.location}
                onChange={handleChange}
              />
            </label>

            <label
              className="form-control content-center"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">Remote</span>
              </div>
              <div className="flex items-center m-2">
                <input
                  name="remote"
                  type="checkbox"
                  className="checkbox m-0 p-0 checkbox-xs rounded-sm checkbox-primary"
                  checked={formData.remote}
                  onChange={handleChange}
                />
                <div className="mx-2">Work From Home</div>
              </div>
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">Skills</span>
              </div>
              <input
                name="coreTechSkills"
                placeholder="C, Java, React"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.coreTechSkills}
                onChange={handleChange}
              />
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">Qualifications</span>
              </div>
              <input
                name="qualifications"
                placeholder="Bachelor's Degree in Computer Science"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.qualifications}
                onChange={handleChange}
              />
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">Experience</span>
              </div>
              <input
                name="experience"
                placeholder="2 years"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.experience}
                onChange={handleChange}
              />
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">Additional Requirements</span>
              </div>
              <textarea
                name="secondarySkills"
                placeholder="Specific requirements here"
                className="input rounded-md h-32"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.secondarySkills}
                onChange={handleChange}
              ></textarea>
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">HR Manager Email</span>
              </div>
              <select
                name="hrManagerEmail"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.hrManagerEmail}
                onChange={handleEmailChange}
              >
                <option value="" disabled>
                  Select HR Manager Email
                </option>
                {users?.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">HR Manager Name</span>
              </div>
              <input
                name="hrManager"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.hrManager}
                readOnly
              />
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">HR Lead Email</span>
              </div>
              <select
                name="hrLeadEmail"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.hrLeadEmail}
                onChange={handleEmailChange}
              >
                <option value="" disabled>
                  Select HR Lead Email
                </option>
                {users?.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </label>

            <label
              className="form-control"
              style={{ fontSize: "15px", width: "600px" }}
            >
              <div className="label">
                <span className="label-text">HR Lead Name</span>
              </div>
              <input
                name="hrLead"
                className="input rounded-md"
                style={{ backgroundColor: "#F9F9F9" }}
                value={formData.hrLead}
                readOnly
              />
            </label>
          </div>

          <div className="flex justify-end gap-6 m-8">
            <div></div>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#7F00FF" }}
              type="submit"
              onClick={handleSubmitForJD}
            >
              {jdLoading ? 
              
              <div className="mx-8">
              
              <span className="loading loading-bars loading-md"></span>
              </div>

               : "Generate JD"} 
            </button>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#7F00FF" }}
              type="submit"
              onClick={handleSubmitForJob}
            >
              {isLoading ? 

              <div className="mx-4">
              
              <span className="loading loading-bars loading-md"></span>
              </div>
              
               : "Create Job"} 
            </button>
          </div>
        </div>
      </form>
      {jd &&
        <p className="card border mr-16 ml-8 mb-8 p-8">
        <div dangerouslySetInnerHTML={{ __html: jd }}/>
      </p>}
    </div>
  );
};
export default JdMain;
