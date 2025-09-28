import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConsentPage() {
  const [abhaId, setAbhaId] = useState('');
  const navigate = useNavigate();

  const handleRequestConsent = () => {
    if (abhaId.trim() !== '') {
      navigate('/dashboard');
    } else {
      alert('Please enter a patient ABHA ID.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          
          <div className="text-center">
            <p className="text-sm text-gray-600">Arogyam Clinic</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Welcome, <span className="text-teal-500">Dr. Verma</span>
            </h1>
          </div>

          <div className="mt-8">
            <div className="mb-6">
              <label htmlFor="abhaIdInput" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Patient ABHA ID
              </label>
              <input
                type="text"
                id="abhaIdInput"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g., 12-3456-7890-1234"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
              />
            </div>

            <button 
              onClick={handleRequestConsent}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Request Consent
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ConsentPage;