import React, { useEffect, useState } from "react";
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

  const getMyJobs = async () => {
    const res = await fetch("http://localhost:8080/jobs/getEmployersJobs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();
    setMyJobs(data);
  };

  useEffect(() => {
    getMyJobs();
  }, []);

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
