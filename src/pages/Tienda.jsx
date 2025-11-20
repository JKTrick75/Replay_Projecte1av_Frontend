import React, { useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom'; //Filtros
import GridProductos from '../components/GridProductos';
import ModalAddProducto from '../components/ModalAddProducto';
import ModalEditProducto from '../components/ModalEditProducto';
import ButtonPrimary from '../components/ButtonPrimary';
import { ReplayContext } from '../context/ReplayContext'; //Importamos ReplayContext

//URL BASE DE LA API DE EXPRESS
const API_URL = import.meta.env.VITE_API_URL;

function Tienda() {
  const [searchParams] = useSearchParams();

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

  //===========================================================================//
  //===========================================================================//

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#444444]">Nuestros Productos</h1>
        {/* Botón añadir producto */}
        <ButtonPrimary
           onClick={openCreateModal}
        >
          <i className="fas fa-plus"></i> Añadir Producto
        </ButtonPrimary>
      </div>

      {isLoading ? (
        <div className="text-center py-20">...</div>
      ) : (
        <GridProductos 
          juegos={juegos}
          onEdit={openEditModal} //Pasamos función de abrir modal Editar
          onDelete={removeJuego}      //Pasamos función de Borrar
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