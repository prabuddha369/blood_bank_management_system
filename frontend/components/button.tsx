'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Button = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<number | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [appointment, setAppointment] = useState<{ date: string; time: string }>({ date: '', time: '' });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const Admintoken = localStorage.getItem('AdminAuthToken');
        const flg = localStorage.getItem('authFlag');
        if(flg == "True" ){
        if (token === "mockTokenHospital" && Admintoken !== "mockTokenAdmin") {
            setIsAuthenticated(1);
        } else if (token === "mockTokenDonor" && Admintoken !== "mockTokenAdmin") {
            setIsAuthenticated(2);
        } else if (Admintoken === "mockTokenAdmin" ) {
            setIsAuthenticated(0);
        } else {
            setIsAuthenticated(undefined);
        }}
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Appointment set succesfully!")
        handleCloseModal(); 
    };

    return (
        <div className="w-full text-end me-40 mt-10">
            {isAuthenticated === 1 && (
                <Link href="/findblood">
                    <button className="bg-black shadow-lg rounded-lg text-white text-2xl px-10 py-4 hover:scale-105">
                        Request Blood
                    </button>
                </Link>
            )}
            {isAuthenticated === 2 && (
                <>
                    <button 
                        onClick={handleOpenModal} 
                        className="bg-black shadow-lg rounded-lg text-white text-2xl px-10 py-4 hover:scale-105"
                    >
                        Schedule Appointment
                    </button>
                    {isModalOpen && (
                        <div className="fixed text-black inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                                <h2 className="text-xl font-bold mb-4">Schedule an Appointment</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={appointment.date}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1" htmlFor="time">Time</label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            value={appointment.time}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Close
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
            {isAuthenticated === 0 && (
                <Link href="/admin/dashboard">
                    <button className="bg-red-500 shadow-lg rounded-lg text-white text-2xl px-10 py-4 hover:scale-105">
                        Admin Dashboard
                    </button>
                </Link>
            )}
            {isAuthenticated === undefined && (
                <Link href="/login">
                    <button className="bg-black shadow-lg rounded-lg text-white text-2xl px-10 py-4 hover:scale-105">
                        Get Blood Now
                    </button>
                </Link>
            )}
        </div>
    );
}

export default Button;
