import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext.jsx';
import { jwtDecode } from 'jwt-decode'; // Corrected import

const PatientConsentSuccessPage = () => {
  const { addPatient } = usePatients();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndProcessToken = async () => {
      try {
        // 1. Fetch the JWT from the backend
        const response = await fetch('/api/consent/details', {
          credentials: 'include',
        });

        if (response.ok) {
          const { access_token } = await response.json();
          
          // Add a safeguard before decoding
          if (access_token) {
            // 2. Decode the token to get patient details
            const decodedToken = jwtDecode(access_token); // Corrected function call
            
            // 3. Format and add the patient to the global context
            const initials = decodedToken.name.split(' ').map(n => n[0]).join('');
            const newPatient = {
              id: decodedToken.sub, // Use 'sub' as the unique ID
              name: decodedToken.name,
              avatarUrl: `https://placehold.co/150x150/E2F3F0/4A5568?text=${initials}`,
              abhaId: decodedToken.sub,
              gender: 'N/A', // Add default values for now
              age: 'N/A',
            };
            addPatient(newPatient);
          } else {
            console.error("access_token not found in the response.");
          }
          
          // 4. Redirect to the dashboard
          navigate('/dashboard');
        } else {
          console.error('Failed to fetch consent details.');
          // Redirect even if it fails to avoid getting stuck
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error processing consent:', error);
        navigate('/dashboard');
      }
    };

    fetchAndProcessToken();
  }, [addPatient, navigate]); // Dependencies for the effect

  // The component will just show a loading message while it processes.
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Processing consent and adding patient...</p>
    </div>
  );
};

export default PatientConsentSuccessPage;