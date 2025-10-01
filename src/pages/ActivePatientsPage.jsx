import React from 'react';
import { Link } from 'react-router-dom';
import DoctorProfile from '../components/DoctorProfile';
import PatientListItem from '../components/PatientListItem';
import { usePatients } from '../context/PatientContext.jsx'; // 1. Import the hook

const ActivePatientsPage = () => {
  // 3. Get the dynamic patients array from the context
  const { patients } = usePatients();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Active Patients</h1>
                <p className="text-sm text-gray-500">Patients who have provided consent.</p>
            </div>
            <div className="flex items-center space-x-6">
                <Link to="/add-patient" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    + Add New Patient
                </Link>
                <DoctorProfile />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {/* 5. Add conditional message for empty list */}
          {patients.length === 0 ? (
            <div className="text-center py-10 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">No Active Patients</h3>
              <p className="mt-1 text-sm text-gray-500">Click 'Add New Patient' to get started by sending a consent request.</p>
            </div>
          ) : (
            patients.map(patient => (
              <PatientListItem key={patient.id} patient={patient} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ActivePatientsPage;
