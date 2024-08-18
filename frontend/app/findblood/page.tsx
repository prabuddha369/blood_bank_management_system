'use client';

import React, { useState, useEffect } from 'react';

interface BloodBank {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  bloodGroup: string;
}

interface BloodDonor {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  bloodGroup: string;
}

const FindBlood: React.FC = () => {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>([]);
  const [bloodDonorSelected, setBloodDonorSelected] = useState<boolean>(true);
  const [selectedBloodGroups, setSelectedBloodGroups] = useState<string[]>([]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    if (!isAuthenticated) {
      window.location.href = '/login';
    } else {
      fetchBloodDonors();
    }
  }, []);

  const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
  };

  const fetchBloodBanks = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map((item: any) => ({
          id: item.id,
          name: `Blood Bank - ${item.name}`,
          address: `${item.address.street}, ${item.address.city}, ${item.address.zipcode}`,
          contactNumber: item.phone,
          bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
        }));
        setBloodBanks(transformedData);
      })
      .catch(error => console.error('Error fetching blood bank data:', error));
  };

  const fetchBloodDonors = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map((item: any) => ({
          id: item.id,
          name: `Donor - ${item.name}`,
          address: `${item.address.street}, ${item.address.city}, ${item.address.zipcode}`,
          contactNumber: item.phone,
          bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
        }));
        setBloodDonors(transformedData);
      })
      .catch(error => console.error('Error fetching blood donor data:', error));
  };

  const handleBloodDonorsClick = () => {
    setBloodDonorSelected(true);
    setBloodBanks([]);
    fetchBloodDonors();
  };

  const handleBloodBanksClick = () => {
    setBloodDonorSelected(false);
    setBloodDonors([]);
    fetchBloodBanks();
  };

  const handleRequest = (name: string) => {
    alert(`Request sent to: ${name}`);
  };

  const handleBloodGroupChange = (bloodGroup: string) => {
    if (selectedBloodGroups.includes(bloodGroup)) {
      setSelectedBloodGroups(selectedBloodGroups.filter(group => group !== bloodGroup));
    } else {
      setSelectedBloodGroups([...selectedBloodGroups, bloodGroup]);
    }
  };

  const filterByBloodGroup = (data: BloodBank[] | BloodDonor[]) => {
    if (selectedBloodGroups.length === 0) {
      return data;
    }
    return data.filter(item => selectedBloodGroups.includes(item.bloodGroup));
  };

  return (
    <div className='flex flex-col items-center bg-white min-h-screen text-black'>
      <div className='w-full px-10 py-6'>
        <div className='flex justify-center space-x-4 mb-6'>
          <button
            className={`px-4 py-2 rounded-lg ${bloodDonorSelected ? 'bg-black text-white' : 'bg-gray-200'}`}
            onClick={handleBloodDonorsClick}
          >
            Blood Donors
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${!bloodDonorSelected ? 'bg-black text-white' : 'bg-gray-200'}`}
            onClick={handleBloodBanksClick}
          >
            Blood Banks
          </button>
        </div>

        <div className='flex flex-wrap justify-center mb-4'>
          <p className='text-xl font-bold me-5'>Search :</p>
          {bloodGroups.map(group => (
            <label
              key={group}
              className='mr-4 flex items-center space-x-2 text-lg cursor-pointer transition-all duration-300 transform hover:scale-105'
            >
              <input
                type='checkbox'
                value={group}
                checked={selectedBloodGroups.includes(group)}
                onChange={() => handleBloodGroupChange(group)}
                className='w-4 h-4 text-green-500 bg-white border-gray-300 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              />
              <span className='text-gray-700'>{group}</span>
            </label>
          ))}
        </div>


        {bloodDonorSelected && bloodDonors.length > 0 && (
          <div>
            {filterByBloodGroup(bloodDonors).map(donor => (
              <div key={donor.id} className='bg-gray-100 p-6 rounded-lg shadow-lg mb-4 flex justify-between'>
                <div className='text-black'>
                  <h2 className='text-2xl font-bold'>{donor.name}</h2>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>{donor.address}</p>
                  <p>Contact Number: {donor.contactNumber}</p>
                </div>
                <button
                  className='bg-black text-white my-4 px-10 rounded-lg'
                  onClick={() => handleRequest(donor.name)}
                >
                  Request
                </button>
              </div>
            ))}
          </div>
        )}
        {!bloodDonorSelected && bloodBanks.length > 0 && (
          <div>
            {filterByBloodGroup(bloodBanks).map(bloodBank => (
              <div key={bloodBank.id} className='bg-gray-100 p-6 rounded-lg shadow-lg mb-4 flex justify-between'>
                <div className='text-black'>
                  <h2 className='text-2xl font-bold'>{bloodBank.name}</h2>
                  <p>Blood Group: {bloodBank.bloodGroup}</p>
                  <p>{bloodBank.address}</p>
                  <p>Contact Number: {bloodBank.contactNumber}</p>
                </div>
                <button
                  className='bg-black text-white my-4 px-10 rounded-lg'
                  onClick={() => handleRequest(bloodBank.name)}
                >
                  Request
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindBlood;
