import React from 'react';
import DiagnosisCard from './DiagnosisCard';

const patientHistory = [
  { name: 'Amlapitta', code: 'DD91', date: '2023-08-12' },
  { name: 'Kasa', code: 'CA21', date: '2023-05-20' },
];

const PatientHistory = () => {
  return (
    <div className="p-8 w-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patient Diagnosis History</h1>
         <p className="text-sm text-gray-600 mt-2">
          A log of all previously recorded diagnoses for this patient.
        </p>
      </header>
      <main className="space-y-4">
        {patientHistory.length > 0 ? (
            patientHistory.map(diagnosis => (
                <DiagnosisCard
                    key={diagnosis.name + diagnosis.date}
                    diagnosis={diagnosis}
                    isSelected={false}
                    showSelectButton={false}
                />
            ))
        ) : (
            <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No past records found for this patient.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default PatientHistory;
