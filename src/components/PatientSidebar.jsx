import React from 'react';
import { Link } from 'react-router-dom';

const patientData = {
  name: 'Khushi Vraj Doshi',
  avatarUrl: 'https://placehold.co/150x150/E2F3F0/4A5568?text=KV',
  abhaId: 'XX-XXXX-XXXX-1293',
  gender: 'Female',
  age: 27,
};

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const PatientSidebar = ({ activeView, setActiveView }) => {
    const navButtonClasses = (viewName) => `
        w-full text-left p-3 rounded-lg border flex justify-between items-center transition-colors duration-200
        ${activeView === viewName 
            ? 'bg-teal-500 text-white border-teal-500' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
    `;

  return (
    <aside className="w-1/4 max-w-sm bg-white p-6 border-r border-gray-200 flex flex-col space-y-8">
      <div className="text-center">
        <img
          src={patientData.avatarUrl}
          alt={patientData.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-teal-100"
        />
        <h2 className="text-xl font-bold text-gray-800">{patientData.name}</h2>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-semibold text-gray-600">Abha ID</span>
          <span className="text-gray-800">{patientData.abhaId}</span>
        </div>
        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-semibold text-gray-600">Gender</span>
          <span className="text-gray-800">{patientData.gender}</span>
        </div>
        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-semibold text-gray-600">Age</span>
          <span className="text-gray-800">{patientData.age}</span>
        </div>
      </div>
      <nav className="flex-grow space-y-4">
        <Link to="/dashboard" className="w-full text-left p-3 rounded-lg border flex items-center transition-colors duration-200 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 font-medium">
            <BackArrowIcon />
            Back to Active Patients
        </Link>

        <div className="relative my-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">Patient Actions</span>
            </div>
        </div>

        <button onClick={() => setActiveView('addNew')} className={navButtonClasses('addNew')}>
          Add New Diagnosis
          {activeView === 'addNew' && <span className="text-xs px-2 py-1 rounded-full bg-white text-teal-600">Active</span>}
        </button>
        <button onClick={() => setActiveView('viewRecord')} className={navButtonClasses('viewRecord')}>
          View Patient History
          {activeView === 'viewRecord' && <span className="text-xs px-2 py-1 rounded-full bg-white text-teal-600">Active</span>}
        </button>
      </nav>
    </aside>
  );
};

export default PatientSidebar;
