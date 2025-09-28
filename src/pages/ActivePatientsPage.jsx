import React from 'react';
import { Link } from 'react-router-dom';
import DoctorProfile from '../components/DoctorProfile';
import PatientListItem from '../components/PatientListItem';

const activePatients = [
  {
    id: '1',
    name: 'Khushi Vraj Doshi',
    avatarUrl: 'https://placehold.co/150x150/E2F3F0/4A5568?text=KD',
    abhaId: 'XX-XXXX-XXXX-1293',
    gender: 'Female',
    age: 27,
  },
  {
    id: '2',
    name: 'Rohan Verma',
    avatarUrl: 'https://placehold.co/150x150/D6EAF8/4A5568?text=RV',
    abhaId: 'XX-XXXX-XXXX-4567',
    gender: 'Male',
    age: 42,
  },
  {
    id: '3',
    name: 'Priya Singh',
    avatarUrl: 'https://placehold.co/150x150/FADBD8/4A5568?text=PS',
    abhaId: 'XX-XXXX-XXXX-8901',
    gender: 'Female',
    age: 35,
  },
];

const ActivePatientsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Active Patients</h1>
                <p className="text-sm text-gray-500">Patients currently in the clinic with active tokens.</p>
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
          {activePatients.map(patient => (
            <PatientListItem key={patient.id} patient={patient} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ActivePatientsPage;
