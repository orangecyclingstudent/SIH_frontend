import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ConsentPage from './pages/ConsentPage';
import ActivePatientsPage from './pages/ActivePatientsPage';
import PatientRecordPage from './pages/PatientRecordPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<ActivePatientsPage />} />
      <Route path="/add-patient" element={<ConsentPage />} />
      <Route path="/patient/:id" element={<PatientRecordPage />} />
    </Routes>
  );
}

export default App;
