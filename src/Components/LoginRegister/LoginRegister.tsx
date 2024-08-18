import React, { useState } from 'react';
import { auth } from '../../../firebaseConfig'; // Ajusta la ruta si es necesario
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import Alert from '../Alert/Alert'; // Asegúrate de que la ruta sea correcta
import './LoginRegister.css'; // Importa el archivo de estilos


const App: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Estado para el email
  const [password, setPassword] = useState<string>(''); // Estado para la contraseña
  const [action, setAction] = useState<'Sign Up' | 'Login'>('Login'); // Estado para gestionar el tipo de formulario
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Estado para el mensaje de alerta
  const [alertType, setAlertType] = useState<'success' | 'error'>('error'); // Estado para el tipo de alerta
  const navigate = useNavigate(); // Hook para la navegación

  const handleLogin = async (): Promise<void> => {
    try {
      // Verifica que los campos no estén vacíos
      if (!email || !password) {
        setAlertMessage('Por favor, completa todos los campos.');
        setAlertType('error');
        return;
      }
  
      // Intenta iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      // Redirige a la página de bienvenida con un estado de alerta
      navigate('/dashboard', { state: { alertMessage: 'Bienvenido a HydroHarmony IOT', alertType: 'success' } });
    } catch (error: any) {
      // Muestra un mensaje de error
      setAlertMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      setAlertType('error');

      // Solo muestra los errores en consola en desarrollo
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  };
  
  const handleCloseAlert = () => {
    setAlertMessage(null); // Cierra la alerta
  };

  return (
    <div className="background-container">
      <div className="centered-container">
        <div className="form-container">
          <h1 className="heading">{action === 'Login' ? 'Iniciar Sesión' : 'Registrarse'}</h1>
          <div className="input-container">
            {action === 'Login' ? (
              <>
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
              </>
            ) : null}
            {action === 'Sign Up' ? (
              <>
                {/* Formulario de registro */}
              </>
            ) : null}
          </div>
          <div className="button-container">
            <button
              className={`action-button ${action === 'Login' ? 'active' : 'inactive'}`}
              onClick={handleLogin}
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
      {alertMessage && (
        <Alert
          message={alertMessage}  // Mensaje a mostrar en la alerta
          type={alertType}         // Tipo de alerta: 'success' o 'error'
          onClose={handleCloseAlert} // Función para cerrar la alerta
        />
      )}
    </div>
  );
};

export default App;
