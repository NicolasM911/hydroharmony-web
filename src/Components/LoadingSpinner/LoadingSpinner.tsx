import React from 'react';
import './LoadingSpinner.css';

const logoUrl = new URL('../../assets/logo.png', import.meta.url).href;

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner-border"></div>
        <div className="logo-container">
          <img src={logoUrl} alt="Logo" className="logo-image" />
        </div>
      </div>
      <p>Cargando HydroHarmony IoT...</p>
    </div>
  );
};

export default LoadingSpinner;