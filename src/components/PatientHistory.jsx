import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DiagnosisCard from './DiagnosisCard';

const PatientHistory = () => {
  const { id: patientId } = useParams();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    if (!patientId) return;

    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/diagnosis/history/${patientId}`, {
          credentials: 'include', // Use cookie-based auth as per project convention
        });
        if (!response.ok) {
          throw new Error('Failed to fetch diagnosis history.');
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [patientId]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-10 text-gray-500">Loading history...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }

    if (history.length === 0) {
      return (
        <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No past records found for this patient.</p>
        </div>
      );
    }

    return history.map(record => (
      <DiagnosisCard
        key={record.id}
        diagnosis={{
          term: record.namaste_term,
          code: record.namaste_code,
          short_definition: `Recorded on: ${new Date(record.timestamp).toLocaleDateString()}`,
        }}
        isSelected={false}
        showSelectButton={false}
      />
    ));
  };

  return (
    <div className="p-8 w-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patient Diagnosis History</h1>
        <p className="text-sm text-gray-600 mt-2">
          A log of all previously recorded diagnoses for this patient.
        </p>
      </header>
      <main className="space-y-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default PatientHistory;