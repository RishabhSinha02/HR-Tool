1. [x][x] user login POST /users/login body : {email:"", password:""}
2. [ ][ ] user privilages chages
3. [ ][ ] patch route for updating any information

Jobs DB

1. [x][ ] create a job posting, POST /jobs, body: {job : jobSchema}
   a. data from frontend (form)
2. [ ][ ] generate-jd, POST /jobs/generate-jd body: {jobId}
   a. job object
3. upload-resume api  POST  /jobs/:id/upload-resumes body : {jobId,resumes}

Candidates DB

1. [ ][ ] create candidate regarding a job opening POST /candidates

Process DB

1. [x][ ] Create process POST /process body : {}
2. [x][ ] update status PATCH /process/:id/change-status, body : {processId, newStatus} DONE
3. [x][ ] round change: add round details PATCH /process/:id/rounds {roundDetails: interviewRoundSchema}
4. [ ][ ] round feddback change PATCH /process/:id/rounds/:roundNumber
5. [x][x] api according to status GET /process?filter=filter
