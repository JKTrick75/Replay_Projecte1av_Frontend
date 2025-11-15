import React from 'react';
import { Link, NavLink } from 'react-router-dom'; //NavLink para links activos

function Navbar() {
  //Función para el link activo (se verá en color primario)
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'font-medium text-[#E96B56] duration-300'
      : 'font-medium text-[#444444] hover:text-[#E96B56] duration-300';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-5">
        
        {/* Logo y título */}
        <Link to="/" className="flex items-center text-2xl font-bold text-[#444444]">
          <img 
            src="/favicon.png" 
            alt="Logo de Replay" 
            className="h-8 mr-2.5" // Mantenemos las clases de tamaño y margen
          />
          Replay
        </Link>

        {/* Pestañas de navegación */}
        <ul className="flex items-center gap-6 text-lg">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/tienda" className={navLinkClass}>
              Tienda
            </NavLink>
          </li>
          {/* Botón de Registro (En obras) */}
          <li>
            <a 
              href="#" 
              className="bg-[#E96B56] text-white px-4 py-2 rounded font-medium hover:bg-[#ee8b7a] duration-300 text-base"
            >
              Registro
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;