import React, { useEffect, useState } from "react";

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
    <div>
      <h1>Job Board</h1>

      {user && <div>Logged in as: {user.name}</div>}

      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input name="name" placeholder="Name" />
        <input name="email" placeholder="Email" />
        <input name="pin" placeholder="PIN" />
        <textarea name="resume" placeholder="Resume" />
        <select name="userRole">
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <button type="submit">Sign Up</button>
      </form>

      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input name="email" placeholder="Email" />
        <input name="pin" placeholder="PIN" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
