import React, { useEffect, useState } from "react";
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

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const AUTH_URL = "http://localhost:8080/auth";

  useEffect(() => {
    fetch(`${AUTH_URL}/roles`)
      .then(res => res.json())
      .then(setRoles)
      .catch(console.error);

    fetch(`${AUTH_URL}/me`, {
      method: "POST",
      credentials: "include"
    })
      .then(res => res.text())
      .then(text => {
        if (text) {
          setUser(JSON.parse(text));
        }
      })
      .catch(console.error);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("pin", e.target.pin.value);
    formData.append("userRole", e.target.userRole.value);
    formData.append("resume", e.target.resume.value);

    const res = await fetch(`${AUTH_URL}/signup`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    console.log("Signed up:", data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("email", e.target.email.value);
    formData.append("pin", e.target.pin.value);

    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
      credentials: "include"
    });

  
    const user = await res.json();
    setUser(user);

    console.log("Logged in:", user);
    if (user.userRole === "EMPLOYER") {
      window.location.href = "/post-job";
    } else if (user.userRole === "JOB_SEEKER") {
      window.location.href = "/feed";
    }
  };

    return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Job Board</Heading>

      {user && <Box mb={4}>Logged in as: {user.name}</Box>}

      <Box mb={8}>
        <Heading size="md" mb={4}>Sign Up</Heading>
        <form onSubmit={handleSignup}>
          <VStack spacing={3} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" placeholder="Name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" placeholder="Email" />
            </FormControl>
            <FormControl>
              <FormLabel>PIN</FormLabel>
              <Input name="pin" placeholder="PIN" type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>Resume</FormLabel>
              <Textarea name="resume" placeholder="Resume" />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select name="userRole" placeholder="Select Role">
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">Sign Up</Button>
          </VStack>
        </form>
      </Box>

      <Box>
        <Heading size="md" mb={4}>Log In</Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={3} align="stretch">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" placeholder="Email" />
            </FormControl>
            <FormControl>
              <FormLabel>PIN</FormLabel>
              <Input name="pin" placeholder="PIN" type="password" />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">Log In</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}