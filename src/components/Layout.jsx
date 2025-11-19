import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    //Navbar - Outlet - Footer
    <div className="flex flex-col min-h-screen bg-white text-[#444444] font-sans leading-relaxed">
      <Navbar />

      <main className="flex-grow py-8 px-5 max-w-7xl mx-auto w-full">
        {/* Aquí alternaremos entre Home y Tienda */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;