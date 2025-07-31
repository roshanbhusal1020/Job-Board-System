import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

export default function PostJob() {
  const [form, setForm] = useState({
    jobTitle: "",
    jobDescription: "",
    jobLocation: "",
    companyName: "",
  });

  const [myJobs, setMyJobs] = useState([]);
  const URL = "http://localhost:8080";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobStatus = "OPEN";

    const body = new URLSearchParams({
      ...form,
      jobStatus,
    });

    await fetch(`${URL}/jobs/createJob`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      credentials: "include",
      body,
    });

    await fetchMyJobs();
    setForm({ jobTitle: "", jobDescription: "", jobLocation: "", companyName: "" });
  };

  const fetchMyJobs = async () => {
    const res = await fetch(`${URL}/jobs/getEmployersJobs`, {
      method: "GET",
      credentials: "include",
    });
    const jobs = await res.json();
    setMyJobs(jobs);
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <Box p={4}>
      <Navbar />

      <Heading as="h1" size="lg" mb={6}>
        Post a Job
      </Heading>

      <Box
        as="form"
        onSubmit={handleSubmit}
        maxW="lg"
        p={4}
        borderWidth="1px"
        borderRadius="md"
        mb={10}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Job Title</FormLabel>
            <Input name="jobTitle" value={form.jobTitle} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Job Description</FormLabel>
            <Textarea name="jobDescription" value={form.jobDescription} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Job Location</FormLabel>
            <Input name="jobLocation" value={form.jobLocation} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <Input name="companyName" value={form.companyName} onChange={handleChange} />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Create
          </Button>
        </Stack>
      </Box>

      <Heading as="h2" size="md" mb={4}>
        My Posted Jobs
      </Heading>

      {myJobs.length === 0 ? (
        <Text>No jobs posted yet.</Text>
      ) : (
        <VStack
          spacing={4}
          align="stretch"
          divider={<StackDivider borderColor="gray.200" />}
        >
          {myJobs.map((job) => (
            <Box
              key={job.id || job.jobId}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
            >
              <Heading as="h3" size="sm">
                {job.jobTitle}
              </Heading>
              <Text mt={1}>{job.description}</Text>
              <Text mt={1} fontSize="sm">
                <strong>Location:</strong> {job.location}
              </Text>
              <Text fontSize="sm">
                <strong>Company:</strong> {job.company}
              </Text>
              <Text fontSize="sm">
                <strong>Status:</strong> {job.status}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
