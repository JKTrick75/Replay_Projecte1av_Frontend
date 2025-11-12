import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'; //Aquí alternaremos entre Home y Tienda

function Layout() {
  return (
    // Esta estructura asegura que el footer baje
    <div className="flex flex-col min-h-screen bg-white text-[#444444] font-sans leading-relaxed">
      <Navbar />

      {/* Aplicamos los estilos de tu <main> de ejemplo aquí */}
      <main className="flex-grow py-8 px-5 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;