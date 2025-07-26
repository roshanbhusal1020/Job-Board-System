import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);

  const URL = "http://localhost:8080";

  // Fetch all applications
  const getApplications = async () => {
    const res = await fetch(`${URL}/applications/getApplications`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    const data = await res.json();
    setApplications(data);
  };

  // Withdraw a specific application
  const withdraw = async (id) => {
    await fetch(`${URL}/applications/withdraw/${id}`, {
      method: "PUT",
      credentials: "include"
    });

    // Refresh list
    await getApplications();
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div>
      <Navbar />

      <h1>My Applications!</h1>

      {applications.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        applications.map(app => (
          <div key={app.applicationId} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h2>{app.jobTitle}</h2>
            <h3>{app.companyName}</h3>
            <p><strong>Location:</strong> {app.location}</p>
            <p>{app.description}</p>
            {app.applicationStatus !== "WITHDRAW" && (
              <button onClick={() => withdraw(app.applicationId)}>Withdraw</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
