import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from '../src/Components/LoginRegister/LoginRegister';
import ProtectedRoute from '../src/Components/Alert/ProtectedRoute';
import Layout from './Components/Dashboard/test'; // Asegúrate de que la ruta sea correcta
import IrrigationRecords from './Components/IrrigationRecords/IrrigationRecords';
import Logout from './Components/Logout/Logout'; // Asegúrate de que la ruta sea correcta

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/logout" element={<Logout />} /> {/* Ruta para el logout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="irrigation-records" element={<IrrigationRecords />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
