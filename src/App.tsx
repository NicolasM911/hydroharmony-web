import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from '../src/Components/LoginRegister/LoginRegister'; // Ajusta la ruta si es necesario
import WelcomePage from '../src/Components/Dashboard/WelcomePage'; // Ajusta la ruta si es necesario
import ProtectedRoute from '../src/Components/Alert/ProtectedRoute'; // Asegúrate de que la ruta sea correcta
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<WelcomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
