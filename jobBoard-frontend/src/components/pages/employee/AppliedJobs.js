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

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);

  const URL = "http://localhost:8080";

  const getApplications = async () => {
    const res = await fetch(`${URL}/applications/getApplications`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();
    setApplications(data);
  };

  const withdraw = async (id) => {
    await fetch(`${URL}/applications/withdraw/${id}`, {
      method: "PUT",
      credentials: "include",
    });

    await getApplications();
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <Box p={4}>
      <Navbar />
      <Heading as="h1" size="lg" mb={6}>
        My Applications!
      </Heading>

      {applications.length === 0 ? (
        <Text>You have not applied for any jobs yet.</Text>
      ) : (
        <VStack
          spacing={4}
          align="stretch"
          divider={<StackDivider borderColor="gray.200" />}
        >
          {applications.map((app) => (
            <Box
              key={app.applicationId}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="sm"
            >
              <Heading as="h2" size="md">
                {app.jobTitle}
              </Heading>
              <Text fontWeight="bold">{app.companyName}</Text>
              <Text mt={2}>
                <strong>Location:</strong> {app.location}
              </Text>
              <Text mt={2}>{app.description}</Text>
              {app.applicationStatus !== "WITHDRAW" && (
                <Button
                  mt={3}
                  size="sm"
                  colorScheme="red"
                  onClick={() => withdraw(app.applicationId)}
                >
                  Withdraw
                </Button>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
