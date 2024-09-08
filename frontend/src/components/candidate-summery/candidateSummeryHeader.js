import { useFetchJobOpenings } from "../../queries/job";
import { useAuth } from "../../auth/authContext";
import axios from "axios";
import { PORT } from "../../congif";
import axiosnew from "../../axios";
import { useState } from "react";
// import axios from "axios";

const CandidateSummeryHeader = ({
  jobs,
  josbLoading,
  jobsError,
  selectedJob,
  setSelectedJob,
}) => {
  const { logout, user } = useAuth();


  const handleLogout = async () => {
    try {
      await axiosnew.get(`/user/logout`);
      logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };




  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const onFilesUpload = async () => {
    const formData = new FormData();

    Array.from(files).forEach(file => {
      formData.append('resumes', file);
    });

    try {
      const res = await axiosnew.post(`/jobs/${selectedJob}/upload-resumes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${user.token}`,
        }
      });

      setUploadedFiles(res.data);

    } catch (err) {
      console.error('Error uploading files', err);
    }
  };

  return (
    <div className="header flex justify-between m-8">
      <div className="heading" style={{ fontSize: "25px", fontWeight: "bold" }}>
        Candidate Summery
      </div>
      <div className="flex gap-3">
        <div>
          <select
            className="select select-bordered rounded-md"
            style={{ fontSize: "15px", fontWeight: "bold" }}
            onChange={(e) => {
              setSelectedJob(e.target.value);
            }}
          >
            {josbLoading && <option>loading...</option>}
            {jobs &&
              !josbLoading &&
              jobs?.map((job, index) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
          </select>
        </div>





        {/* Add Candidate Button */}

        <div>
          <button className="px-3 text-white font-bold cursor-pointer card border py-3 rounded-md" style={{ backgroundColor: "#7F00FF" }} onClick={() =>
            document.getElementById("add_candidate").showModal()
          }>
            <div className="flex gap-2">

              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5312 25C22.5516 25 25 22.5516 25 19.5312C25 16.5109 22.5516 14.0625 19.5312 14.0625C16.5109 14.0625 14.0625 16.5109 14.0625 19.5312C14.0625 22.5516 16.5109 25 19.5312 25ZM20.3125 17.1875V18.75H21.875C22.3065 18.75 22.6562 19.0998 22.6562 19.5312C22.6562 19.9627 22.3065 20.3125 21.875 20.3125H20.3125V21.875C20.3125 22.3065 19.9627 22.6562 19.5312 22.6562C19.0998 22.6562 18.75 22.3065 18.75 21.875V20.3125H17.1875C16.756 20.3125 16.4062 19.9627 16.4062 19.5312C16.4062 19.0998 16.756 18.75 17.1875 18.75H18.75V17.1875C18.75 16.756 19.0998 16.4062 19.5312 16.4062C19.9627 16.4062 20.3125 16.756 20.3125 17.1875Z" fill="white" />
                <path d="M17.1875 7.8125C17.1875 10.4013 15.0888 12.5 12.5 12.5C9.91117 12.5 7.8125 10.4013 7.8125 7.8125C7.8125 5.22367 9.91117 3.125 12.5 3.125C15.0888 3.125 17.1875 5.22367 17.1875 7.8125ZM12.5 10.9375C14.2259 10.9375 15.625 9.53839 15.625 7.8125C15.625 6.08661 14.2259 4.6875 12.5 4.6875C10.7741 4.6875 9.375 6.08661 9.375 7.8125C9.375 9.53839 10.7741 10.9375 12.5 10.9375Z" fill="white" />
                <path d="M12.9001 21.875C12.7237 21.3758 12.602 20.8508 12.5423 20.3071H4.6875C4.68973 19.9215 4.92774 18.7663 5.98765 17.7064C7.0068 16.6873 8.92325 15.625 12.5 15.625C12.907 15.625 13.2925 15.6388 13.6577 15.6646C14.0095 15.1313 14.432 14.6487 14.9119 14.2302C14.1829 14.1221 13.3812 14.0625 12.5 14.0625C4.6875 14.0625 3.125 18.75 3.125 20.3125C3.125 21.875 4.6875 21.875 4.6875 21.875H12.9001Z" fill="white" />
              </svg>

              <div>
                Add Candidate
              </div>
            </div>
          </button>


        </div>




        <div className="tooltip tooltip-bottom" data-tip="Logout">
          <div
            className="prifle cursor-pointer card border w-12 py-3 hover:bg-red-100 hover:border-red-600 bg-white items-center self-center rounded-md"
            onClick={handleLogout}
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 1V8H8.5V1H7.5Z" fill="black" />
              <path d="M3 8.81244C3 6.93059 4.03942 5.29082 5.57785 4.43714L5.09264 3.56274C3.24937 4.58557 2 6.55276 2 8.81244C2 12.1262 4.68629 14.8124 8 14.8124C11.3137 14.8124 14 12.1262 14 8.81244C14 6.59097 12.7925 4.65212 11.0004 3.61544L10.4996 4.48105C11.9954 5.34633 13 6.96237 13 8.81244C13 11.5739 10.7614 13.8124 8 13.8124C5.23858 13.8124 3 11.5739 3 8.81244Z" fill="black" />
              <path d="M7.5 1V8H8.5V1H7.5Z" stroke="black" stroke-width="0.5" />
              <path d="M3 8.81244C3 6.93059 4.03942 5.29082 5.57785 4.43714L5.09264 3.56274C3.24937 4.58557 2 6.55276 2 8.81244C2 12.1262 4.68629 14.8124 8 14.8124C11.3137 14.8124 14 12.1262 14 8.81244C14 6.59097 12.7925 4.65212 11.0004 3.61544L10.4996 4.48105C11.9954 5.34633 13 6.96237 13 8.81244C13 11.5739 10.7614 13.8124 8 13.8124C5.23858 13.8124 3 11.5739 3 8.81244Z" stroke="black" stroke-width="0.5" />
            </svg>


          </div>
        </div>
        <div
          className="prifle cursor-pointer card border w-12 rounded-md"
          style={{
            backgroundImage: `url(${require("../../assets/imgs/profile.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>




      {/* Modal for adding candidates */}

      <dialog id="add_candidate" className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* modal header  */}
          <div className="font-bold" style={{ fontSize: "25px" }}>
            Add Candidates
          </div>

          {/* modal content  */}
          {/* <div className="font-bold" style={{ fontSize: "15px" }}>
            Upload Resumes:
          </div> */}

          <div className="flex my-4 items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-violet-600 border-dashed rounded-lg cursor-pointer hover:bg-violet-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload Resume</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" onChange={onFilesChange} className="hidden" accept="application/pdf" multiple />
            </label>
            
          </div>

          {uploadedFiles.length > 0 && (
        <div>
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                <a href={file.filePath} target="_blank" rel="noopener noreferrer">
                  {file.fileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

          <div className="generate-button flex gap-3 justify-between items-center my-4">

              {/* Generating QnA Loading  */}
              <div>
                {/* <div className="mx-4">
                  <div className="flex gap-4" style={{ fontSize: "15px" }}>
                    <span className="loading loading-bars loading-md"></span>
                    <div>Adding Resumes ...</div>
                  </div>
                </div> */}
              </div>

              <div
                className="generate cursor-pointer card border py-3 px-3 bg-white items-center self-center rounded-md font-bold"
                style={{ backgroundColor: "#CFA0FF" }}
                onClick={onFilesUpload}
              >
                Add Candidates
              </div>
            </div>


        </div>
      </dialog>



    </div>
  );
};
export default CandidateSummeryHeader;
