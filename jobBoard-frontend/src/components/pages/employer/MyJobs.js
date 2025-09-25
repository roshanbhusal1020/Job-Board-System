import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import {
  Box,
  Heading,
  Text,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

export default function MyJobs() {
  const [myJobs, setMyJobs] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigate = useNavigate();
  const URL = "http://localhost:8080";

  const getMyJobs = async () => {
    const res = await fetch(`${URL}/jobs/getEmployersJobs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();
    setMyJobs(data);
  };

  useEffect(() => {
    const ensureEmployer = async () => {
      try {
        const res = await fetch(`${URL}/auth/userDetails`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          navigate("/");
          return;
        }

        const user = await res.json();
        if (user.userRole !== "EMPLOYER") {
          navigate("/feed");
          return;
        }

        await getMyJobs();
      } catch (err) {
        navigate("/");
      } finally {
        setIsLoadingUser(false);
      }
    };

    ensureEmployer();
  }, [URL, navigate]);

  if (isLoadingUser) {
    return null;
  }

  return (
    <Box p={4}>
      <Navbar />
      <Heading as="h1" size="lg" mb={6}>
        Jobs Created By Me
      </Heading>

      {myJobs.length === 0 ? (
        <Text>No jobs found.</Text>
      ) : (
        <VStack
          spacing={4}
          align="stretch"
          divider={<StackDivider borderColor="gray.200" />}
        >
          {myJobs.map((job) => (
            <Box
              key={job.id || job.jobId}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              boxShadow="sm"
            >
              <Heading as="h2" size="md" mb={2}>
                {job.title || job.jobTitle}
              </Heading>
              <Text fontWeight="bold">{job.company}</Text>
              <Text mt={2}>{job.description}</Text>
              <Text mt={2} color="gray.600">
                Status: {job.status}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
