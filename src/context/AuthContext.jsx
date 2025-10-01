import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create and export an AuthContext
export const AuthContext = createContext();

// 2. Create and export an AuthProvider component
export const AuthProvider = ({ children }) => {
  // 3. Create state variables
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Use a useEffect hook to fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make an async fetch call to /api/users/me
        const response = await fetch('/api/users/me', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set the user state
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        // Set isLoading to false in either case
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty dependency array means this runs once on mount

  // 5. Return the provider
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6. Create and export a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
