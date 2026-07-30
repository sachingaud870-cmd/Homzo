"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";


export default function Navbar() {

  const router = useRouter();

  const [user, setUser] = useState<any>(null);


  useEffect(() => {

    function loadUser() {

      const currentUser = getUser();

      setUser(currentUser);

    }


    loadUser();


    window.addEventListener(
      "auth-change",
      loadUser
    );


    return () => {

      window.removeEventListener(
        "auth-change",
        loadUser
      );

    };


  }, []);



  function handleLogout() {

    logout();

    setUser(null);


    window.dispatchEvent(
      new Event("auth-change")
    );


    router.push("/");

  }



  return (

    <nav className="flex items-center justify-between bg-white px-10 py-5 shadow">


      {/* Logo */}

      <Link
        href="/"
        className="text-3xl font-bold text-blue-600"
      >
        PropVerse
      </Link>



      {/* Menu */}

      <div className="flex gap-8 text-gray-700">

        <Link href="/">
          Home
        </Link>


        <Link href="/properties">
          Properties
        </Link>


        <Link href="/about">
          About
        </Link>


        <Link href="/contact">
          Contact
        </Link>

      </div>



      {/* Login / User */}

      <div>

        {
          user ? (

            <div className="flex items-center gap-5">

              <span className="font-semibold">
                Hello, {user.username}
              </span>


              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-5 py-2 text-white"
              >
                Logout
              </button>


            </div>


          ) : (

            <div className="flex gap-3">


              <Link
                href="/login"
                className="rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                Login
              </Link>


              <Link
                href="/register"
                className="rounded-lg bg-green-600 px-5 py-2 text-white"
              >
                Register
              </Link>


            </div>

          )

        }

      </div>


    </nav>

  );

}