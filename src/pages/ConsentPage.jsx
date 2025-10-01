import React from 'react';

const ConsentPage = () => {
  const handleConsent = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    // This redirects to our backend, which then redirects to the ABHA server for patient login
    window.location.href = `${apiUrl}/consent/ask-patient`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full text-center p-10 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Patient Consent Required
        </h1>
        <p className="mt-4 text-md text-gray-600">
          To add a new patient to the EMR, the patient must grant consent by securely logging in with their ABHA ID.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          You will be redirected to the official ABHA portal. No patient credentials are handled by this application.
        </p>
        <div className="mt-8">
          <button
            onClick={handleConsent}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300"
          >
            Ask Patient to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentPage;