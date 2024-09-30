import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from '../src/Components/LoginRegister/LoginRegister';
import ProtectedRoute from '../src/Components/Alert/ProtectedRoute';
import Layout from './Components/Dashboard/test'; // Asegúrate de que la ruta sea correcta
import IrrigationRecords from './Components/IrrigationRecords/IrrigationRecords';
import Home from './Components/Dashboard/Home1';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/hydroharmony" element={<Home />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route path="irrigation-records" element={<IrrigationRecords />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};


export default App;
