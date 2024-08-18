import React, { useEffect } from 'react';
import './Alert.css'; // Asegúrate de tener los estilos correspondientes

type AlertProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    // Cierra la alerta automáticamente después de 4 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    // Limpia el temporizador si el componente se desmonta antes de que se ejecute
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

export default Alert;
