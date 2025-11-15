import React from 'react';
import ButtonSecondary from './ButtonSecondary';
import ButtonDark from './ButtonDark';

function ProductCard({ juego, onEdit, onDelete }) {
  
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
        
        <div className="flex justify-between gap-2">
          {/* Boton Update */}
          <ButtonSecondary onClick={() => onEdit(juego)}>
            Editar
          </ButtonSecondary>

          {/* Boton Delete */}
          <ButtonDark onClick={() => onDelete(juego._id)}>
            Borrar
          </ButtonDark>
        </div>
        
      </div>
    </div>
  );
}

export default ProductCard;