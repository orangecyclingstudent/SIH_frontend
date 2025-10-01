import React from 'react';

function LoginPage() {

  const handleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    // Redirect the user to our backend, which will then redirect to the ABHA server.
    window.location.href = `${apiUrl}/auth/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Accura EMR
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Login to access patient records
          </p>
        </div>
        <div className="mt-8">
            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300"
            >
              Login with ABHA ID
            </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
