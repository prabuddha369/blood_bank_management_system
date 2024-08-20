'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

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

  const [verificationCode, setVerificationCode] = useState<string>('');
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
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    fetch('http://localhost:8000/api/send_code/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.emailAddress
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'Success') {
          setShowVerificationPopup(true);
          setCountdown(300);
          setResendEnabled(false);
        } else {
          alert('An Error Occurred! Please Try Again...');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleVerificationSubmit = () => {
    fetch('http://localhost:8000/api/register/hospital/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.emailAddress,
        password: formData.password,
        code: verificationCode,
        name: formData.hospitalName,
        type: 'hospital',
        phoneNumber: formData.phoneNumber,
        address: formData.hospitalAddress,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'Success') {
          localStorage.setItem('authToken', 'hospital');
          localStorage.setItem('username', formData.hospitalName);
          window.location.href = '/';
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleResendCode = () => {
    fetch('http://localhost:8000/api/send_code/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.emailAddress
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'Success') {
          setCountdown(300);
          setResendEnabled(false);
        } else {
          alert('An Error Occurred! Please Try Again...');
        }
      })
      .catch(error => console.error('Error:', error));
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
      {showVerificationPopup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-8 rounded-lg shadow-lg text-center relative'>
            <button
              onClick={() => setShowVerificationPopup(false)}
              className='absolute top-2 right-2 text-black hover:text-gray-600'
            >
              &times;
            </button>
            <h2 className='text-2xl font-bold mb-4'>Email Sent</h2>
            <p className='mb-4 text-black'>
              A verification code has been sent to {formData.emailAddress}. Please
              enter it below:
            </p>
            <input
              type='text'
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className='w-full text-black px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#610834] mb-4'
              placeholder='Enter Verification Code'
            />
            <button
              onClick={handleVerificationSubmit}
              className='px-6 py-2 text-white bg-[#610834] rounded-md hover:bg-[#B32346]'
            >
              Verify Code
            </button>
            <p className='mt-4'>
              {countdown > 0 ? `Resend code in ${Math.floor(countdown / 60)}:${countdown % 60}` : 
                resendEnabled ? (
                  <button onClick={handleResendCode} className='text-[#610834] underline'>
                    Resend Code
                  </button>
                ) : (
                  'Resend code option will be available soon.'
                )
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
