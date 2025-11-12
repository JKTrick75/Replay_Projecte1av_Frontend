import React from 'react';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4 text-[#444444]">Bienvenido a Replay</h1>
      <p className="text-2xl text-[#666666] mb-8">Tu tienda de juegos y consolas de segunda mano.</p>
      
      {/* Carrusel principal */}
      <div className="bg-[#F8F9FA] border border-[#DEDFE0] h-64 rounded-lg flex items-center justify-center">
        <p className="text-[#666666]">Carrusel Principal (en Obras)</p>
      </div>

      {/* Cards destacadas */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-[#444444]">Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8F9FA] border border-[#DEDFE0] h-40 rounded-lg flex items-center justify-center"><p className="text-[#666666]">[Card Marca]</p></div>
          <div className="bg-[#F8F9FA] border border-[#DEDFE0] h-40 rounded-lg flex items-center justify-center"><p className="text-[#666666]">[Card Consola]</p></div>
          <div className="bg-[#F8F9FA] border border-[#DEDFE0] h-40 rounded-lg flex items-center justify-center"><p className="text-[#666666]">[Card Juego]</p></div>
        </div>
      </div>
    </div>
  );
}

export default Home;