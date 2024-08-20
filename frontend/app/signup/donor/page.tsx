"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface FormData {
  donorName: string;
  bloodGroup: string;
  phoneNumber: string;
  address: string;
  age: number;
  medicalHistory: string;
  email: string;
  termsAccepted: boolean;
  password: string;
  confirmPassword: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    donorName: "",
    bloodGroup: "",
    phoneNumber: "",
    address: "",
    age: 0,
    medicalHistory: "",
    email: "",
    termsAccepted: false,
    password: "",
    confirmPassword: "",
  });

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [showVerificationPopup, setShowVerificationPopup] = useState<boolean>(false);
  const [resendEnabled, setResendEnabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(300);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (countdown > 0 && !resendEnabled) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendEnabled(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [countdown, resendEnabled]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      bloodGroup: e.target.value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions!");
      return;
    }

    fetch('http://localhost:8000/api/send_code/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          setShowVerificationPopup(true);
          setCountdown(300);
          setResendEnabled(false); 
        } else {
          alert("An Error Occurred! Please Try Again...");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleVerificationSubmit = () => {
    fetch("http://localhost:8000/api/register/donor/", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        code: verificationCode,
        name: formData.donorName,
        type: "donor",
        bloodGroup: formData.bloodGroup,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        age: formData.age,
        medicalHistory: formData.medicalHistory,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          localStorage.setItem("authToken", "donor");
          localStorage.setItem("username", formData.donorName);
          window.location.href = "/";
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleResendCode = () => {
    fetch('http://localhost:8000/api/send_code/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          setCountdown(300);
          setResendEnabled(false); 
        } else {
          alert("An Error Occurred! Please Try Again...");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-[90%] mt-10 ps-10 py-6 text-xl bg-gradient-to-r from-[#46052D] via-[#610834] to-[#B32346]">
        Register as Donor
      </div>
      <div className="w-[90%] ps-10 py-6 bg-white text-black shadow-md">
        <form className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="donorName" className="block text-lg">
              Donor Name
            </label>
            <input
              type="text"
              id="donorName"
              className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]"
              placeholder="Enter Donor Name"
              value={formData.donorName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-lg">Blood Group</label>
            <div className="flex flex-wrap gap-4">
              {bloodGroups.map((group) => (
                <label key={group} className="inline-flex items-center">
                  <input
                    type="radio"
                    value={group}
                    checked={formData.bloodGroup === group}
                    onChange={handleRadioChange}
                    className="form-radio"
                  />
                  <span className="ml-2">{group}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-lg">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-lg">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-lg">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="medicalHistory" className="block text-lg">
              Medical History
            </label>
            <input
              type="text"
              id="medicalHistory"
              className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]"
              placeholder="Enter Medical History"
              value={formData.medicalHistory}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-lg">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="termsAccepted"
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                id="termsAccepted"
                className="rounded-md"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
              />
              <span className="text-lg">
                I accept the{" "}
                <a href="/terms" className="text-blue-500 underline">
                  terms and conditions
                </a>
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-[#610834] rounded-md hover:bg-[#B32346] transition-colors duration-200"
          >
            Register
          </button>
        </form>
      </div>
      {showVerificationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center relative">
            <button
              onClick={() => setShowVerificationPopup(false)}
              className="absolute top-2 right-2 text-black hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Email Sent</h2>
            <p className="mb-4 text-black">
              A verification code has been sent to {formData.email}. Please
              enter it below:
            </p>
            <input
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full text-black px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#610834] mb-4"
              placeholder="Enter Verification Code"
            />
            <button
              onClick={handleVerificationSubmit}
              className="px-6 py-2 text-white bg-[#610834] rounded-md hover:bg-[#B32346] transition-colors duration-200"
            >
              Submit
            </button>
            <button
              onClick={handleResendCode}
              disabled={!resendEnabled}
              className={`mt-4 px-6 py-2 text-white bg-[#610834] rounded-md hover:bg-[#B32346] transition-colors duration-200 ${resendEnabled ? "" : "opacity-50 cursor-not-allowed"}`}
            >
              Resend Code {countdown > 0 ? `(${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? "0" : ""}${countdown % 60})` : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;