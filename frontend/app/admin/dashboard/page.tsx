"use client";
import React, { useState, useEffect } from "react";

interface BloodBank {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  bloodGroup: string;
}

interface Donor {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  bloodGroup: string;
}

const getRandomBloodGroup = (): string => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
};

const Page: React.FC = () => {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newAddress, setNewAddress] = useState<string>('');
  const [newContactNumber, setNewContactNumber] = useState<string>('');
  const [newBloodGroup, setNewBloodGroup] = useState<string>('');
  const [isBloodBank, setIsBloodBank] = useState<boolean>(true);
  const [editItem, setEditItem] = useState<BloodBank | Donor | null>(null);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    if (!isAuthenticated) {
      window.location.href = '/admin/login';
    }
  }, []);

  const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('AdminAuthToken');
    return token === "mockTokenAdmin";
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(data => {
        const transformedData = data.map((item: any) => ({
          id: item.id,
          name: `Blood Bank - ${item.name}`,
          address: `${item.address.street}, ${item.address.city}, ${item.address.zipcode}`,
          contactNumber: item.phone,
          bloodGroup: getRandomBloodGroup(), 
        }));
        setBloodBanks(transformedData);
      })
      .catch((error) => console.error('Error fetching blood banks:', error));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(data => {
        const transformedData = data.map((item: any) => ({
          id: item.id,
          name: `Donor - ${item.name}`,
          address: `${item.address.street}, ${item.address.city}, ${item.address.zipcode}`,
          contactNumber: item.phone,
          bloodGroup: getRandomBloodGroup(),
        }));
        setDonors(transformedData);
      })
      .catch((error) => console.error('Error fetching donors:', error));
  }, []);

  const handleDeleteBloodBank = (id: number) => {
    setBloodBanks(bloodBanks.filter((bank) => bank.id !== id));
  };

  const handleDeleteDonor = (id: number) => {
    setDonors(donors.filter((donor) => donor.id !== id));
  };

  const handleEditClick = (item: BloodBank | Donor, isBloodBank: boolean) => {
    setEditItem(item);
    setNewName(item.name);
    setNewAddress(item.address);
    setNewContactNumber(item.contactNumber);
    setNewBloodGroup(item.bloodGroup);
    setIsBloodBank(isBloodBank);
    setShowEditPopup(true);
  };

  const handlePopupSubmit = () => {
    const newEntry = {
      id: Date.now(),
      name: newName,
      address: newAddress,
      contactNumber: newContactNumber,
      bloodGroup: newBloodGroup,
    };

    if (isBloodBank) {
      setBloodBanks([...bloodBanks, newEntry as BloodBank]);
    } else {
      setDonors([...donors, newEntry as Donor]);
    }

    setShowPopup(false);
    setNewName('');
    setNewAddress('');
    setNewContactNumber('');
    setNewBloodGroup('');
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
    setNewName('');
    setNewAddress('');
    setNewContactNumber('');
    setNewBloodGroup('');
  };

  const handleEditSubmit = () => {
    if (editItem) {
      if (isBloodBank) {
        setBloodBanks(bloodBanks.map(bank =>
          bank.id === editItem.id ? { ...bank, name: newName, address: newAddress, contactNumber: newContactNumber, bloodGroup: newBloodGroup } : bank
        ));
      } else {
        setDonors(donors.map(donor =>
          donor.id === editItem.id ? { ...donor, name: newName, address: newAddress, contactNumber: newContactNumber, bloodGroup: newBloodGroup } : donor
        ));
      }
    }
    setShowEditPopup(false);
    setEditItem(null);
    setNewName('');
    setNewAddress('');
    setNewContactNumber('');
    setNewBloodGroup('');
  };

  const handleEditCancel = () => {
    setShowEditPopup(false);
    setEditItem(null);
    setNewName('');
    setNewAddress('');
    setNewContactNumber('');
    setNewBloodGroup('');
  };

  const handleAddNew = () => {
    setNewName('');
    setNewAddress('');
    setNewContactNumber('');
    setNewBloodGroup('');
    setShowPopup(true);
  };

  return (
    <div className="w-full p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Blood Banks</h2>
          <button
            onClick={() => {
              setIsBloodBank(true);
              handleAddNew();
            }}
            className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Add New Blood Bank
          </button>
          <ul className="list-disc pl-5">
            {bloodBanks.map((bank) => (
              <div key={bank.id}>
                <li className="mb-2 flex justify-between items-center">
                  <div className="flex flex-col items-start justify-start">
                    <span>{bank.name}</span>
                    <span>Ph No. - {bank.contactNumber}</span>
                    <span>Address - {bank.address}</span>
                    <span>Blood Group - {bank.bloodGroup}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(bank, true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBloodBank(bank.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
                <hr className="my-2 border-gray-300" />
              </div>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Donors</h2>
          <button
            onClick={() => {
              setIsBloodBank(false);
              handleAddNew();
            }}
            className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Add New Donor
          </button>
          <ul className="list-disc pl-5">
            {donors.map((donor) => (
              <div key={donor.id}>
                <li className="mb-2 flex justify-between items-center">
                  <div className="flex flex-col items-start justify-start">
                    <span>{donor.name}</span>
                    <span>Ph No. - {donor.contactNumber}</span>
                    <span>Address - {donor.address}</span>
                    <span>Blood Group - {donor.bloodGroup}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(donor, false)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDonor(donor.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
                <hr className="my-2 border-gray-300" />
              </div>
            ))}
          </ul>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">{isBloodBank ? 'Add New Blood Bank' : 'Add New Donor'}</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter Name"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter Address"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={newContactNumber}
              onChange={(e) => setNewContactNumber(e.target.value)}
              placeholder="Enter Contact Number"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={newBloodGroup}
              onChange={(e) => setNewBloodGroup(e.target.value)}
              placeholder="Enter Blood Group"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handlePopupSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={handlePopupCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">{isBloodBank ? 'Edit Blood Bank' : 'Edit Donor'}</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter Name"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter Address"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={newContactNumber}
              onChange={(e) => setNewContactNumber(e.target.value)}
              placeholder="Enter Contact Number"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={newBloodGroup}
              onChange={(e) => setNewBloodGroup(e.target.value)}
              placeholder="Enter Blood Group"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleEditSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleEditCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
