import React, { useState } from 'react';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import Alert from '../Alert/Alert';
import './LoginRegister.css';

const App: React.FC = () => {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [alertMessage, setAlertMessage] = useState<string | null>(null); 
  const [alertType, setAlertType] = useState<'success' | 'error'>('error'); 
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    try {
      if (!email || !password) {
        setAlertMessage('Por favor, completa todos los campos.');
        setAlertType('error');
        return;
      }
  
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard', { state: { alertMessage: 'Bienvenido a HydroHarmony IOT', alertType: 'success' } });
    } catch (error: any) {
      setAlertMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      setAlertType('error');

      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  };
  
  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div className="background-container">
      <div className="centered-container">
        <div className="form-container">
          <h1 className="heading">Iniciar Sesión</h1>
          <div className="input-container">
            <div className="input-wrapper">
              <div className="icon">
                <MdEmail />
              </div>
              <input
                type="email"
                className="input-field"
                placeholder="Tu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <div className="icon">
                <RiLockPasswordFill />
              </div>
              <input
                type="password"
                className="input-field"
                placeholder="Tu Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forgot-password">
              <p>
                ¿Olvidaste tu contraseña? <span className="link">Haz clic aquí</span>
              </p>
            </div>
          </div>
          <div className="button-container">
            <button
              className="action-button active"
              onClick={handleLogin}
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default App;
