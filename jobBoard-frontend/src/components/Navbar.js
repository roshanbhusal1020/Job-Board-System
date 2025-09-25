import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/userDetails", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const isEmployer = user?.userRole === "EMPLOYER";
  const isJobSeeker = user?.userRole === "JOB_SEEKER";

  return (
    <Flex bg="gray.100" p={3} gap={4} mb={4}>
      <Button variant="link" onClick={() => navigate("/dashboard")}>Dashboard</Button>
      <Button variant="link" onClick={() => navigate("/feed")}>Home</Button>
      {isEmployer && (
        <Button variant="link" onClick={() => navigate("/my-jobs")}>My Jobs</Button>
      )}
      {isEmployer && (
        <Button variant="link" onClick={() => navigate("/post-job")}>Post a Job</Button>
      )}
      {isJobSeeker && (
        <Button variant="link" onClick={() => navigate("/applied-jobs")}>Applied Jobs</Button>
      )}
    </Flex>
  );
}
