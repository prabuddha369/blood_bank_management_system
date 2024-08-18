'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  donorName: string;
  bloodGroup: string;
  phoneNumber: string;
  address: string;
  age: number;
  lastDonationDate: string;
  medicalHistory: string; 
  email: string;
  termsAccepted: boolean;
  password: string;
  confirmPassword: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    donorName: '',
    bloodGroup: '',
    phoneNumber: '',
    address: '',
    age: 0,
    lastDonationDate: '',
    medicalHistory: '',  
    email: '',
    termsAccepted: false,
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value,
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
      alert('Passwords do not match!');
      return;
    }

    if (!formData.termsAccepted) {
      alert('You must accept the terms and conditions!');
      return;
    }

    localStorage.setItem('authToken', 'mockTokenDonor');
    localStorage.setItem('authFlag', "True");

    const existingData = localStorage.getItem('donor_data');
    let donorData = existingData ? JSON.parse(existingData) : {};

    donorData[formData.email] = {
      authFlg: true,
      donorName: formData.donorName,
      bloodGroup: formData.bloodGroup,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      age: formData.age,
      lastDonationDate: formData.lastDonationDate,
      medicalHistory: formData.medicalHistory,
      password: formData.password,
    };

    localStorage.setItem('donor_data', JSON.stringify(donorData));

    window.location.href = '/';
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className='flex min-h-screen flex-col items-center bg-white'>
      <div className='w-[90%] mt-10 ps-10 py-6 text-xl bg-gradient-to-r from-[#46052D] via-[#610834] to-[#B32346]'>
        Register as Donor
      </div>
      <div className='w-[90%] ps-10 py-6 bg-white text-black shadow-md'>
        <form className='flex flex-col space-y-4' onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor='donorName' className='block text-lg'>
              Donor Name
            </label>
            <input
              type='text'
              id='donorName'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Donor Name'
              value={formData.donorName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='block text-lg'>
              Blood Group
            </label>
            <div className='flex flex-wrap gap-4'>
              {bloodGroups.map((group) => (
                <label key={group} className='inline-flex items-center'>
                  <input
                    type='radio'
                    value={group}
                    checked={formData.bloodGroup === group}
                    onChange={handleRadioChange}
                    className='form-radio'
                  />
                  <span className='ml-2'>{group}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor='phoneNumber' className='block text-lg'>
              Phone Number
            </label>
            <input
              type='text'
              id='phoneNumber'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Phone Number'
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address' className='block text-lg'>
              Address
            </label>
            <input
              type='text'
              id='address'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Address'
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='age' className='block text-lg'>
              Age
            </label>
            <input
              type='number'
              id='age'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Age'
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='medicalHistory' className='block text-lg'>
              Medical History
            </label>
            <input
              type='text'
              id='medicalHistory'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Medical History'
              value={formData.medicalHistory}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-lg'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Email'
              value={formData.email}
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
          <div>
            <label htmlFor='confirmPassword' className='block text-lg'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='termsAccepted' className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='termsAccepted'
                className='rounded-md'
                checked={formData.termsAccepted}
                onChange={handleInputChange}
              />
              <span className='text-lg'>
                I accept the <a href='/terms' className='text-blue-500 underline'>terms and conditions</a>
              </span>
            </label>
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 mt-4 text-white bg-[#610834] rounded-md hover:bg-[#B32346] transition-colors duration-200'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
