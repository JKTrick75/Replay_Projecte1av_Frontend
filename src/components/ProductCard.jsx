import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonSecondary from './ButtonSecondary';
import ButtonDark from './ButtonDark';
import { AuthContext } from '../context/AuthContext'; //Importamos AuthContext

function ProductCard({ juego, onEdit, onDelete }) {
  //Extraemos lo necesario de AuthContext
  const { isAdmin, user, toggleFavorito, listaFavoritos } = useContext(AuthContext);
  const navigate = useNavigate();
  
  //Placeholder si la imagen no existe
  const imageUrl = juego.foto || 'https://via.placeholder.com/300x200?text=No+Image';

  //Comprobamos si este juego está en la lista de favoritos del usuario
  const esFavorito = listaFavoritos.includes(juego._id);

  //Controlador del click en el corazón
  const handleHeartClick = async (e) => {
    e.preventDefault();

    if (!user) {
        alert("Debes iniciar sesión para añadir a favoritos");
        navigate('/login');
        return;
    }

    //Llamamos a la función del contexto de toggle
    await toggleFavorito(juego._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:shadow-xl border border-[#DEDFE0] relative">

      {/* === BOTÓN CORAZÓN === */}
      <button 
        onClick={handleHeartClick}
        className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-2 hover:bg-white transition shadow-sm"
        title={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <i className={`fas fa-heart text-xl ${esFavorito ? 'text-red-500' : 'text-gray-300'}`}></i>
      </button>
      
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
        
        {/* ZONA BOTONES -> CONDICIONAL: solo si es admin mostramos botones */}
        {isAdmin && (
            <div className="flex justify-between gap-2">
            <ButtonSecondary onClick={() => onEdit(juego)}>
                <i className="fas fa-edit"></i> Editar
            </ButtonSecondary>

            <ButtonDark onClick={() => onDelete(juego._id)}>
                <i className="fas fa-trash-alt"></i> Borrar
            </ButtonDark>
            </div>
        )}
        
      </div>
    </div>
  );
}

export default ProductCard;