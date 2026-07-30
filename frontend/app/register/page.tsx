"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {

  const error = await response.json();

  console.log(error);

  alert(JSON.stringify(error));

  return;
}

      alert("Registration Successful!");

      router.push("/login");

    } catch {

      alert("Registration failed.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="flex min-h-screen items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >

        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className="mb-6 w-full rounded border p-3"
          required
        />

        <button
          disabled={loading}
          className="w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Register"}
        </button>

      </form>

    </main>

  );

}