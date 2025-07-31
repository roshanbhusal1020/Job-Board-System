import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex bg="gray.100" p={3} gap={4} mb={4}>
      <Button variant="link" onClick={() => navigate("/dashboard")}>Dashboard</Button>
      <Button variant="link" onClick={() => navigate("/feed")}>Home</Button>
      <Button variant="link" onClick={() => navigate("/my-jobs")}>My Jobs</Button>
      <Button variant="link" onClick={() => navigate("/applied-jobs")}>Applied Jobs</Button>
      <Button variant="link" onClick={() => navigate("/post-job")}>Post a Job</Button>
    </Flex>
  );
}