import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/LoginRegister'; // Ajusta la ruta si es necesario
import ProtectedRoute from './Components/Alert/ProtectedRoute'; // Asegúrate de que la ruta sea correcta
import './index.css';
import Layout from './Components/Dashboard/test';
import IrrigationRecords from './Components/IrrigationRecords/IrrigationRecords';
import Logout from './Components/Logout/Logout';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="irrigation-records" element={<IrrigationRecords />} />
            <Route path="logout" element={<Logout />} /> {/* Ruta para cerrar sesión */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
