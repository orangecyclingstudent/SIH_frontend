import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const doctorData = {
  name: 'Dr. Anjali Sharma',
  avatarUrl: 'https://placehold.co/100x100/E2F3F0/4A5568?text=AS',
  specialty: 'Ayurveda Generalist',
};

const DownArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const DoctorProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <img 
          src={doctorData.avatarUrl} 
          alt={doctorData.name} 
          className="w-12 h-12 rounded-full border-2 border-teal-200"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-md">{doctorData.name}</h3>
          <p className="text-gray-500 text-sm">{doctorData.specialty}</p>
        </div>
        <button className="p-2 bg-transparent border-0 rounded-md hover:bg-gray-100">
          <DownArrowIcon />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 bg-transparent border-0 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
