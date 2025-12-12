import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; //NavLink para links activos
import { AuthContext } from '../context/AuthContext'; //Para el botón Inicio Sesión

function Navbar() {
  //Sacamos user y logout de AuthContext
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false); //Menú desplegable
  const navigate = useNavigate();

  //Función para el link activo (se verá en color primario)
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'font-medium text-[#E96B56] duration-300'
      : 'font-medium text-[#444444] hover:text-[#E96B56] duration-300';

  const handleLogout = () => {
      logout();
      setShowDropdown(false);
      navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-5">
        
        {/* Logo y título */}
        <Link to="/" className="flex items-center text-2xl font-bold text-[#444444]">
          <img src="/favicon.png" alt="Logo de Replay" className="h-8 mr-2.5" />
          Replay
        </Link>

        {/* Pestañas de navegación */}
        <div className="flex items-center gap-6">
          {/* Menú y login */}
          <ul className="flex items-center gap-6 text-lg">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/tienda" className={navLinkClass}>Tienda</NavLink></li>
          </ul>

          {/* ZONA LOGIN / USUARIO */}
          <div className="relative ml-4 border-l pl-6 border-gray-300">
            {!user ? ( //NO LOGUEADO
              <Link to="/login" className="bg-[#E96B56] text-white px-4 py-2 rounded hover:bg-[#c95642] transition">
                  Iniciar Sesión
              </Link>
            ) : ( //LOGUEADO
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 font-medium text-[#444444] hover:text-[#E96B56]"
                >
                  <i className="fas fa-user-circle text-xl"></i>
                  {user.username}
                  <i className={`fas fa-chevron-down text-sm transition ${showDropdown ? 'rotate-180':''}`}></i>
                </button>

                {/* Desplegable */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 animate-fade-in-down">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                        Rol: <span className="font-bold capitalize">{user.rol}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;