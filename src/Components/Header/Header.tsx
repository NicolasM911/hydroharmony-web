import { GoBell } from "react-icons/go";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <h1 className="text-xs text-gray-600">Bienvenido de nuevo!!</h1>
        <h2 className="text-xl font-semibold text-green-600">HydroHarmony IoT</h2>
        <p className="text-xl font-semibold text-gray-700">Nicolas</p>
      </div>
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-5">
          <button className="relative text-2xl text-gray-600">
            <GoBell size={28} />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-green-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white">
              9
            </span>
          </button>
          <img
            className="w-8 h-8 rounded-full border-4 border-green-400"
            src="https://randomuser.me/api/portraits/women/50.jpg"
            alt="User"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
