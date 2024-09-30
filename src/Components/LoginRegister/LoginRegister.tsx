import React, { useState } from 'react';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import Alert from '../Alert/Alert';

const App: React.FC = () => {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [alertMessage, setAlertMessage] = useState<string | null>(null); 
  const [alertType, setAlertType] = useState<'success' | 'error'>('error'); 
  const navigate = useNavigate();

  const logoUrl = new URL('../../assets/logo.png', import.meta.url).href; // Reemplaza con la ruta de tu logo

  const handleLogin = async (): Promise<void> => {
    try {
      if (!email || !password) {
        setAlertMessage('Por favor, completa todos los campos.');
        setAlertType('error');
        return;
      }
  
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/hydroharmony', { state: { alertMessage: 'Bienvenido a HydroHarmony IOT', alertType: 'success' } });
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
    <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/image.png')" }}>
      <div className="w-full max-w-md bg-white bg-opacity-50 p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">HydroHarmony IoT</h1>
        <img src={logoUrl} alt="Logo" className="w-24 mx-auto mb-4" />
        <h2 className="text-xl text-gray-700 text-center mb-6">Iniciar Sesión</h2>
        <div className="space-y-4">
          <div className="flex items-center border-b-2 border-green-500 py-2">
            <MdEmail className="text-green-500 text-xl" />
            <input
              type="email"
              className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Tu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border-b-2 border-green-500 py-2">
            <RiLockPasswordFill className="text-green-500 text-xl" />
            <input
              type="password"
              className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Tu Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center my-4">
          <p className="text-sm text-gray-600">
            ¿Olvidaste tu contraseña? <span className="text-green-500 underline cursor-pointer">Haz clic aquí</span>
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition transform hover:scale-105"
            onClick={handleLogin}
          >
            Iniciar
          </button>
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
