'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  hospitalName: string;
  hospitalAddress: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    hospitalName: '',
    hospitalAddress: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(formData.emailAddress);
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userToken = 'mockTokenHospital';
    localStorage.setItem('authFlag', "True");
    localStorage.setItem('authToken', userToken);
    localStorage.setItem('userName', formData.hospitalName);
    localStorage.setItem('emailid', formData.emailAddress);
    localStorage.setItem('password', formData.password);

    window.location.href = '/';
  };

  return (
    <div className='flex min-h-screen flex-col items-center bg-white'>
      <div className='w-[90%] mt-10 ps-10 py-6 text-xl bg-gradient-to-r from-[#46052D] via-[#610834] to-[#B32346]'>
        Register as Hospital
      </div>
      <div className='w-[90%] ps-10 py-6 bg-white text-black shadow-md'>
        <form className='flex flex-col space-y-4' onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor='hospitalName' className='block text-lg'>
              Hospital Name
            </label>
            <input
              type='text'
              id='hospitalName'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Hospital Name'
              value={formData.hospitalName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='hospitalAddress' className='block text-lg'>
              Hospital Address
            </label>
            <input
              type='text'
              id='hospitalAddress'
              className='w-full px-4 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-[#610834]'
              placeholder='Enter Hospital Address'
              value={formData.hospitalAddress}
              onChange={handleInputChange}
            />
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
