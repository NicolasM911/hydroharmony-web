import { FaWater } from 'react-icons/fa';

interface ActivateIrrigationCardProps {
  onActivate: () => void;
}

const ActivateIrrigationCard: React.FC<ActivateIrrigationCardProps> = ({ onActivate }) => {
  return (
    <div
      onClick={onActivate}
      className="bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 cursor-pointer flex items-center space-x-2"
    >
      <FaWater size={24} />
      <span className="text-lg font-semibold">Activar Riego</span>
    </div>
  );
};

export default ActivateIrrigationCard;
