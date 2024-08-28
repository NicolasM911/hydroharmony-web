import React, { useState } from "react";
import { LuBox, LuCalendar } from "react-icons/lu";
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { FaQuestionCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index: React.SetStateAction<number>) => {
    setActiveLink(index);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = '/login'; // Redirige a la página de login después de cerrar sesión
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard", name: "Dashboard", icon: <LuBox /> },
    { id: 2, path: "/irrigation-records", name: "Riegos Activados", icon: <LuCalendar /> }, // Nuevo enlace
  ];

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white">
      {/* logo */}
      <div className="mb-8">
        <img src="/logo.svg" alt="logo" className="w-28 hidden md:flex" />
        <img src="/logo_mini.svg" alt="logo" className="w-8 flex md:hidden" />
      </div>

      {/* Navigation Links */}
      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-5 hover:bg-green-100 hover:text-green-600 ${
              activeLink === index ? "bg-green-100 text-green-600" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-5"
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon}</span> {/* Aquí es donde se instancia el ícono */}
              <span className="text-sm text-gray-500 hidden md:flex">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Navigation Links */}

      <div className="w-full absolute bottom-16 left-0 px-4">
        <button className="w-full py-2 text-xs text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none flex items-center justify-center">
          <FaQuestionCircle className="mr-2" />
          <span className="hidden md:inline">Necesito ayuda</span>
        </button>
      </div>
      
      <div className="w-full absolute bottom-5 left-0 px-4 py-2">
        <button
          onClick={handleLogout}
          className="w-full py-2 text-xs text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none flex items-center justify-center"
        >
          <RiLogoutCircleRLine className="mr-2" />
          <span className="hidden md:inline">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
