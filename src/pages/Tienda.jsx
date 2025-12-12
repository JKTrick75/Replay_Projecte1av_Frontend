import React, { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; //Filtros
import GridProductos from '../components/GridProductos';
import ModalAddProducto from '../components/ModalAddProducto';
import ModalEditProducto from '../components/ModalEditProducto';
import ButtonPrimary from '../components/ButtonPrimary';
import { ReplayContext } from '../context/ReplayContext'; //Importamos ReplayContext
import { AuthContext } from '../context/AuthContext'; //Importamos AuthContext

function Tienda() {
  const [searchParams] = useSearchParams();
  //Obtenemos lo necesario del AuthContext
  const { user, isAdmin, listaFavoritos } = useContext(AuthContext);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  //Obtenemos todo lo necesario del ReplayContext
  const {
    juegos, isLoading, fetchJuegos, 
    isCreateModalOpen, juegoAEditar, 
    openCreateModal, openEditModal, removeJuego, closeModals 
  } = useContext(ReplayContext);

  //Cargamos los juegos cuando cambia la URL
  useEffect(() => {
      //Construimos la query string
      const params = new URLSearchParams();
      if (searchParams.get('juego')) params.append('juego', searchParams.get('juego'));
      else if (searchParams.get('consola')) params.append('consola', searchParams.get('consola'));
      else if (searchParams.get('marca')) params.append('marca', searchParams.get('marca'));

      //Obtenemos juegos
      fetchJuegos(params.toString());
      
  }, [searchParams]); //Se ejecuta al cambiar filtros

  // === LÓGICA DE FILTRADO FAVORITOS ===
  //Si el botón está activo, filtramos. Si no, mostramos todos.
  const juegosFiltrados = mostrarFavoritos 
    ? juegos.filter(juego => listaFavoritos.includes(juego._id))
    : juegos;

  //===========================================================================//
  //===========================================================================//

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#444444]">Nuestros Productos</h1>

        <div className="flex gap-4">
            {/* BOTÓN TOGGLE FAVORITOS (Solo si hay usuario logueado) */}
            {user && (
              <button
                onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
                className={`px-4 py-2 rounded border transition ${
                    mostrarFavoritos 
                    ? 'bg-[#E96B56] text-white border-[#E96B56]' 
                    : 'bg-white text-[#444444] border-gray-300 hover:border-[#E96B56]'
                }`}
              >
                <i className={`fas fa-heart mr-2 ${mostrarFavoritos ? 'text-white' : 'text-[#E96B56]'}`}></i>
                {mostrarFavoritos ? 'Ver Todos' : 'Ver Mis Favoritos'}
              </button>
            )}

            {/* Botón añadir producto -> CONDICIONAL: Solo si es admin se muestra el botón */}
            {isAdmin && (
              <ButtonPrimary 
                onClick={openCreateModal}
              >
                <i className="fas fa-plus"></i> Añadir Producto
              </ButtonPrimary>
            )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20">...</div>
      ) : (
        <GridProductos 
          juegos={juegosFiltrados} //Pasamos juegos (filtrados o sin filtrar)
          onEdit={openEditModal} //Pasamos función de abrir modal Editar
          onDelete={removeJuego} //Pasamos función de Borrar
        />
      )}

      {/* --- MODALES --- */}
      {isCreateModalOpen && (
        <ModalAddProducto
          onClose={closeModals}
        />
      )}

      {juegoAEditar && (
        <ModalEditProducto
          juego={juegoAEditar}
          onClose={closeModals}
        />
      )}
    </div>
  );
}

export default Tienda;