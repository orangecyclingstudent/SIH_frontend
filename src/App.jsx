import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ConsentPage from './pages/ConsentPage';
import ActivePatientsPage from './pages/ActivePatientsPage';
import PatientRecordPage from './pages/PatientRecordPage';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PatientConsentSuccessPage from './pages/PatientConsentSuccessPage.jsx';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<ActivePatientsPage />} />
        <Route path="/add-patient" element={<ConsentPage />} />
        <Route path="/add-patient/success" element={<PatientConsentSuccessPage />} />
        <Route path="/patient/:id" element={<PatientRecordPage />} />
      </Route>
    </Routes>
  );
}

export default App;
