"use client";

import Link from "next/link";
import Image from "next/image";
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

    <nav className="flex items-center justify-between bg-white/95 backdrop-blur-md px-12 py-4 shadow-sm border-b border-[#E8C4B3]/20">


      {/* Logo and Brand */}

      <Link
        href="/"
        className="flex items-center gap-2 group"
      >
        <Image
          src="/images/logo.png"
          alt="PropVerse Logo"
          width={45}
          height={45}
          priority
          className="group-hover:scale-105 transition-transform"
        />
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#D4A574] to-[#C9A961] bg-clip-text text-transparent">
            PropVerse
          </div>
          <div className="text-xs text-[#A68860] font-medium tracking-wide">Premium Properties</div>
        </div>
      </Link>



      {/* Menu */}

      <div className="hidden lg:flex gap-10 text-[#2C2C2C]">

        <Link href="/" className="font-medium hover:text-[#D4A574] transition relative group">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4A574] to-[#C9A961] group-hover:w-full transition-all"></span>
        </Link>


        <Link href="/properties" className="font-medium hover:text-[#D4A574] transition relative group">
          Properties
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4A574] to-[#C9A961] group-hover:w-full transition-all"></span>
        </Link>


        <Link href="/about" className="font-medium hover:text-[#D4A574] transition relative group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4A574] to-[#C9A961] group-hover:w-full transition-all"></span>
        </Link>


        <Link href="/contact" className="font-medium hover:text-[#D4A574] transition relative group">
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4A574] to-[#C9A961] group-hover:w-full transition-all"></span>
        </Link>

      </div>



      {/* Login / User */}

      <div>

        {
          user ? (

            <div className="flex items-center gap-4">

              <span className="text-sm font-medium text-[#2C2C2C]">
                {user.username} <span className="text-[#C9A961]">({user.role || "BROKER"})</span>
              </span>

              <Link href="/dashboard" className="rounded-lg bg-gradient-to-r from-[#E8C4B3] to-[#D4A574] text-white px-5 py-2 font-medium hover:shadow-md transition-all">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-[#ef4444] px-4 py-2 text-white text-sm font-medium hover:bg-[#dc2626] transition"
              >
                Logout
              </button>


            </div>


          ) : (

            <div className="flex gap-3">


              <Link
                href="/login"
                className="rounded-lg bg-white border-2 border-[#D4A574] text-[#D4A574] px-6 py-2 font-medium hover:bg-[#F5D5C8] transition"
              >
                Login
              </Link>


              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-[#E8C4B3] to-[#D4A574] text-white px-6 py-2 font-medium hover:shadow-md transition-all"
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