import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-800 shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo y título */}
        <Link to="/" className="text-2xl font-bold text-white">
          🎮 RePlay
        </Link>

        {/* Pestañas de navegación */}
        <div className="flex gap-6 text-lg">
          <Link to="/" className="text-gray-300 hover:text-white duration-200">
            Home
          </Link>
          <Link to="/tienda" className="text-gray-300 hover:text-white duration-200">
            Tienda
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;