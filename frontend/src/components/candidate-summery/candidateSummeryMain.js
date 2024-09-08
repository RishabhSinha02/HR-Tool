import CandidateMatches from "./candidateMatches/candidateMatches";
import CandidateShortlist from "./candidateShortlist/candidateShortlist";
import CandidateWaitlist from "./candidateWaitlist/candidateWaitlist";
import CandidateSummeryCard from "./candidateMatches/components/candidateMatchesCard";
import Timeline from "./components/timeline";
import { useState, useEffect } from "react";
import { useChangeStatusMutation } from "../../queries/process";

const CandidateSummeryMain = ({
  processes,
  processLoading,
  processError,
  filter,
  setFilter,
}) => {
  const [summeryNavbar, setSummeryNavbar] = useState(filter);

  const [matchesCount, setMatchesCount] = useState(0);
  const [shortlistCount, setShortlistCount] = useState(0);
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    if (processes) {
      setWaitlistCount(processes.filter((p) => p.status === "waitlist").length);
      setMatchesCount(processes.filter((p) => p.status === "underway").length);
      setShortlistCount(
        processes.filter((p) => p.status === "shortlist" || p.status === "selected").length
      );
    }
  }, [processes]);

  return (
    <div
      className="main card border rounded-lg m-8 h-full"
      style={{ backgroundColor: "white" }}
    >
      <div
        className="card border rounded-none rounded-t-lg text-white"
        style={{ backgroundColor: "#7F00FF" }}
      >
        <Timeline />
      </div>
      <div className="m-8">
        <div>
          {/* Navbar  */}

          <div className="flex">
            <div
              className="flex-1 grid content-between card cursor-pointer border rounded-none rounded-l-md"
              style={{
                backgroundColor:
                  summeryNavbar === "underway" ? "white" : "#F9F9F9",
              }}
              onClick={() => {
                setSummeryNavbar("underway");
                setFilter("underway");
              }}
            >
              <div className="m-4">
                <div className="flex flex-col">
                  <div
                    className="py-0 my-0"
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      lineHeight: "1",
                    }}
                  >
                    Matches
                  </div>

                  <div
                    className="py-0 my-0"
                    style={{ lineHeight: "1", color: "#7F00FF" }}
                  >
                    {matchesCount} candidates
                  </div>
                </div>
              </div>
              {summeryNavbar === "underway" && (
                <div
                  className="focus h-1"
                  style={{ backgroundColor: "#7F00FF" }}
                ></div>
              )}
            </div>
            <div
              className="flex-1 grid content-between card cursor-pointer border rounded-none"
              style={{
                backgroundColor:
                  summeryNavbar === "shortlist" ? "white" : "#F9F9F9",
              }}
              onClick={() => {
                setSummeryNavbar("shortlist");
                setFilter("shortlist");
              }}
            >
              <div className="m-4">
                <div className="flex flex-col">
                  <div
                    className="py-0 my-0"
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      lineHeight: "1",
                    }}
                  >
                    Shortlist for Interview
                  </div>

                  <div
                    className="py-0 my-0"
                    style={{ lineHeight: "1", color: "#7F00FF" }}
                  >
                    {shortlistCount} candidates
                  </div>
                </div>
              </div>
              {summeryNavbar === "shortlist" && (
                <div
                  className="focus h-1"
                  style={{ backgroundColor: "#7F00FF" }}
                ></div>
              )}
            </div>
            <div
              className="flex-1 grid content-between card cursor-pointer border rounded-none rounded-r-md"
              style={{
                backgroundColor:
                  summeryNavbar === "waitlist" ? "white" : "#F9F9F9",
              }}
              onClick={() => {
                setSummeryNavbar("waitlist");
                setFilter("waitlist");
              }}
            >
              <div className="m-4">
                <div className="flex flex-col">
                  <div
                    className="py-0 my-0"
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      lineHeight: "1",
                    }}
                  >
                    Waitlist
                  </div>

                  <div
                    className="py-0 my-0"
                    style={{ lineHeight: "1", color: "#7F00FF" }}
                  >
                    {waitlistCount} candidates
                  </div>
                </div>
              </div>
              {summeryNavbar === "waitlist" && (
                <div
                  className="focus h-1"
                  style={{ backgroundColor: "#7F00FF" }}
                ></div>
              )}
            </div>
          </div>
        </div>

        {/* Candidate Summeries  */}

        {summeryNavbar === "underway" && (
          <CandidateMatches
            processes={
              processes ? processes.filter((p) => p.status == "underway") : []
            }
            processLoading={processLoading}
            processError={processError}
          />
        )}
        {summeryNavbar === "shortlist" && (
          <CandidateShortlist
            processes={
              processes
                ? processes.filter(
                    (p) => p.status == "shortlist" || p.status == "selected"
                  )
                : []
            }
            processLoading={processLoading}
            processError={processError}
          />
        )}

        {summeryNavbar === "waitlist" && (
          <CandidateWaitlist
            processes={
              processes ? processes.filter((p) => p.status == "waitlist") : []
            }
            processLoading={processLoading}
            processError={processError}
          />
        )}
      </div>
    </div>
  );
};
export default CandidateSummeryMain;
