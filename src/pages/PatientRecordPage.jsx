import React, { useState } from 'react';
import PatientSidebar from '../components/PatientSidebar';
import DiagnosisSearch from '../components/DiagnosisSearch';
import PatientHistory from '../components/PatientHistory';

const PatientRecordPage = () => {
  const [activeView, setActiveView] = useState('addNew'); // 'addNew' or 'viewRecord'

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <PatientSidebar activeView={activeView} setActiveView={setActiveView} />
      
      <main className="flex-1 overflow-y-auto">
        {activeView === 'addNew' ? <DiagnosisSearch /> : <PatientHistory />}
      </main>
    </div>
  );
}

export default PatientRecordPage;
