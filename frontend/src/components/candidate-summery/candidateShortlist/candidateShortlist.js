import React, { useEffect, useState } from "react";
import CandidateShortlistCard from "./components/candidateShortlistCard";
import { useGenerateQuestions } from "../../../queries/job";
import { useAuth } from "../../../auth/authContext";

const CandidateShortlist = ({ processes, processLoading, processError }) => {
  const [interviewALertWaring, setInterviewAlertWarning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [selectCandidate, setSelectCandidate] = useState([]);
  const [currentRoundProcess, setCurrentRoundProcess] = useState(
    processes
      ? processes.filter((p) => p.rounds.length >= currentRound - 1)
      : []
  );
  const { user } = useAuth();
  // QnA modal inputs starts

  const [QnAFormData, setQnAFormData] = useState("");

  const handleQnAFormChange = (event) => {
    const {value } = event.target;
    setQnAFormData(value);
  };
  console.log("QnAFormData");
  console.log(QnAFormData);

  const [isGeneratingQnA, setIsGeneratingQnA] = useState(false);
  const [generatedQnA, setGeneratedQnA] = useState("");

  //   const handleGenerateQnA = () => {
  //     setIsGeneratingQnA(true);
  //     const generatedQnA = `
  //     <div className="font-bold" style={{ fontSize: "25px" }}>
  //     AI Generated Questions and Answer
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>

  //   <div className="my-4" style={{ fontSize: "15px" }}>
  //     <div className="mt-2">
  //       <p className="font-bold">
  //         1. Explain the concept of microservices architecture and
  //         how it differs from monolithic architecture.
  //       </p>
  //       <p className="">
  //         <span className="font-bold">Answer:&nbsp;</span>
  //         Microservices architecture is a design approach where a
  //         software application is composed of small, independent
  //         services that communicate over a network. Each service is
  //         focused on a specific functionality and can be developed,
  //         deployed, and scaled independently. In contrast,
  //         monolithic architecture is a single unified codebase where
  //         all components are tightly coupled. Microservices offer
  //         better scalability, flexibility, and fault tolerance,
  //         whereas monolithic systems can be simpler but less agile.
  //       </p>
  //     </div>
  //   </div>
  // `;
  //     setTimeout(() => {
  //       setIsGeneratingQnA(false);
  //       setGeneratedQnA(generatedQnA);
  //     }, 4000);
  //   };

  const { mutate: generateQnAMutate } = useGenerateQuestions({
    setGeneratedQnA,
    setIsGeneratingQnA,
  });
  console.log("generatedQnA", generatedQnA);
  const handleGenerateQnA = async () => {
    setIsGeneratingQnA(true);
    generateQnAMutate({
      prompt: QnAFormData,
      user,
    });
  };


  // QnA modal inputs ends

  const [round1Count, setRound1Count] = useState(0);
  const [round2Count, setRound2Count] = useState(0);
  const [round3Count, setRound3Count] = useState(0);
  const [selectedCount, setSelctedCount] = useState(0);

  useEffect(() => {
    if (processes) {
      setRound1Count(processes.filter((p) => p.rounds.length >= 0).length);
      setRound2Count(
        processes.filter(
          (p) =>
            p.rounds.length >= 1 && p.rounds[0]?.nextRoundRecommend === "Yes"
        ).length
      );
      setRound3Count(
        processes.filter(
          (p) =>
            p.rounds.length >= 2 && p.rounds[1]?.nextRoundRecommend === "Yes"
        ).length
      );
      setSelctedCount(
        processes.filter(
          (p) =>
            p.rounds.length >= 3 && p.rounds[2]?.nextRoundRecommend === "Yes"
        ).length
      );
    }
  }, [processes]);

  const HandleSelectInterview = () => {
    if (selectCandidate.length === 0) {
      setInterviewAlertWarning(true);
      setTimeout(() => {
        setInterviewAlertWarning(false);
      }, 3000);
    }
  };

  console.log(currentRound)


  useEffect(() => {
    if (processes) {
      updateCurrentRoundProcesses(currentRound);
    }
  }, [processes, currentRound]);

  const updateCurrentRoundProcesses = (round) => {
    let filteredProcesses = [];
    if (round === 1) {
      filteredProcesses = processes.filter((p) => p.rounds.length >= 0);
    } else if (round === 2) {
      filteredProcesses = processes.filter(
        (p) => p.rounds.length >= 1 && p.rounds[0]?.nextRoundRecommend === "Yes"
      );
    } else if (round === 3) {
      filteredProcesses = processes.filter(
        (p) => p.rounds.length >= 2 && p.rounds[1]?.nextRoundRecommend === "Yes"
      );
    } else {
      filteredProcesses = processes.filter(
        (p) => p.rounds.length >= 3 && p.rounds[2]?.nextRoundRecommend === "Yes"
      );
    }

    setCurrentRoundProcess(filteredProcesses);
  };
  const [generateQuestions, setGenerateQuestions] = useState(0);
  return (
    <div>
      {/* Rounds navbar */}

      <div
        className="flex items-center mt-4"
        style={{ fontSize: "17px", fontWeight: "bold" }}
      >
        <div
          className="grid content-between card cursor-pointer border rounded-none rounded-l-md"
          style={
            currentRound === 1
              ? { backgroundColor: "white" }
              : { backgroundColor: "#F9F9F9" }
          }
          onClick={() => {
            setCurrentRound(1);
          }}
        >
          <div className="">
            <div className="flex mx-4 my-1">
              <div className="py-0 my-0" style={{ lineHeight: "1" }}>
                Round 1
              </div>

              <div
                className="py-0 mx-1 my-0"
                style={{ lineHeight: "1", color: "#4182F9" }}
              >
                ({round1Count})
              </div>
            </div>
          </div>
          {currentRound === 1 && (
            <div
              className="focus h-0.5"
              style={{ backgroundColor: "#4182F9" }}
            ></div>
          )}
        </div>
        <div
          className="grid content-between card cursor-pointer border rounded-none"
          style={
            currentRound === 2
              ? { backgroundColor: "white" }
              : { backgroundColor: "#F9F9F9" }
          }
          onClick={() => {
            setCurrentRound(2);
          }}
        >
          <div className="">
            <div className="flex mx-4 my-1">
              <div className="py-0 my-0" style={{ lineHeight: "1" }}>
                Round 2
              </div>

              <div
                className="py-0 mx-1 my-0"
                style={{ lineHeight: "1", color: "#4182F9" }}
              >
                ({round2Count})
              </div>
            </div>
          </div>
          {currentRound === 2 && (
            <div
              className="focus h-0.5"
              style={{ backgroundColor: "#4182F9" }}
            ></div>
          )}
        </div>
        <div
          className="grid content-between card cursor-pointer border rounded-none rounded-r-md"
          style={
            currentRound === 3
              ? { backgroundColor: "white" }
              : { backgroundColor: "#F9F9F9" }
          }
          onClick={() => {
            setCurrentRound(3);
          }}
        >
          <div className="">
            <div className="flex mx-4 my-1">
              <div className="py-0 my-0" style={{ lineHeight: "1" }}>
                Round 3
              </div>

              <div
                className="py-0 mx-1 my-0"
                style={{ lineHeight: "1", color: "#4182F9" }}
              >
                ({round3Count})
              </div>
            </div>
          </div>
          {currentRound === 3 && (
            <div
              className="focus h-0.5"
              style={{ backgroundColor: "#4182F9" }}
            ></div>
          )}
        </div><div
          className="grid content-between card cursor-pointer border rounded-none rounded-r-md"
          style={
            currentRound === 4
              ? { backgroundColor: "white" }
              : { backgroundColor: "#F9F9F9" }
          }
          onClick={() => {
            setCurrentRound(4);
          }}
        >
          <div className="">
            <div className="flex mx-4 my-1">
              <div className="py-0 my-0" style={{ lineHeight: "1" }}>
                Selected
              </div>

              <div
                className="py-0 mx-1 my-0"
                style={{ lineHeight: "1", color: "#4182F9" }}
              >
                ({selectedCount})
              </div>
            </div>
          </div>
          {currentRound === 4 && (
            <div
              className="focus h-0.5"
              style={{ backgroundColor: "#4182F9" }}
            ></div>
          )}
        </div>
      </div>

      {/* middle button section */}

      <div className="flex justify-between">
        <div
          className="flex mt-4"
          style={{ fontSize: "12px", fontWeight: "bold" }}
        >
          <div
            className="card border rounded-sm py-1 px-4"
            style={{ backgroundColor: "#F9F9F9" }}
          >
            <div className="flex">
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.25 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V4.6275C1.49989 4.93721 1.56372 5.2436 1.6875 5.5275V5.5725C1.79346 5.81323 1.94354 6.032 2.13 6.2175L6.75 10.8075V15.75C6.74974 15.8775 6.78198 16.0029 6.84365 16.1144C6.90533 16.226 6.99442 16.3199 7.1025 16.3875C7.22186 16.4615 7.35958 16.5005 7.5 16.5C7.61741 16.4993 7.73301 16.471 7.8375 16.4175L10.8375 14.9175C10.9612 14.8552 11.0652 14.7598 11.138 14.642C11.2108 14.5242 11.2496 14.3885 11.25 14.25V10.8075L15.84 6.2175C16.0265 6.032 16.1765 5.81323 16.2825 5.5725V5.5275C16.4166 5.24582 16.4907 4.93933 16.5 4.6275V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5ZM9.9675 9.9675C9.89799 10.0376 9.84299 10.1207 9.80567 10.2121C9.76835 10.3034 9.74943 10.4013 9.75 10.5V13.785L8.25 14.535V10.5C8.25057 10.4013 8.23165 10.3034 8.19433 10.2121C8.157 10.1207 8.10201 10.0376 8.0325 9.9675L4.0575 6H13.9425L9.9675 9.9675ZM15 4.5H3V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="mx-2">Filter</div>
            </div>
          </div>

          <div
            className="card border rounded-sm py-1 px-4 mx-3"
            style={{ backgroundColor: "#F9F9F9" }}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="checkbox m-0 p-0 checkbox-xs rounded-sm checkbox-primary"
              />
              <div className="mx-2">Select All</div>
            </div>
          </div>

          <div
            className="card border rounded-sm py-1 px-4"
            style={{ backgroundColor: "#F9F9F9" }}
          >
            <div className="flex">
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_77_1029)">
                    <path
                      d="M0.75 3V7.5H5.25"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.6325 11.25C3.1188 12.6302 4.0405 13.8151 5.25874 14.626C6.47698 15.4369 7.92576 15.8299 9.38679 15.7458C10.8478 15.6617 12.2419 15.1051 13.3591 14.1598C14.4763 13.2145 15.2559 11.9317 15.5807 10.5047C15.9054 9.07777 15.7576 7.58393 15.1595 6.24829C14.5614 4.91264 13.5454 3.80756 12.2646 3.09953C10.9839 2.39151 9.50768 2.11891 8.05851 2.3228C6.60934 2.52669 5.26568 3.19603 4.23 4.22996L0.75 7.49996"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_77_1029">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="mx-2">Reset</div>
            </div>
          </div>
        </div>

        <div
          className="flex mt-4"
          style={{ fontSize: "12px", fontWeight: "bold" }}
        >
          <div
            className="card border cursor-pointer rounded-sm py-1 px-4 mx-3"
            style={{ backgroundColor: "#F9F9F9" }}
            onClick={() =>
              document.getElementById("generate_questions").showModal()
            }
          >
            <div className="flex">
              <div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.40466 1.05039C8.99186 -0.350129 7.00814 -0.350128 6.59534 1.05039L6.49523 1.39003C6.23147 2.2849 5.20935 2.70827 4.39008 2.26201L4.07913 2.09264C2.79692 1.39422 1.39422 2.79693 2.09264 4.07913L2.26201 4.39008C2.70827 5.20935 2.2849 6.23147 1.39003 6.49523L1.05039 6.59534C-0.350129 7.00814 -0.350128 8.99186 1.05039 9.40466L1.39003 9.50477C2.2849 9.76853 2.70827 10.7906 2.26201 11.6099L2.09264 11.9209C1.39422 13.2031 2.79692 14.6058 4.07913 13.9074L4.39008 13.738C5.20935 13.2917 6.23147 13.7151 6.49523 14.61L6.59534 14.9496C7.00814 16.3501 8.99186 16.3501 9.40466 14.9496L9.50477 14.61C9.76853 13.7151 10.7906 13.2917 11.6099 13.738L11.9209 13.9074C13.2031 14.6058 14.6058 13.2031 13.9074 11.9209L13.738 11.6099C13.2917 10.7906 13.7151 9.76853 14.61 9.50477L14.9496 9.40466C16.3501 8.99186 16.3501 7.00814 14.9496 6.59534L14.61 6.49523C13.7151 6.23147 13.2917 5.20935 13.738 4.39008L13.9074 4.07913C14.6058 2.79692 13.2031 1.39422 11.9209 2.09264L11.6099 2.26201C10.7906 2.70827 9.76853 2.2849 9.50477 1.39003L9.40466 1.05039ZM8 10.9288C6.38246 10.9288 5.07119 9.61754 5.07119 8C5.07119 6.38246 6.38246 5.07119 8 5.07119C9.61754 5.07119 10.9288 6.38246 10.9288 8C10.9288 9.61754 9.61754 10.9288 8 10.9288Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="mx-2">Generate QnA</div>
            </div>
          </div>

          <div
            className="card border cursor-pointer rounded-sm py-1 px-4"
            style={{ backgroundColor: "#F9F9F9" }}
            onClick={HandleSelectInterview}
          >
            <div className="flex">
              <div>
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
              </div>
              <div className="mx-2">Shedule Interview</div>
            </div>
          </div>
        </div>
      </div>
      {processes &&
        !processLoading &&
        currentRoundProcess?.map((process) => (
          <CandidateShortlistCard process={process} round={currentRound} />
        ))}



      {
        currentRoundProcess?.length === 0 &&
        <div
          className="flex justify-center items-center border-2 border-violet-700 border-dotted h-64 rounded-md my-4 p-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              width="120"
              height="120"
              viewBox="0 0 647.63626 632.17383">
              <path d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z" transform="translate(-276.18187 -133.91309)" fill="#f2f2f2" />
              <path d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56" />
              <path d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z" transform="translate(-276.18187 -133.91309)" fill="#d8b1ff" />
              <circle cx="190.15351" cy="24.95465" r="20" fill="#d8b1ff" />
              <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" />
              <path d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z" transform="translate(-276.18187 -133.91309)" fill="#e6e6e6" />
              <path d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56" />
              <path d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z" transform="translate(-276.18187 -133.91309)" fill="#d8b1ff" />
              <circle cx="433.63626" cy="105.17383" r="20" fill="#d8b1ff" />
              <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff" />
            </svg>

          </div>
          <div className="text-2xl font-semibold mx-8 text-violet-400">
            No Shortlisted Candidates Found
          </div>
        </div>

      }








      {/* Modals */}

      {/* Generate Questions  */}
      <dialog id="generate_questions" className="modal">
        <div className="modal-box w-11/12 max-w-7xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* modal header  */}
          <div className="font-bold" style={{ fontSize: "25px" }}>
            Generate Questions and Answer
          </div>

          {/* modal content  */}

          <div>
            <div className="flex flex-wrap gap-4">

              <label className="form-control" style={{ fontSize: "15px", width: "600px" }}>
                <div className="label">
                  <span className="label-text">Number of Questions</span>
                </div>
                <textarea
                  name="inputPromt"
                  value={QnAFormData.inputPromt}
                  onChange={handleQnAFormChange}
                  className="input rounded-md"
                  style={{ backgroundColor: "#F9F9F9" }}
                />
              </label>
            </div>


            <div className="generate-button flex gap-3 justify-between items-center my-4">

              {/* Generating QnA Loading  */}
              <div>
                {isGeneratingQnA && (
                  <div className="mx-4">
                    <div className="flex gap-4" style={{ fontSize: "15px" }}>
                      <span className="loading loading-bars loading-md"></span>
                      <div>Generating Questions and Answers ...</div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="generate cursor-pointer card border py-3 px-3 bg-white items-center self-center rounded-md font-bold"
                style={{ backgroundColor: "#CFA0FF" }}
                onClick={handleGenerateQnA}
              >
                Generate
              </div>
            </div>

            {generatedQnA && !isGeneratingQnA && (
              <div dangerouslySetInnerHTML={{ __html: generatedQnA }} />

            )}
          </div>
        </div>
      </dialog>

      <div className="toast toast-start m-8">
        {/* Toasts */}

        {/* Shedule Interview for All Checked Candidate */}
        {interviewALertWaring && (
          <div className="alert alert-info border-4 bg-red-300 border-red-500">
            <svg
              width="25"
              height="25"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.98151 1.56642C8.53763 0.811193 7.46546 0.811193 7.02158 1.56642L0.164626 13.2331C-0.292407 14.0107 0.256279 15 1.14459 15H14.8585C15.7468 15 16.2955 14.0107 15.8385 13.2331L8.98151 1.56642ZM8 5C8.53541 5 8.95377 5.46228 8.9005 5.99504L8.54975 9.50248C8.52151 9.78492 8.28384 10 8 10C7.71616 10 7.47849 9.78492 7.45025 9.50248L7.0995 5.99504C7.04623 5.46229 7.46459 5 8 5ZM8.00154 11C8.55383 11 9.00154 11.4477 9.00154 12C9.00154 12.5523 8.55383 13 8.00154 13C7.44926 13 7.00154 12.5523 7.00154 12C7.00154 11.4477 7.44926 11 8.00154 11Z"
                fill="black"
              />
            </svg>

            <span>
              Shedule Interview for All Checked Candidate is Not Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default CandidateShortlist;
