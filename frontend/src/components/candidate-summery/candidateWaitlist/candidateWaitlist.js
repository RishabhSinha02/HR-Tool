import CandidateWaitlistCard from "./components/candidateWaitlistCard";

const CandidateWaitlist = ({ processes, processLoading, processError}) => {
  return (
    <div>
      {/* middle button  */}
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
            className="card border rounded-sm py-1 px-4 mx-3"
            style={{ backgroundColor: "#F9F9F9" }}
          >
            <div className="flex">
              <div>
                <svg
                  className="mt-1"
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
              </div>
              <div className="mx-2">Shortlist</div>
            </div>
          </div>

          <div
            className="card border rounded-sm py-1 px-4"
            style={{ backgroundColor: "#F9F9F9" }}
          >
            <div className="flex">
              <div>
                <svg
                  className="mt-1"
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
              </div>
              <div className="mx-2">Reject</div>
            </div>
          </div>
        </div>
      </div>
      {/*  candidates card  */}{" "}
      {processes &&
        !processLoading &&
        processes?.map((process) => (
          <CandidateWaitlistCard process={process} />
        ))}


{
        processes?.length === 0 &&
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
            No Waitlisted Candidates
          </div>
        </div>
      }
    </div>
  );
};
export default CandidateWaitlist;
