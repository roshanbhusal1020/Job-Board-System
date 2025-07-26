import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";

export default function Feed() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/jobs/allJobs", {
        method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(setJobs)
      .catch(console.error);
  }, []);

  const applyJob = async (jobId) => {
    const res = await fetch("http://localhost:8080/applications/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ jobId }),
    });
    const result = await res.text();
    console.log(result);
  };

  return (
    <div>
      <Navbar />
      <h1>Feed</h1>
      {jobs.map(job => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.description}</p>
          <p>{job.status}</p>
          <button onClick={() => applyJob(job.id)}>Apply</button>
        </div>
      ))}
    </div>
  );
}
