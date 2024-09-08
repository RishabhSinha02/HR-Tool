import React, { useState } from "react";
import { useChangeStatusMutation } from "../../../../queries/process";
import { useAuth } from "../../../../auth/authContext";

const CandidateMatchesCard = ({ process }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [removeAlert, setRemoveAlert] = useState(false);
  const [addAlert, setAddAlert] = useState(false);
  const [waitlistAlert, setWaitlistAlert] = useState(false);

  const toggleRemoveAlert = () => {
    setRemoveAlert(true);
    setTimeout(() => {
      setRemoveAlert(false);
    }, 2000);
  };
  const { user } = useAuth();

  const toggleAddAlert = () => {
    setAddAlert(true);
    setTimeout(() => {
      setAddAlert(false);
    }, 2000);
  };

  const toggleWaitlistAlert = () => {
    setWaitlistAlert(true);
    setTimeout(() => {
      setWaitlistAlert(false);
    }, 2000);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const { mutate } = useChangeStatusMutation();
  const handleChangeStatus = async (status) => {
    if (status === "rejected") {
      toggleRemoveAlert();
    }
    if (status === "shortlist") {
      toggleAddAlert();
    }
    if (status === "waitlist") {
      toggleWaitlistAlert();
    }
    setTimeout(() => {
      mutate({ processId: process._id, newStatus: status, user });
    }, 2000);
  };

  return (
    <div
      className="bg-base-200 border rounded-md my-4 p-4"
      style={{ backgroundColor: "#F9F9F9" }}
    >
      <div className="text-xl font-medium flex flex-wrap items-center justify-between">
        <div>
          <div
            className="flex items-center"
            style={{ fontSize: "20px", fontWeight: "bold", color: "#7F00FF" }}
          >
            <input
              type="checkbox"
              className="checkbox mr-4 p-0 checkbox-xs rounded-sm checkbox-primary"
            />
            <div className="grid justify-items-center">
              <div
                className="radial-progress text-violet-700 border-4"
                style={{
                  "--value": process.scores.overallScore,
                  backgroundColor: "#F0E1FF",
                  borderColor: "#F0E1FF",
                }}
                role="progressbar"
              >
                <div
                  className="card border-4 border-white rounded-full p-7"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage:
                      "url('https://p7.hiclipart.com/preview/799/987/640/5bbdfaffaa69f.jpg')",
                  }}
                ></div>
              </div>

              <div>{process.scores.overallScore}%</div>
            </div>
            <div className="mx-4">
              <div>{process?.candidateId?.name}</div>
              <div
                className=""
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                B.E. Computer Engineering
              </div>
              <div
                className=""
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                {process.candidateId?.yearsOfExperience} Years of Experience
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "white",
                }}
              >
                <button
                  className="card border px-4 my-2"
                  style={{ backgroundColor: "#4182F9" }}
                >
                  <div className="flex items-center">
                    <svg
                      className="mr-2"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 7.90002C10.5 9.28074 9.38071 10.4 8 10.4C6.61929 10.4 5.5 9.28074 5.5 7.90002C5.5 6.51931 6.61929 5.40002 8 5.40002C9.38071 5.40002 10.5 6.51931 10.5 7.90002Z"
                        fill="white"
                      />
                      <path
                        d="M0 7.90002C0 7.90002 3 2.40002 8 2.40002C13 2.40002 16 7.90002 16 7.90002C16 7.90002 13 13.4 8 13.4C3 13.4 0 7.90002 0 7.90002ZM8 11.4C9.933 11.4 11.5 9.83302 11.5 7.90002C11.5 5.96703 9.933 4.40002 8 4.40002C6.067 4.40002 4.5 5.96703 4.5 7.90002C4.5 9.83302 6.067 11.4 8 11.4Z"
                        fill="white"
                      />
                    </svg>
                    <div>Resume</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Radial Scores  */}

        <div className="flex flex-wrap gap-8">
          <div className="grid justify-items-center">
            <div
              className="font-bold mb-2"
              style={{ fontSize: "12px", color: "#7F00FF" }}
            >
              Experience
            </div>
            <div>
              <div
                className="radial-progress bg-primary text-violet-700 border-4 font-bold"
                style={{
                  "--value": process.scores.experience * 10,
                  backgroundColor: "#F0E1FF",
                  borderColor: "#F0E1FF",
                  fontSize: "17px",
                }}
                role="progressbar"
              >
                {process.scores.experience * 10}%
              </div>
            </div>
          </div>

          <div className="grid justify-items-center">
            <div
              className="font-bold mb-2"
              style={{ fontSize: "12px", color: "#7F00FF" }}
            >
              Education
            </div>
            <div>
              <div
                className="radial-progress bg-primary text-violet-700 border-4 font-bold"
                style={{
                  "--value": process.scores.education * 10,
                  backgroundColor: "#F0E1FF",
                  borderColor: "#F0E1FF",
                  fontSize: "17px",
                }}
                role="progressbar"
              >
                {process.scores.education * 10}%
              </div>
            </div>
          </div>

          <div className="grid justify-items-center">
            <div
              className="font-bold mb-2"
              style={{ fontSize: "12px", color: "#7F00FF" }}
            >
              Skills
            </div>
            <div>
              <div
                className="radial-progress bg-primary text-violet-700 border-4 font-bold"
                style={{
                  "--value": process.scores.skills * 10,
                  backgroundColor: "#F0E1FF",
                  borderColor: "#F0E1FF",
                  fontSize: "17px",
                }}
                role="progressbar"
              >
                {process.scores.skills * 10}%
              </div>
            </div>
          </div>

          <div className="grid justify-items-center">
            <div
              className="font-bold mb-2"
              style={{ fontSize: "12px", color: "#7F00FF" }}
            >
              Filtering Questions
            </div>
            <div>
              <div
                className="radial-progress bg-primary text-violet-700 border-4 font-bold"
                style={{
                  "--value": process.scores.filteringQuestions * 10,
                  backgroundColor: "#F0E1FF",
                  borderColor: "#F0E1FF",
                  fontSize: "17px",
                }}
                role="progressbar"
              >
                {process.scores.filteringQuestions * 10}%
              </div>
            </div>
          </div>
        </div>

        {/* Actions  */}

        <div
          className="actions flex gap-8 items-center justify-between my-4"
          style={{ fontSize: "10px", fontWeight: "bold" }}
        >
          <div>
            <div
              className="card rounded-3xl px-4 mx-3 cursor-pointer border bg-green-300 hover:bg-green-200 hover:border-green-400"
              onClick={() => handleChangeStatus("shortlist")}
            >
              <div className="flex items-center">
                <svg
                  width="13"
                  height="10"
                  viewBox="0 0 13 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6539 0.366117C12.1923 -0.122039 11.444 -0.122039 10.9825 0.366117L4.72727 6.98223L2.01749 4.11612C1.55596 3.62796 0.807675 3.62796 0.346147 4.11612C-0.115382 4.60427 -0.115382 5.39573 0.346147 5.88388L3.8916 9.63388C4.11323 9.86831 4.41384 10 4.72727 10C5.04071 10 5.34131 9.86831 5.56294 9.63388L12.6539 2.13388C13.1154 1.64573 13.1154 0.854272 12.6539 0.366117Z"
                    fill="black"
                  />
                </svg>

                <div className="mx-2">Shortlist</div>
              </div>
            </div>

            <div
              className="card rounded-3xl px-4 my-3 mx-3 border bg-red-300 hover:bg-red-200 hover:border-red-400 cursor-pointer"
              onClick={() => handleChangeStatus("rejected")}
            >
              <div className="flex items-center justify-around">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.366117 0.366117C0.854272 -0.122039 1.64573 -0.122039 2.13388 0.366117L5 3.23223L7.86612 0.366117C8.35427 -0.122039 9.14573 -0.122039 9.63388 0.366117C10.122 0.854272 10.122 1.64573 9.63388 2.13388L6.76777 5L9.63388 7.86612C10.122 8.35427 10.122 9.14573 9.63388 9.63388C9.14573 10.122 8.35427 10.122 7.86612 9.63388L5 6.76777L2.13388 9.63388C1.64573 10.122 0.854272 10.122 0.366117 9.63388C-0.122039 9.14573 -0.122039 8.35427 0.366117 7.86612L3.23223 5L0.366117 2.13388C-0.122039 1.64573 -0.122039 0.854272 0.366117 0.366117Z"
                    fill="black"
                  />
                </svg>

                <div className="mx-2">Reject</div>
              </div>
            </div>

            <div
              className="card rounded-3xl px-4 mx-3 border bg-yellow-300 hover:bg-yellow-200 hover:border-yellow-400 cursor-pointer"
              onClick={() => handleChangeStatus("waitlist")}
            >
              <div className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8 3.5C8 3.22386 7.77614 3 7.5 3C7.22386 3 7 3.22386 7 3.5V9C7 9.17943 7.09614 9.3451 7.25193 9.43412L10.7519 11.4341C10.9917 11.5711 11.2971 11.4878 11.4341 11.2481C11.5711 11.0083 11.4878 10.7029 11.2481 10.5659L8 8.70984V3.5Z"
                    fill="black"
                  />
                </svg>

                <div className="mx-2">Waitlist</div>
              </div>
            </div>
          </div>
          <svg
            className="mr-6"
            onClick={toggleAccordion}
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.843 2.78349C20.0858 3.2646 20.0446 3.84372 19.7361 4.28401L12.6528 14.3951C12.3869 14.7747 11.9575 15 11.5 15C11.0425 15 10.6131 14.7747 10.3472 14.3951L3.26388 4.28401C2.95544 3.84372 2.91419 3.2646 3.15702 2.78349C3.39984 2.30239 3.88601 2 4.41667 2L18.5833 2C19.114 2 19.6002 2.30239 19.843 2.78349Z"
              fill="#F0E1FF"
              stroke="#7F00FF"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4" style={{ fontSize: "13px" }}>
          <div>
            <p className="font-bold">Key Skills:</p>
            <p>{process.candidateId.coreTech.map((skill) => skill + ", ")}</p>
          </div>
          <div className="my-2">
            <p className="font-bold">AI Explaination:</p>
            <p>
              Rishabh was selected due to 5 years of experience in Python and a
              Bachelor’s degree in Computer Science.
            </p>
          </div>

          <div
            className="card rounded-3xl border px-4 w-fit"
            style={{
              backgroundColor: "#F0E1FF",
              color: "#7F00FF",
              borderColor: "#7F00FF",
            }}
          >
            <div className="m-1" style={{ color: "F9F9F9" }}>
              View Detail Breakdown
            </div>
          </div>
        </div>
      )}

      <div className="toast toast-start m-8" style={{ zIndex: 1000 }}>
        {/* Toasts */}

        {removeAlert && (
          <div className="alert alert-info border-4 bg-red-300 border-red-500">
            <svg
              width="25"
              height="25"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 1C1.94772 1 1.5 1.44772 1.5 2V3C1.5 3.55228 1.94772 4 2.5 4H3V13C3 14.1046 3.89543 15 5 15H11C12.1046 15 13 14.1046 13 13V4H13.5C14.0523 4 14.5 3.55228 14.5 3V2C14.5 1.44772 14.0523 1 13.5 1H10C10 0.447715 9.55229 0 9 0H7C6.44772 0 6 0.447715 6 1H2.5ZM5.5 5C5.77614 5 6 5.22386 6 5.5V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5L5 5.5C5 5.22386 5.22386 5 5.5 5ZM8 5C8.27614 5 8.5 5.22386 8.5 5.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V5.5C7.5 5.22386 7.72386 5 8 5ZM11 5.5V12.5C11 12.7761 10.7761 13 10.5 13C10.2239 13 10 12.7761 10 12.5V5.5C10 5.22386 10.2239 5 10.5 5C10.7761 5 11 5.22386 11 5.5Z"
                fill="black"
              />
            </svg>

            <span>{process?.candidateId?.name} Removed</span>
          </div>
        )}

        {addAlert && (
          <div className="alert alert-info border-4 bg-green-300 border-green-500">
            <svg
              width="25"
              height="25"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 16C14.433 16 16 14.433 16 12.5C16 10.567 14.433 9 12.5 9C10.567 9 9 10.567 9 12.5C9 14.433 10.567 16 12.5 16ZM13 11V12H14C14.2761 12 14.5 12.2239 14.5 12.5C14.5 12.7761 14.2761 13 14 13H13V14C13 14.2761 12.7761 14.5 12.5 14.5C12.2239 14.5 12 14.2761 12 14V13H11C10.7239 13 10.5 12.7761 10.5 12.5C10.5 12.2239 10.7239 12 11 12H12V11C12 10.7239 12.2239 10.5 12.5 10.5C12.7761 10.5 13 10.7239 13 11Z"
                fill="black"
              />
              <path
                d="M11 5C11 6.65685 9.65685 8 8 8C6.34315 8 5 6.65685 5 5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5Z"
                fill="black"
              />
              <path
                d="M2 13C2 14 3 14 3 14H8.25606C8.09023 13.5308 8 13.026 8 12.5C8 11.1463 8.5977 9.93228 9.54358 9.10733C9.07708 9.03817 8.56399 9 8 9C3 9 2 12 2 13Z"
                fill="black"
              />
            </svg>

            <span>{process?.candidateId?.name} Shortlisted</span>
          </div>
        )}

        {waitlistAlert && (
          <div className="alert alert-info border-4 bg-yellow-300 border-yellow-500">
            <svg
              width="25"
              height="25"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8 3.5C8 3.22386 7.77614 3 7.5 3C7.22386 3 7 3.22386 7 3.5V9C7 9.17943 7.09614 9.3451 7.25193 9.43412L10.7519 11.4341C10.9917 11.5711 11.2971 11.4878 11.4341 11.2481C11.5711 11.0083 11.4878 10.7029 11.2481 10.5659L8 8.70984V3.5Z"
                fill="black"
              />
            </svg>

            <span>{process?.candidateId?.name} Waitlisted</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateMatchesCard;
