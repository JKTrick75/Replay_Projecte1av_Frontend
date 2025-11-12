import React, { useState, useEffect } from 'react';
// import GridProductos from '../components/GridProductos';
// import ModalAddProducto from '../components/ModalAddProducto';
// import ModalEditProducto from '../components/ModalEditProducto';

//URL BASE DE LA API DE EXPRESS
const API_URL = 'http://localhost:8080';

function Tienda() {
  //Inicializamos los estados
  const [juegos, setJuegos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [consolas, setConsolas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //FETCH para recibir los datos del backend
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#444444]">Nuestros Productos</h1>
        
        {/* Botón "+ Añadir Producto" con tu estilo primario */}
        <button 
          className="bg-[#E96B56] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#ee8b7a] duration-300"
        >
          + Añadir Producto
        </button>
      </div>

      {/* Grid de productos */}
      {isLoading ? (
        <div className="text-center py-20">
          <p className="text-xl text-[#666666]">Cargando productos...</p>
        </div>
      ) : (
        <div className="bg-[#F8F9FA] border border-[#DEDFE0] min-h-96 rounded-lg p-6">
          <p className="text-gray-500">¡Datos cargados!</p>
          <p className="text-[#444444]">Has cargado {juegos.length} juegos.</p>
          <p className="text-[#444444]">Has cargado {marcas.length} marcas.</p>
          <p className="text-[#444444]">Has cargado {consolas.length} consolas.</p>
          {/* Aquí irá tu <GridProductos ... /> */}
        </div>
      )}

      {/* Aquí irán tus modales (que estarán ocultos) */}
      {/* <ModalAddProducto ... /> */}
      {/* <ModalEditProducto ... /> */}
    </div>
  );
}

export default Tienda;