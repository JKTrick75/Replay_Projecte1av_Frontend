import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Usamos NavLink para links activos

function Navbar() {
  // Función para determinar la clase de un link activo (se verá en color primario)
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'font-medium text-[#E96B56] duration-300'
      : 'font-medium text-[#444444] hover:text-[#E96B56] duration-300';

  return (
    // Estilo de tu <header> de ejemplo
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Contenedor con padding y max-width */}
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-5">
        
        {/* Logo y título */}
        <Link to="/" className="flex items-center text-2xl font-bold text-[#444444]">
          <span role="img" aria-label="logo" className="h-10 mr-2.5 text-4xl">🎮</span>
          RePlay
        </Link>

        {/* Pestañas de navegación (usamos <ul> como en tu ejemplo) */}
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
          {/* Botón de ejemplo de tu HTML */}
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