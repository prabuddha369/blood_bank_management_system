import React from 'react'
import Image from 'next/image'

const Stats = () => {
  return (
    <section className='w-full px-10 flex text-black flex-row justify-between items-center mt-20'>
        <div className='bg-white shadow-[0_4px_10px_4px_rgba(0,0,0,0.25)] w-[30%] rounded-lg gap-5 flex flex-row justify-center items-center p-5'>
            <Image src="/doctor.png" height={100} width={100} alt='doctor'/>
            <div className='font-bold text-2xl flex flex-col'>
                <p className=''>200+</p>
                <p>Hospitals</p>
            </div>
        </div>
        <div className='bg-white shadow-[0_4px_10px_4px_rgba(0,0,0,0.25)] w-[30%] rounded-lg gap-5 flex flex-row justify-center items-center p-5'>
        <Image src="/patient.png" height={100} width={100} alt='patient'/>
        <div className='font-bold text-2xl flex flex-col'>
                <p>1000+</p>
                <p>Lives Saved</p>
            </div>
        </div>
        <div className='bg-white shadow-[0_4px_10px_4px_rgba(0,0,0,0.25)] w-[30%] rounded-lg gap-5 flex flex-row justify-center items-center p-5'>
        <Image src="/donor.png" height={100} width={100} alt='donor'/>
        <div className='font-bold text-2xl flex flex-col'>
                <p>500+</p>
                <p>Donors</p>
            </div>
        </div>
    </section>
  )
}

export default Stats