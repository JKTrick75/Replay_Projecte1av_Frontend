import React from 'react';

function ProductCard({ juego }) {
  
  //Placeholder si la imagen no existe
  const imageUrl = juego.foto || 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:shadow-xl border border-[#DEDFE0]">
      
      {/* Imagen */}
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`Portada de ${juego.nom}`} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Título */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#444444] mb-2 truncate" title={juego.nom}>
          {juego.nom}
        </h3>
        
        {/* Precio */}
        <p className="text-lg font-semibold text-[#E96B56] mb-4">
          {juego.precio ? `${juego.precio.toFixed(2)} €` : 'Precio no disponible'}
        </p>

        {/* Género */}
        <p className="text-[#666666] text-sm mb-4">
          {juego.genero} 
        </p>
        
        {/* Botones Update/Delete */}
        <div className="flex justify-between gap-2">
          <button className="flex-1 text-sm bg-white border border-[#E96B56] text-[#E96B56] px-4 py-2 rounded-lg font-medium hover:bg-[#E96B56] hover:text-white duration-300">
            Editar
          </button>
          <button className="flex-1 text-sm bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 duration-300">
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;