'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormData {
  emailAddress: string;
  password: string;
}

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
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.emailAddress || !formData.password) {
      alert('Please fill in all fields!');
      return;
    }

    if (formData.emailAddress === "admin@donateblood.com" && formData.password === "admin@1234") {
      const userToken = 'mockTokenAdmin';
      localStorage.setItem('AdminAuthToken', userToken);
      localStorage.setItem('authFlag', "True");
      window.location.href = '/admin/dashboard';
    } else {
      alert('Invalid credentials!');
    }
  };

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('AdminAuthToken');
    if (token == "mockTokenAdmin") {
      return true;
    }
    else{
      return false;
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center bg-white'>
      <div className='w-[90%] mt-10 ps-10 py-6 text-xl bg-gradient-to-r from-[#46052D] via-[#610834] to-[#B32346]'>
        Admin Login
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
