import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";

export default function MyJobs() {
  const [myJobs, setMyJobs] = useState([]);

  const getMyJobs = async () => {
    const res = await fetch("http://localhost:8080/jobs/getEmployersJobs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    const data = await res.json();
    setMyJobs(data);
  };

  useEffect(() => {
    getMyJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Jobs Created By Me</h1>
      {myJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        myJobs.map(job => (
          <div key={job.id || job.jobId}>
            <h2>{job.title || job.jobTitle}</h2>
            <p>{job.company}</p>
            <p>{job.description}</p>
            <p>{job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
