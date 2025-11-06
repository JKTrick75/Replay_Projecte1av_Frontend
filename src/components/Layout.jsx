import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'; //Aquí alternaremos entre Home y Tienda

function Layout() {
  return (
    // Esta estructura asegura que el footer baje
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* En Outlet se carga el contenido de la página en la que estemos (Home o Tienda) */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;