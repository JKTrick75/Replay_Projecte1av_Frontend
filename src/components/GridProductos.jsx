import React from 'react';
import ProductCard from './ProductCard';

function GridProductos({ juegos, onEdit, onDelete }) {
  //Si no hay juegos, muestra un mensaje
  if (!juegos || juegos.length === 0) {
    return (
      <div className="text-center py-20 bg-[#F8F9FA] border border-[#DEDFE0] rounded-lg">
        <p className="text-xl text-[#666666]">No se han encontrado juegos.</p>
        <p className="text-gray-500 mt-2">Intenta añadir uno nuevo para empezar.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {juegos.map(juego => (
        <ProductCard 
          key={juego._id}     //La 'key' per a que React identifique cada "objecte" amb el seu id, per a temes de render
          juego={juego}       //Datos del joc
          onEdit={onEdit}     //Funció Edit
          onDelete={onDelete} //Funció Delete
        />
      ))}
    </div>
  );
}

export default GridProductos;