import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

export default function Feed() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/jobs/allJobs", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
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
    <Box p={4}>
      <Navbar />
      <Heading as="h1" size="lg" mb={6}>
        Feed
      </Heading>

      <VStack
        spacing={4}
        align="stretch"
        divider={<StackDivider borderColor="gray.200" />}
      >
        {jobs.map((job) => (
          <Box
            key={job.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="sm"
          >
            <Heading as="h2" size="md" mb={2}>
              {job.title}
            </Heading>
            <Text fontWeight="bold">{job.company}</Text>
            <Text mt={2}>{job.description}</Text>
            <Text mt={2} color="gray.600">
              Status: {job.status}
            </Text>
            <Button
              colorScheme="teal"
              size="sm"
              mt={3}
              onClick={() => applyJob(job.id)}
            >
              Apply
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
