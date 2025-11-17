import React from 'react';
import { Link } from 'react-router-dom';

function FeaturedCard({ titulo, imagenFondo, linkTo }) {
  return (
    <Link 
      to={linkTo} 
      className="relative block h-48 w-full rounded-lg overflow-hidden shadow-lg group"
    >
      {/* Imagen fondo (con blur) */}
      <img
        src={imagenFondo}
        className="absolute inset-0 w-full h-full object-cover filter blur-sm transform group-hover:scale-110 transition-transform duration-300"
      />
      
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Titulo card */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-white text-3xl font-bold text-shadow-lg (puedes añadir 'text-stroke-black' si quieres borde)">
          {titulo}
        </h3>
      </div>
    </Link>
  );
}

export default FeaturedCard;