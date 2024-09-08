import React, { useEffect, useState } from "react";
import { useChangeRoundMutation } from "../../../../queries/process";
import { useAuth } from "../../../../auth/authContext";
import { useGenerateEmail } from "../../../../queries/job";
import axiosnew from "../../../../axios";

const CandidateShortlistCard = ({ process, round }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMailing, setIsMailing] = useState(false);

  // Generate Internview Email form Data 
  const [emailFormData, setEmailFormData] = useState({
    candidateEmail: '',
    interviewDate: '',
    interviewTime: '',
    hrEmail: '',
    hiringManagerEmail: ''
  });

  const handleEmailFormChange = (event) => {
    const { name, value } = event.target;
    setEmailFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  console.log(emailFormData);

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isgeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [feedback, setFeedBack] = useState({
    feedbackTech: "",
    feedbackOther: "",
    feedbackFinal: "",
  });

  useEffect(() => {
    if (process && process.rounds.length > round - 1)
      setFeedBack({
        feedbackTech: process.rounds[round - 1]?.feedbackTech,
        feedbackOther: process.rounds[round - 1]?.feedbackOther,
        feedbackFinal: process.rounds[round - 1]?.feedbackFinal,
      });
  }, [process, round]);

  process.candidateId.name == "Rishabh Sinha" &&
    console.log(process.rounds, feedback);

  const [removeAlert, setRemoveAlert] = useState(false);
  const [addAlert, setAddAlert] = useState(false);
  const [mailAlert, setMailAlert] = useState(false);
  const { user } = useAuth();
  const toggleRemoveAlert = () => {
    setRemoveAlert(true);
    setTimeout(() => {
      setRemoveAlert(false);
    }, 4000);
  };

  const toggleAddAlert = () => {
    setAddAlert(true);
    setTimeout(() => {
      setAddAlert(false);
    }, 4000);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedBack((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const { mutate } = useChangeRoundMutation();
  const { mutate: generateEmailMutate } = useGenerateEmail({
    setGeneratedEmail,
    setIsGeneratingEmail,
  });

  const handleRoundAction = async (action) => {
    if (action) {
      toggleAddAlert();
    } else {
      toggleRemoveAlert();
    }
    const roundDetails = {
      ...feedback,
      nextRoundRecommend: action ? "Yes" : "No",
    };
    mutate({ processId: process._id, roundDetails, roundNumber: round, user });
  };

  const handleGenerateEmail = async () => {
    setIsGeneratingEmail(true);
    generateEmailMutate({
      formData: {
        candidateInfo: {
          name: process?.candidateId?.name,
          email: process?.candidateId?.email,
        },
        meetingInfo: {
          date: emailFormData.interviewDate,
          time: emailFormData.interviewTime,
          timezone: "GMT+5:30",
          meetingLink: "https://meet.google.com/gmr-owfu-pmw",
          role: process?.jobId?.title,
          company: user.company,
        },
      },
      user,
    });


  };


  // for sending email 
  const handleaddCandidate = async (e) => {
    document.getElementById(`interview_shedule_modal-${process.candidateId._id}`).close();
    e.preventDefault();
    setIsMailing(true);
    console.log("Sending Email .....");
    console.log(process);
    try {
      const response = await axiosnew.post(`/process/send-mail`,
        {
          email: process.candidateId.email,
          emailBody: generatedEmail,
        }
        , {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${user.token}`
          },
        });
      if (response.status === 200) {
        console.log("Email Sent Successfully");
        setMailAlert(true);
        setTimeout(() => {
          setMailAlert(false);
        }, 4000);
      }
    } catch (error) {
      console.error("Error during sending email.");
    }
    setIsMailing(false);
  };


  const handleWhatsappMessage = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "mobile_number": "8806608430",
      "body": generatedEmail,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/send_notification", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div
      className={`border rounded-md my-4 p-4 ${round < 4 &&
        (process.rounds.length == round - 1
          ? "border-2 bg-gray-100"
          : process.rounds[round - 1]?.nextRoundRecommend == "Yes"
            ? "border-2 border-green-400 bg-green-200"
            : "border-2 border-red-400 bg-red-200")
        }`}
    >
      <div className="text-xl font-medium flex flex-wrap items-center justify-between">
        <div>
          <div
            className="flex items-center"
            style={{ fontSize: "20px", fontWeight: "bold", color: "#7F00FF" }}
          >
            {round < 4 &&
              (process.rounds.length == round - 1 ? null : process.rounds[
                round - 1
              ]?.nexeoundRecommend == "Yes" ? (
                <div>{/* shortlisted */}</div>
              ) : (
                <div>{/* rejected */}</div>
              ))}

            {round != 4 && (
              <input
                type="checkbox"
                className="checkbox mr-4 p-0 checkbox-xs rounded-sm checkbox-primary"
              />
            )}
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
          className="actions flex gap-8 items-center justify-between"
          style={{ fontSize: "13px", fontWeight: "bold" }}
        >
          <div>
            {round - 1 == process.rounds.length && round !== 4 && (
              <div
                className={`card rounded-3xl px-4 cursor-pointer mx-3 ${round == 4 && "cursor-not-allowed bg-[#FFE456]/50"
                  }`}
                style={{ backgroundColor: "#8EE4FF" }}
                onClick={() =>
                  document.getElementById(`interview_shedule_modal-${process.candidateId._id}`).showModal()
                }
              >
                <div className="flex items-center justify-between">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 0C3.77614 0 4 0.223858 4 0.5V1H12V0.5C12 0.223858 12.2239 0 12.5 0C12.7761 0 13 0.223858 13 0.5V1H14C15.1046 1 16 1.89543 16 3V4V5V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V5H16V4H0V3C0 1.89543 0.895431 1 2 1H3V0.5C3 0.223858 3.22386 0 3.5 0Z"
                      fill="black"
                    />
                  </svg>

                  <div className="mx-2">


                    Shedule Interview


                  </div>
                  <div></div>
                </div>
              </div>
            )}

            {round !== 4 ? (
              <div
                className={`card cursor-pointer rounded-3xl px-4 w-48 m-3 ${round == 4 && "cursor-not-allowed bg-[black]/50"
                  }`}
                style={{ backgroundColor: "#FFE456" }}
                onClick={() =>
                  round != 4 &&
                  document
                    .getElementById(`feedback_modal-${process.candidateId._id}`)
                    .showModal()
                }
              >
                <div className="flex items-center justify-between">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5016 1.93934C15.6969 2.1346 15.6969 2.45118 15.5016 2.64645L14.4587 3.68933L12.4587 1.68933L13.5016 0.646447C13.6969 0.451184 14.0134 0.451185 14.2087 0.646447L15.5016 1.93934Z"
                      fill="black"
                    />
                    <path
                      d="M13.7516 4.39644L11.7516 2.39644L4.93861 9.20943C4.88372 9.26432 4.84237 9.33123 4.81782 9.40487L4.01326 11.8186C3.94812 12.014 4.13405 12.1999 4.32949 12.1348L6.74317 11.3302C6.81681 11.3057 6.88372 11.2643 6.93861 11.2094L13.7516 4.39644Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1 13.5C1 14.3284 1.67157 15 2.5 15H13.5C14.3284 15 15 14.3284 15 13.5V7.5C15 7.22386 14.7761 7 14.5 7C14.2239 7 14 7.22386 14 7.5V13.5C14 13.7761 13.7761 14 13.5 14H2.5C2.22386 14 2 13.7761 2 13.5V2.5C2 2.22386 2.22386 2 2.5 2H9C9.27614 2 9.5 1.77614 9.5 1.5C9.5 1.22386 9.27614 1 9 1H2.5C1.67157 1 1 1.67157 1 2.5V13.5Z"
                      fill="black"
                    />
                  </svg>

                  <div className="mx-2">Feedback</div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={`card rounded-lg px-4 w-48 m-3 content-center border-2 border-green-600 border-dotted bg-green-100`}
                >
                  <div className="flex items-center my-4 justify-around text-base text-green-600">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0674 0.870798C8.93365 -0.290266 7.06635 -0.290266 5.93262 0.870798L5.31077 1.50763L4.42075 1.49703C2.79809 1.47771 1.47771 2.79809 1.49703 4.42075L1.50763 5.31077L0.870798 5.93262C-0.290266 7.06635 -0.290266 8.93365 0.870798 10.0674L1.50763 10.6892L1.49703 11.5792C1.47771 13.2019 2.79809 14.5223 4.42075 14.503L5.31077 14.4924L5.93262 15.1292C7.06635 16.2903 8.93365 16.2903 10.0674 15.1292L10.6892 14.4924L11.5792 14.503C13.2019 14.5223 14.5223 13.2019 14.503 11.5792L14.4924 10.6892L15.1292 10.0674C16.2903 8.93365 16.2903 7.06635 15.1292 5.93262L14.4924 5.31077L14.503 4.42075C14.5223 2.79809 13.2019 1.47771 11.5792 1.49703L10.6892 1.50763L10.0674 0.870798ZM10.3536 6.85355L7.35355 9.85355C7.25979 9.94732 7.13261 10 7 10C6.86739 10 6.74021 9.94732 6.64645 9.85355L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645C5.34171 7.45118 5.65829 7.45118 5.85355 7.64645L7 8.79289L9.64645 6.14645C9.84171 5.95118 10.1583 5.95118 10.3536 6.14645C10.5488 6.34171 10.5488 6.65829 10.3536 6.85355Z"
                        fill="#06C640"
                      />
                    </svg>

                    <div className="mx-2">Selected</div>
                    <div></div>
                  </div>
                </div>
              </div>
            )}
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
            <p>React.js, Next.js, Node.js, TailwindCSS, MySQL, MongoDB</p>
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

      {/* Modals  */}

      {/* Interview Shedule Modal  */}

      {round != 4 && (
        <dialog id={`interview_shedule_modal-${process.candidateId._id}`} className="modal" style={{ zIndex: 100 }}>
          <div className="modal-box w-11/12 max-w-7xl">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            {/* modal header  */}
            <div className="font-bold mb-4" style={{ fontSize: "25px" }}>
              Schedule Interview : {process.candidateId.name}
            </div>

            {/* modal body  */}
            <div>
              <div className="flex flex-wrap gap-4">
                <label className="form-control" style={{ fontSize: "15px", width: "600px" }}>
                  <div className="label">
                    <span className="label-text">Candidate Email Address</span>
                  </div>
                  <input
                    type="email"
                    name="candidateEmail"
                    value={process.candidateId.email}
                    onChange={handleEmailFormChange}
                    className="input rounded-md"
                    style={{ backgroundColor: "#F9F9F9" }}
                    disabled
                  />
                </label>

                <label className="form-control" style={{ fontSize: "15px", width: "600px" }}>
                  <div className="label">
                    <span className="label-text">Interview Date</span>
                  </div>
                  <input
                    type="date"
                    name="interviewDate"
                    value={emailFormData.interviewDate}
                    onChange={handleEmailFormChange}
                    className="input rounded-md"
                    style={{ backgroundColor: "#F9F9F9" }}
                  />
                </label>

                <label className="form-control" style={{ fontSize: "15px", width: "600px" }}>
                  <div className="label">
                    <span className="label-text">Time</span>
                  </div>
                  <input
                    type="time"
                    name="interviewTime"
                    value={emailFormData.interviewTime}
                    onChange={handleEmailFormChange}
                    className="input rounded-md"
                    style={{ backgroundColor: "#F9F9F9" }}
                  />
                </label>

                <label className="form-control" style={{ fontSize: "15px", width: "600px" }}>
                  <div className="label">
                    <span className="label-text">HR Email Address</span>
                  </div>
                  <input
                    type="email"
                    name="hrEmail"
                    value={emailFormData.hrEmail}
                    onChange={handleEmailFormChange}
                    className="input rounded-md"
                    style={{ backgroundColor: "#F9F9F9" }}
                  />
                </label>

                <label className="form-control" style={{ fontSize: "15px", width: "600px" }}>
                  <div className="label">
                    <span className="label-text">Hiring Manager Email Address</span>
                  </div>
                  <input
                    type="email"
                    name="hiringManagerEmail"
                    value={emailFormData.hiringManagerEmail}
                    onChange={handleEmailFormChange}
                    className="input rounded-md"
                    style={{ backgroundColor: "#F9F9F9" }}
                  />
                </label>
              </div>

              {generatedEmail && !isgeneratingEmail && (
                <div className="my-8">
                  <div className="font-bold" style={{ fontSize: "25px" }}>
                    Generated Email :
                  </div>

                  <div className="my-1" style={{ fontSize: "15px" }}>
                    <div className="card border p-4">
                      <div
                        dangerouslySetInnerHTML={{ __html: generatedEmail }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="generate-button flex gap-3 justify-between items-center my-4">
                {/* Generating Email Loading  */}
                <div>
                  {isgeneratingEmail && (
                    <div className="mx-4">
                      <div className="flex gap-4" style={{ fontSize: "15px" }}>
                        <span className="loading loading-bars loading-md"></span>
                        <div>Generating Email...</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <div
                    className="generate cursor-pointer card border py-3 px-3 bg-white items-center self-center rounded-md font-bold"
                    style={{ backgroundColor: "#CFA0FF" }}
                    onClick={handleGenerateEmail}
                  >
                    Generate Email
                  </div>

                  <form method="dialog">

                    <button
                      className="generate cursor-pointer card border py-3 px-3 bg-white items-center self-center rounded-md font-bold"
                      style={{ backgroundColor: "#8EE4FF" }}
                      // onClick={handleaddCandidate}
                      onClick={handleWhatsappMessage}
                    >

                      {isMailing ?

                        <span className="loading mx-14 loading-bars loading-md"></span>
                        :
                        <div>

                          Shedule Interview
                        </div>

                      }


                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* Feedback Modal  */}

      <dialog
        id={`feedback_modal-${process.candidateId._id}`}
        className="modal"
      >
        <div className="modal-box w-11/12 max-w-2xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* modal header  */}
          <div className="font-bold mb-4" style={{ fontSize: "25px" }}>
            Feedback: {process.candidateId.name}
          </div>

          {/* modal body  */}
          <div>
            <div className="">
              <label className="form-control" style={{ fontSize: "15px" }}>
                <div className="label">
                  <span className="label-text">Technical Feedback</span>
                </div>
                <textarea
                  className="textarea bg-gray-100"
                  placeholder="Bio"
                  name="feedbackTech"
                  onChange={handleChange}
                  value={feedback.feedbackTech}
                ></textarea>
              </label>

              <label className="form-control" style={{ fontSize: "15px" }}>
                <div className="label">
                  <span className="label-text">Communication Feedback</span>
                </div>
                <textarea
                  className="textarea bg-gray-100"
                  placeholder="Bio"
                  name="feedbackOther"
                  onChange={handleChange}
                  value={feedback.feedbackOther}
                ></textarea>
              </label>

              <label className="form-control" style={{ fontSize: "15px" }}>
                <div className="label">
                  <span className="label-text">Overall Review</span>
                </div>
                <textarea
                  className="textarea bg-gray-100"
                  placeholder="Bio"
                  name="feedbackFinal"
                  onChange={handleChange}
                  value={feedback.feedbackFinal}
                ></textarea>
              </label>
            </div>
            {/* Generating Email Loading  */}
            {isgeneratingEmail && (
              <div className="my-8">
                <div className="flex gap-4" style={{ fontSize: "15px" }}>
                  <span className="loading loading-bars loading-md"></span>
                  <div>Generating Email...</div>
                </div>
              </div>
            )}

            {round != 4 && round - 1 == process.rounds.length && (
              <div className="generate-button flex gap-3 justify-end mt-8">
                <div
                  className="generate cursor-pointer card border py-3 px-3 bg-white rounded-md font-bold"
                  style={{ backgroundColor: "#CFA0FF" }}
                >
                  <div className="flex gap-3 items-center">
                    <svg
                      className="mt-1"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 0C8.21698 0 6.6397 0.70057 5.5072 1.67727C4.54981 2.50296 3.85599 3.57713 3.67778 4.65625C1.58233 5.1189 0 6.94389 0 9.14773C0 11.7075 2.13442 13.75 4.72656 13.75H9.375V7.13388L6.69194 9.81694C6.44786 10.061 6.05214 10.061 5.80806 9.81694C5.56398 9.57286 5.56398 9.17714 5.80806 8.93306L9.55806 5.18306C9.80214 4.93898 10.1979 4.93898 10.4419 5.18306L14.1919 8.93306C14.436 9.17714 14.436 9.57286 14.1919 9.81694C13.9479 10.061 13.5521 10.061 13.3081 9.81694L10.625 7.13388V13.75H15.8594C18.1279 13.75 20 11.9619 20 9.71591C20 7.6707 18.4476 6.00513 16.4571 5.72373C16.1541 2.4993 13.3628 0 10 0Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.375 18.125V13.75H10.625V18.125C10.625 18.4702 10.3452 18.75 10 18.75C9.65482 18.75 9.375 18.4702 9.375 18.125Z"
                        fill="black"
                      />
                    </svg>

                    <div>Upload Transcript</div>
                  </div>
                </div>

                <form method="dialog">
                  <div
                    className="generate cursor-pointer card border py-3 px-3 bg-white rounded-md font-bold"
                    style={{ backgroundColor: "#FF9B9B" }}
                    onClick={() => handleRoundAction(false)}
                  >
                    <button className="flex gap-3 items-center">
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

                      <div>Reject</div>
                    </button>
                  </div>
                </form>
                <form method="dialog">
                  <div
                    className="generate cursor-pointer card border py-3 px-3 bg-white rounded-md font-bold"
                    style={{ backgroundColor: "#8EFF92" }}
                    onClick={() => handleRoundAction(true)}
                  >
                    <button className="flex gap-3 items-center">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 13 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.6539 0.366117C12.1923 -0.122039 11.444 -0.122039 10.9825 0.366117L4.72727 6.98223L2.01749 4.11612C1.55596 3.62796 0.807675 3.62796 0.346147 4.11612C-0.115382 4.60427 -0.115382 5.39573 0.346147 5.88388L3.8916 9.63388C4.11323 9.8683 4.41383 10 4.72727 10C5.04071 10 5.34131 9.8683 5.56294 9.63388L12.6539 2.13388C13.1154 1.64573 13.1154 0.854272 12.6539 0.366117Z"
                          fill="black"
                        />
                      </svg>

                      <div>{round != 3 ? "Next Round" : "Select"}</div>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </dialog>

      {/* Modal Ends  */}

      <div className="toast toast-start m-8" style={{ zIndex: 1000 }}>
        {/* Alert Toasts */}

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

            <span>{process?.candidateId?.name} Rejected</span>
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


        {/* mailing email  */}
        {mailAlert && (
          <div className="alert alert-info border-4 bg-green-300 border-green-500" style={{ zIndex: 1000 }}>
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

            <span>Interview Email sent to {process?.candidateId?.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateShortlistCard;
