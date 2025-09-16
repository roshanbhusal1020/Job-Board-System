import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  FormControl,
  FormLabel
} from "@chakra-ui/react";


export default function Dashboard() {
  const [user, setUser] = useState(null);

  const AUTH_URL = "http://localhost:8080/auth";

  // === Fetch user details ===
  const getUserDetails = async () => {
    try {
      const res = await fetch(`${AUTH_URL}/userDetails`, {
        method: "GET",
        credentials: "include",
      });

      const text = await res.text();
      const userData = JSON.parse(text);
      setUser(userData);
    } catch (err) {
      console.warn("Failed to parse user details.");
    }
  };


  // === Form submission ===
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new URLSearchParams();
    formData.append("name", form.name.value);
    formData.append("email", form.email.value);
    formData.append("pin", form.pin.value);
    formData.append("resume", form.resume.value);

    const res = await fetch(`${AUTH_URL}/updateProfile`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
      credentials: "include",
    });

    const updatedUser = await res.text();
    console.log("Updated:", updatedUser);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

    return (
    <Box>
      <Navbar />
      <Box maxW="md" mx="auto">
        <Heading mb={4}>Dashboard</Heading>

        {user && <Box mb={4}>Logged in as: {user.name}</Box>}

        <form id="updateProfile" onSubmit={handleUpdate}>
          <VStack spacing={3} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" placeholder="Name" defaultValue={user?.name || ""} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" placeholder="Email" defaultValue={user?.email || ""} />
            </FormControl>
            <FormControl>
              <FormLabel>PIN</FormLabel>
              <Input name="pin" placeholder="PIN" defaultValue={user?.pin || ""} />
            </FormControl>
            <FormControl>
              <FormLabel>Resume</FormLabel>
              <Textarea name="resume" placeholder="Resume" defaultValue={user?.resume || ""} />
            </FormControl>

            <Button type="submit" colorScheme="teal" width="full">Update</Button>
          </VStack>
        </form>
      </Box>

      <div id="employerSection">
        {/* Add employer-specific content here if needed */}
      </div>
    </Box>
  );
}
