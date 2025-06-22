import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NetworkStatus = () => {
  const [status, setStatus] = useState({
    backendConnected: false,
    checking: true,
    error: null
  });

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        // Strip any trailing characters from the backend URL
        const baseURL = import.meta.env.VITE_BACKEND_URL.replace(/[%\s]$/, '');
        await axios.get(`${baseURL}`, { timeout: 5000 });
        setStatus({
          backendConnected: true,
          checking: false,
          error: null
        });
      } catch (error) {
        console.error('Backend connection check failed:', error);
        setStatus({
          backendConnected: false,
          checking: false,
          error: error.message
        });
      }
    };

    checkBackendConnection();
  }, []);

  if (status.checking) {
    return null; // Don't show anything while checking
  }

  if (!status.backendConnected) {
    return (
      <div className="fixed bottom-4 right-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded shadow-md z-50">
        <p className="font-bold">Backend Connection Issue</p>
        <p className="text-sm">Cannot connect to the backend server.</p>
        <p className="text-xs mt-1">{status.error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return null; // Don't show anything if connected
};

export default NetworkStatus;
