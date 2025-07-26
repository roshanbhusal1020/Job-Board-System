import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

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

  // === Fetch roles for dropdown ===
  const getUserRoles = async () => {
    const res = await fetch(`${AUTH_URL}/roles`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    setRoles(data);
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
    formData.append("userRole", form.userRole.value);

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
    getUserRoles();
    getUserDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>THIS IS DASHBOARD</h1>

      {user && <div>Logged in as: {user.name}</div>}

      <form id="updateProfile" onSubmit={handleUpdate}>
        <input name="name" placeholder="Name" defaultValue={user?.name || ""} /><br />
        <input name="email" placeholder="Email" defaultValue={user?.email || ""} /><br />
        <input name="pin" placeholder="PIN" defaultValue={user?.pin || ""} /><br />
        <textarea name="resume" placeholder="Resume" defaultValue={user?.resume || ""} /><br />

        <select name="userRole" defaultValue={user?.userRole || ""}>
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select><br />

        <button type="submit">Update</button><br />
      </form>

      <div id="employerSection">
        {/* Add employer-specific content here if needed */}
      </div>
    </div>
  );
}
