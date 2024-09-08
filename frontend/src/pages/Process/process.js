import { useEffect, useState } from "react";
import CandidateSummeryHeader from "../../components/candidate-summery/candidateSummeryHeader";
import CandidateSummeryMain from "../../components/candidate-summery/candidateSummeryMain";
import Sidebar from "../../components/sidebar";
import { useFetchJobOpenings } from "../../queries/job";
import { useFetchProcess } from "../../queries/process";

const Process = () => {
  const [selectedJob, setSelectedJob] = useState(undefined);
  const [filter, setFilter] = useState("underway");

  const {
    data: jobs,
    isLoading: jobsLoading,
    error: jobsError,
  } = useFetchJobOpenings();

  const {
    data: processes,
    isLoading: processLoading,
    error: processError,
    refetch,
  } = useFetchProcess(selectedJob);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setSelectedJob(jobs[0]?._id);
    }
  }, [jobs]);

  useEffect(() => {
    if (selectedJob) refetch();
  }, [selectedJob]);

  return (
    <div>
      <div className="flex">
        <div className="sidebar fixed">
          <Sidebar page={"process"} />
        </div>
        <div className="main w-full ms-16">
          <div>
            <CandidateSummeryHeader
              jobs={jobs}
              jobsError={jobsError}
              jobsLoading={jobsLoading}
              setSelectedJob={setSelectedJob}
              selectedJob={selectedJob}
            />
          </div>
          <div>
            <CandidateSummeryMain
              processes={processes}
              processLoading={processLoading}
              processError={processError}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
