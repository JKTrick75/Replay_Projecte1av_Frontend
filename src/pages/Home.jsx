import React from 'react';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Replay</h1>
      <p className="text-xl text-gray-300 mb-8">Tu tienda de juegos y consolas de segunda mano.</p>
      
      {/* Carrusel principal */}
      <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Carrusel Principal (en Obras)</p>
      </div>

      {/*Cards destacadas */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Destacados</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 h-40 rounded-lg flex items-center justify-center"><p>[Card Marca]</p></div>
          <div className="bg-gray-800 h-40 rounded-lg flex items-center justify-center"><p>[Card Consola]</p></div>
          <div className="bg-gray-800 h-40 rounded-lg flex items-center justify-center"><p>[Card Juego]</p></div>
        </div>
      </div>
    </div>
  );
}

export default Home;