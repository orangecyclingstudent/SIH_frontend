import { createContext, useState, useEffect, useContext, useCallback } from 'react';

// 1. Create and export a PatientContext
export const PatientContext = createContext();

// 3. Create and export a PatientProvider component
export const PatientProvider = ({ children }) => {
    // 4. Create a useState variable for patients with initial value from localStorage
    const [patients, setPatients] = useState(() => {
        try {
            const localData = localStorage.getItem('patients');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Failed to parse patients from localStorage", error);
            return [];
        }
    });

    // 5. Use a useEffect hook to save patients to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem('patients', JSON.stringify(patients));
        } catch (error) {
            console.error("Failed to save patients to localStorage", error);
        }
    }, [patients]);

    // 6. Create a memoized addPatient function
    const addPatient = useCallback((newPatient) => {
        setPatients(prevPatients => {
            // Check if a patient with the same id already exists
            if (prevPatients.find(p => p.id === newPatient.id)) {
                return prevPatients; // Return the existing state if duplicate
            }
            return [...prevPatients, newPatient]; // Return new state
        });
    }, []); // Empty dependency array is safe due to functional update

    // 7. Return a PatientContext.Provider
    return (
        <PatientContext.Provider value={{ patients, addPatient }}>
            {children}
        </PatientContext.Provider>
    );
};

// 8. Create and export a custom hook usePatients
export const usePatients = () => {
    return useContext(PatientContext);
};
