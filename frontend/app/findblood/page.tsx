"use client";

import React, { useState, useEffect } from "react";

interface BloodDonor {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  bloodGroup: string;
  age: number;
  medical_history: string;
}

const FindBlood: React.FC = () => {
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>([]);
  const [selectedBloodGroups, setSelectedBloodGroups] = useState<string[]>([]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    if (!isAuthenticated) {
      window.location.href = "/login";
    } else {
      fetchBloodDonors();
    }
  }, []);

  const checkAuthentication = (): boolean => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  const fetchBloodDonors = () => {
    fetch("http://localhost:8000/api/donor_data/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((item: any) => ({
          name: `Donor - ${item.fullname}`,
          address: item.address,
          contactNumber: item.phone_number,
          bloodGroup: item.blood_group,
          age: item.age,
          medical_history: item.medical_history,
        }));
        setBloodDonors(transformedData);
      })
      .catch((error) =>
        console.error("Error fetching blood donor data:", error)
      );
  };

  const handleRequest = (name: string) => {
    alert(`Request sent to: ${name}`);
  };

  const handleBloodGroupChange = (bloodGroup: string) => {
    if (selectedBloodGroups.includes(bloodGroup)) {
      setSelectedBloodGroups(
        selectedBloodGroups.filter((group) => group !== bloodGroup)
      );
    } else {
      setSelectedBloodGroups([...selectedBloodGroups, bloodGroup]);
    }
  };

  const filterByBloodGroup = (data: BloodDonor[]) => {
    if (selectedBloodGroups.length === 0) {
      return data;
    }
    return data.filter((item) => selectedBloodGroups.includes(item.bloodGroup));
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen text-black">
      <div className="w-full px-10 py-6">
        <div className="flex justify-center space-x-4 mb-6">
          <button className="px-4 py-2 rounded-lg bg-gray-200">
            Blood Donors
          </button>
        </div>

        <div className="flex flex-wrap justify-center mb-4">
          <p className="text-xl font-bold me-5">Search :</p>
          {bloodGroups.map((group) => (
            <label
              key={group}
              className="mr-4 flex items-center space-x-2 text-lg cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              <input
                type="checkbox"
                value={group}
                checked={selectedBloodGroups.includes(group)}
                onChange={() => handleBloodGroupChange(group)}
                className="w-4 h-4 text-green-500 bg-white border-gray-300 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              />
              <span className="text-gray-700">{group}</span>
            </label>
          ))}
        </div>

        {bloodDonors.length > 0 && (
          <div>
            {filterByBloodGroup(bloodDonors).map((donor, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-lg mb-4 flex justify-between"
              >
                <div className="text-black">
                  <h2 className="text-2xl font-bold">{donor.name}</h2>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>{donor.address}</p>
                  <p>Contact Number: {donor.contactNumber}</p>
                  <p>Age: {donor.age}</p>
                  <p>Medical History: {donor.medical_history}</p>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="bg-black text-white h-20 px-10 rounded-lg"
                    onClick={() => handleRequest(donor.name)}
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindBlood;
