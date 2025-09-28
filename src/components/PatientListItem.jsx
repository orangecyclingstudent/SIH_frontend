import React from 'react';
import { Link } from 'react-router-dom';

const PatientListItem = ({ patient }) => {
  return (
    <Link 
      to={`/patient/${patient.id}`}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-400 flex items-center space-x-4"
    >
      <img 
        src={patient.avatarUrl} 
        alt={patient.name} 
        className="w-16 h-16 rounded-full border-2 border-gray-100"
      />
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-gray-800">{patient.name}</h3>
        <div className="flex space-x-6 text-sm text-gray-500 mt-1">
          <span>Abha ID: <span className="font-medium text-gray-700">{patient.abhaId}</span></span>
          <span>Gender: <span className="font-medium text-gray-700">{patient.gender}</span></span>
          <span>Age: <span className="font-medium text-gray-700">{patient.age}</span></span>
        </div>
      </div>
      <div className="flex items-center justify-center w-10 h-10 bg-teal-50 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default PatientListItem;
