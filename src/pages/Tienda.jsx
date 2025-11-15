import React, { useState, useEffect, useMemo } from 'react';
import GridProductos from '../components/GridProductos';
import ModalAddProducto from '../components/ModalAddProducto';
// import ModalEditProducto from '../components/ModalEditProducto';
import ButtonPrimary from '../components/ButtonPrimary';

//URL BASE DE LA API DE EXPRESS
const API_URL = 'http://localhost:8080';

function Tienda() {
  //Inicializamos estados
  const [juegos, setJuegos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [consolas, setConsolas] = useState([]);
  //isLoading
  const [isLoading, setIsLoading] = useState(true);
  //Modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [juegoAEditar, setJuegoAEditar] = useState(null);

  //===========================================================================//
  //== PROCESADO DE DATOS (Agrupar consolas) ==
  //===========================================================================//
  //Usamos useMemo para agrupar las consolas
  const consolasAgrupadas = useMemo(() => {
    if (marcas.length === 0 || consolas.length === 0) {
      return [];
    }
    
    //Recorremos las marcas
    return marcas.map(marca => {
      //Por cada marca, filtramos las consolas que le pertenecen
      const consolasDeLaMarca = consolas.filter(
        consola => consola.marca_id === marca._id
      );
      
      //Devolvemos el objeto agrupado
      return {
        marca: marca.nom,
        consolas: consolasDeLaMarca
      };
    });
  }, [marcas, consolas]); //Se vuelve a ejecutar si Marcas o Consolas cambian

  //===========================================================================//
  //== FUNCIONES CRUD (CREATE, UPDATE, DELETE) ==
  //===========================================================================//

  // --- READ --- FETCH para recibir los datos del backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        //Lanzamos las 3 peticiones a la vez (más rápido que por separado)
        const [juegosResponse, marcasResponse, consolasResponse] = await Promise.all([
          fetch(`${API_URL}/juego`),
          fetch(`${API_URL}/marca`),
          fetch(`${API_URL}/consola`)
        ]);

        //Pasamos la respuesta a json
        const juegosData = await juegosResponse.json();
        const marcasData = await marcasResponse.json();
        const consolasData = await consolasResponse.json();

        //Guardamos los datos en los states (guardamos solo la parte de .resultado de la respuesta)
        setJuegos(juegosData.resultado);
        setMarcas(marcasData.resultado);
        setConsolas(consolasData.resultado);

        //DEBUG
        console.log("Juegos cargados:", juegosData.resultado);
        console.log("Marcas cargadas:", marcasData.resultado);
        console.log("Consolas cargadas:", consolasData.resultado);

      } catch (error) {
        console.error("Error al cargar los datos de la API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); //El [] para ejecutarlo solo 1 vez al principio

  // --- CREATE ---
  const handleCreateAPI = async (nuevoJuego) => {
    console.log("Creando nuevo juego:", nuevoJuego);
    try {
      const response = await fetch(`${API_URL}/juego`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoJuego)
      });
      
      const data = await response.json();
      
      if (!data.ok) throw new Error(data.error);

      //Añadimos el nuevo juego al State
      setJuegos(juegosActuales => [...juegosActuales, data.resultado]);
      handleCloseModals(); //Cerramos modal

    } catch (error) {
      console.error("Error al crear el juego:", error);
      alert("No se pudo crear el juego.");
    }
  };

  // --- UPDATE ---
  const handleUpdateAPI = async (juegoActualizado) => {
    console.log("Actualizando juego:", juegoActualizado);
    // 1. Lógica FETCH PUT a tu API (`${API_URL}/juego/${juegoActualizado._id}`)
    // 2. Recibir el juego actualizado
    // 3. Actualizar el state: setJuegos(juegosActuales => juegosActuales.map(j => j._id === juegoActualizado._id ? juegoActualizado : j));
    // 4. Cerrar el modal: handleCloseModals();
  };

  // --- DELETE ---
  const handleDelete = async (juegoId) => {
    console.log("Borrando juego con ID:", juegoId);

    //Pedimos confirmación
    if (!window.confirm("¿Estás seguro de que quieres borrar este juego?")) {
      return;
    }

    try {
      await fetch(`${API_URL}/juego/${juegoId}`, {
        method: 'DELETE',
      });

      // Actualizamos el state local al instante (¡Actualización Pesimista!)
      setJuegos(juegosActuales =>
        juegosActuales.filter(juego => juego._id !== juegoId)
      );

    } catch (error) {
      console.error("Error al borrar el juego:", error);
      alert("No se pudo borrar el juego.");
    }
  };

  //===========================================================================//
  //== ABRIR Y CERRAR MODALES ==
  //===========================================================================//
  
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (juego) => {
    setJuegoAEditar(juego);
  };

  const handleCloseModals = () => {
    setIsCreateModalOpen(false);
    setJuegoAEditar(null);
  };

  //===========================================================================//
  //===========================================================================//

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#444444]">Nuestros Productos</h1>
        {/* Botón añadir producto */}
        <ButtonPrimary
           onClick={handleOpenCreateModal}
        >
          + Añadir Producto
        </ButtonPrimary>
      </div>

      {isLoading ? (
        <div className="text-center py-20">...</div>
      ) : (
        <GridProductos 
          juegos={juegos}
          onEdit={handleOpenEditModal} //Pasamos función de abrir modal Editar
          onDelete={handleDelete}      //Pasamos función de Borrar
        />
      )}

      {/* --- MODALES --- */}
      {isCreateModalOpen && (
        <ModalAddProducto
          consolasAgrupadas={consolasAgrupadas} //Pasamos las consolas agrupadas por marca
          onSave={handleCreateAPI}
          onClose={handleCloseModals}
        />
      )}

      {juegoAEditar && (
        <ModalEditProducto
          juego={juegoAEditar}
          marcas={marcas}
          consolas={consolas}
          onSave={handleUpdateAPI}
          onClose={handleCloseModals}
        />
      )}
    </div>
  );
}

export default Tienda;