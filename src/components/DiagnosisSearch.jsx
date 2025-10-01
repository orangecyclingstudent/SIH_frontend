import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import DiagnosisCard from './DiagnosisCard';

const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const DiagnosisSearch = () => {
  const { id: patientId } = useParams(); // Get patient ID from URL
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  
  const [translation, setTranslation] = useState(null);
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [error, setError] = useState(null);

  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(''); // 'success' or 'error'

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }
    setLoadingSearch(true);
    const timerId = setTimeout(() => {
      fetch(`${apiUrl}/search?term=${searchTerm}`)
        .then(res => {
          if (!res.ok) throw new Error('Search failed');
          return res.json();
        })
        .then(data => setResults(data))
        .catch(() => setResults([]))
        .finally(() => setLoadingSearch(false));
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const handleSelect = async (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setLoadingTranslation(true);
    setError(null);
    setTranslation(null);
    setConfirmStatus('');
    try {
      const response = await fetch(`${apiUrl}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ namaste_code: diagnosis.code }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Translation not found.');
      }
      const data = await response.json();
      setTranslation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingTranslation(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedDiagnosis || !patientId) return;

    setIsConfirming(true);
    setConfirmStatus('');

    try {
      const response = await fetch(`${apiUrl}/diagnosis/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Send session cookie
        body: JSON.stringify({
          patient_id: patientId,
          namaste_code: selectedDiagnosis.code,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm diagnosis.');
      }

      setConfirmStatus('success');
      setTimeout(() => {
        handleBack(); // Go back to search view on success
      }, 2000);

    } catch (err) {
      setConfirmStatus('error');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleBack = () => {
    setSelectedDiagnosis(null);
    setTranslation(null);
    setError(null);
    setConfirmStatus('');
  };

  const renderDetailView = () => (
    <div>
      <button onClick={handleBack} className="flex items-center bg-transparent border-0 text-sm font-medium text-teal-600 hover:text-teal-800 mb-4 transition-colors">
        <BackIcon />
        Back to Search
      </button>
      <DiagnosisCard
        diagnosis={selectedDiagnosis}
        isSelected={true}
        showSelectButton={false}
      />
      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-fade-in-up">
        <div className="p-4 border-b">
            <h3 className="font-semibold text-lg text-gray-800">Translation Details</h3>
        </div>
        <div className="p-4">
          {loadingTranslation && <p className="text-gray-600">Translating...</p>}
          {error && <p className="text-red-600 font-medium">Error: {error}</p>}
          {translation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 border-b pb-2">Source (NAMASTE)</h4>
                <div><strong className="text-gray-500">Term:</strong> {selectedDiagnosis.term}</div>
                <div><strong className="text-gray-500">Code:</strong> {selectedDiagnosis.code}</div>
                <div><strong className="text-gray-500">Definition:</strong> {selectedDiagnosis.short_definition}</div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 border-b pb-2">Target (ICD-11)</h4>
                <div><strong className="text-gray-500">Term:</strong> {translation.parameter[1].part[1].valueCoding.display}</div>
                <div><strong className="text-gray-500">Code:</strong> {translation.parameter[1].part[1].valueCoding.code}</div>
                <div><strong className="text-gray-500">Equivalence:</strong> {translation.parameter[1].part[0].valueCode}</div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-50 border-t rounded-b-lg flex justify-end items-center space-x-4">
            {confirmStatus === 'success' && <p className="text-green-600 font-medium">Diagnosis Added!</p>}
            {confirmStatus === 'error' && <p className="text-red-600 font-medium">Failed. Please try again.</p>}
            <button 
                onClick={handleConfirm}
                disabled={isConfirming || !translation}
                className="px-6 py-2 rounded-md text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isConfirming ? 'Confirming...' : 'Confirm Diagnosis'}
            </button>
        </div>
      </div>
    </div>
  );

  // Renders the initial search view
  const renderSearchView = () => (
    <>
      <header className="mb-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search for Ayurveda names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
          />
        </div>
        <p className="text-sm text-gray-600 mt-3">
          {loadingSearch ? 'Searching...' : `${results.length} Search Results`}
        </p>
      </header>
      <main className="space-y-4">
        {results.map(diagnosis => (
          <DiagnosisCard
            key={diagnosis.code}
            diagnosis={diagnosis}
            isSelected={false}
            onSelect={() => handleSelect(diagnosis)}
            showSelectButton={true}
          />
        ))}
      </main>
    </>
  );

  return (
    <div className="p-8 w-full">
      {selectedDiagnosis ? renderDetailView() : renderSearchView()}
    </div>
  );
};

export default DiagnosisSearch;