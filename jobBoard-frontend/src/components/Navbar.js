import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <a onClick={() => navigate("/dashboard")}>Dashboard</a> |
      <a onClick={() => navigate("/feed")}>Home</a> |
      <a onClick={() => navigate("/my-jobs")}>My Jobs</a> |
      <a onClick={() => navigate("/applied-jobs")}>Applied Jobs</a> |
      <a onClick={() => navigate("/post-job")}>Post a Job</a>
    </nav>
  );
}
