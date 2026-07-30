"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    async function loadProfile() {

      const token = localStorage.getItem("access");

      if (!token) return;

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setUser(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadProfile();

  }, []);


  if (!user) {
    return (
      <p className="p-6">
        Loading Profile...
      </p>
    );
  }


  return (

    <div>

      <h1 className="mb-6 text-3xl font-bold">
        My Profile
      </h1>


      <div className="rounded-xl bg-white p-6 shadow space-y-3">

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>First Name:</strong> {user.first_name || "-"}
        </p>

        <p>
          <strong>Last Name:</strong> {user.last_name || "-"}
        </p>

        <p>
          <strong>Email:</strong> {user.email || "-"}
        </p>

        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.date_joined).toLocaleDateString()}
        </p>

      </div>

    </div>

  );

}