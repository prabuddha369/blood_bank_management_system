'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  emailAddress: string;
  password: string;
}

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

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    emailAddress: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.emailAddress || !formData.password) {
      alert('Please fill in all fields!');
      return;
    }

    const storedHospitalEmail = localStorage.getItem('emailid');
    const storedHospitalPassword = localStorage.getItem('password');

    const donorData = localStorage.getItem('donor_data');
    if (donorData) {
      const donors: Donors = JSON.parse(donorData);
      const donor = donors[formData.emailAddress];

      if (donor && donor.password === formData.password) {
        donor.authFlg = true;

        localStorage.setItem('donor_data', JSON.stringify(donors));

        localStorage.setItem('authFlag', "True");
        localStorage.setItem('authToken', 'mockTokenDonor');


        window.location.href = '/';
      }
      else if (formData.emailAddress == storedHospitalEmail && formData.password == storedHospitalPassword) {
        localStorage.setItem('authFlag', "True");
        localStorage.setItem('authToken', 'mockTokenHospital');
        window.location.href = '/';
      }
      else {
        alert('Invalid credentials!');
      }
    } else {
      alert('No donor data found!');
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center bg-white'>
      <div className='w-[90%] mt-10 ps-10 py-6 text-xl bg-gradient-to-r from-[#46052D] via-[#610834] to-[#B32346]'>
        Login
      </div>
      <div className='w-[90%] ps-10 py-6 bg-white text-black shadow-md'>
        <form className='flex flex-col space-y-4' onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor='emailAddress' className='block text-lg'>
              Email Address
            </label>
            <input
              type='email'
              id='emailAddress'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Email Address'
              value={formData.emailAddress}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-lg'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Password'
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 mt-4 text-white bg-[#610834] rounded-md hover:bg-[#B32346] transition-colors duration-200'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
