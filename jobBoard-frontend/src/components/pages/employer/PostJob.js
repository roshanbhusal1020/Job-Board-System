import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";

export default function PostJob() {
  const [form, setForm] = useState({
    jobTitle: "",
    jobDescription: "",
    jobLocation: "",
    companyName: ""
  });

  const [myJobs, setMyJobs] = useState([]);

  const URL = "http://localhost:8080";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobStatus = "OPEN"; // default
    const body = new URLSearchParams({
      ...form,
      jobStatus
    });

    await fetch(`${URL}/jobs/createJob`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      credentials: "include",
      body
    });

    await fetchMyJobs(); // refresh
    setForm({ jobTitle: "", jobDescription: "", jobLocation: "", companyName: "" });
  };

  const fetchMyJobs = async () => {
    const res = await fetch(`${URL}/jobs/getEmployersJobs`, {
      method: "GET",
      credentials: "include"
    });
    const jobs = await res.json();
    setMyJobs(jobs);
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Post a Job</h1>

      <form onSubmit={handleSubmit}>
        <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Job Title" /><br />
        <input name="jobDescription" value={form.jobDescription} onChange={handleChange} placeholder="Job Description" /><br />
        <input name="jobLocation" value={form.jobLocation} onChange={handleChange} placeholder="Job Location" /><br />
        <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" /><br />
        <button type="submit">Create</button>
      </form>

      <h2>My Posted Jobs</h2>
      {myJobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        myJobs.map(job => (
          <div key={job.id || job.jobId}>
            <h3>{job.jobTitle}</h3>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.company}</p>
            <p>{job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
