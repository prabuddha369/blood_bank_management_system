"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Donor {
  authFlg: boolean;
  donorName: string;
  bloodGroup: string;
  phoneNumber: string;
  address: string;
  age: number;
  lastDonationDate: string;
  medicalHistory: string;
  password: string;
}

type Donors = { [key: string]: Donor };

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUserName = localStorage.getItem("username");
      setIsAuthenticated(true);
      setUserName(storedUserName || null);
    }
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      window.location.href = selectedValue;
      if (selectRef.current) {
        selectRef.current.value = "";
      }
    }
  };

  const handleLogout = () => {
    fetch("http://localhost:8000/api/logout/", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Logout successful") {
          localStorage.clear();
          setIsAuthenticated(false);
          setUserName(null);
          window.location.href = "/";
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <nav className="flex bg-white flex-row text-black px-10 pt-5 items-center w-full justify-between text-xl">
      <Link href="/">
        <Image
          className="rounded-full bg-white p-4"
          src="/logo.png"
          height={50}
          width={60}
          alt="logo"
        />
      </Link>
      <Link href="/">
        <button className="ms-40 hover:underline hover:scale-105 transition-transform duration-200">
          Home
        </button>
      </Link>
      <Link href="../#aboutus">
        <button className="hover:underline hover:scale-105 transition-transform duration-200">
          About Us
        </button>
      </Link>
      <Link href="http://localhost:8000/admin">
        <button className="hover:underline hover:scale-105 transition-transform duration-200">
          Admin
        </button>
      </Link>
      {isAuthenticated ? (
        <div className="flex items-center">
          <div
            onClick={handleLogout}
            className="cursor-pointer bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Log Out
          </div>
          <div className="text-2xl ms-10 font-bold text-end">
            Welcome, {userName}
          </div>
        </div>
      ) : (
        <>
          <select
            ref={selectRef}
            className="bg-white text-black py-2 px-4 rounded-lg hover:scale-105 transition-transform duration-200 outline-none"
            onChange={handleSelectChange}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Register Now
            </option>
            <option value="/signup/hospital">Hospital</option>
            <option value="/signup/donor">Donor</option>
          </select>
          <Link href="/login">
            <button className="border border-2 border-black px-16 py-4 rounded-lg hover:scale-105 transition-transform duration-200 ">
              Log In
            </button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
