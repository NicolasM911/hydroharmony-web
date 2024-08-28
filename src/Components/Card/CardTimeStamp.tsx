import React from 'react';
import { Card } from '@tremor/react';

interface CardTimestampProps {
  timestamp: string | null;
}

export const CardTimestamp: React.FC<CardTimestampProps> = ({ timestamp }) => {
  return (
    <Card
      className="max-w-xs mx-auto flex flex-col items-center justify-center p-4"
      decoration="top"
      decorationColor="green" // Cambia el color del borde a verde
    >
      {/* Muestra el título */}
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content text-center font-medium truncate">Último registro</p>
      
      {/* Muestra el timestamp */}
      <p className="text-2xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-center truncate">
        {timestamp !== null ? timestamp : 'Loading...'} {/* Si no hay datos, muestra "Loading..." */}
      </p>
    </Card>
  );
};
