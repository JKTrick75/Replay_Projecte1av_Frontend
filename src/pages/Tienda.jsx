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

  //FETCH para recibir los datos del backend
  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, []); //El [] para ejecutarlo solo 1 vez al principio

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Nuestros Productos</h1>
      
      <div className="text-right mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          + Añadir Producto
        </button>
      </div>

      {/* Grid de productos */}
      <div className="bg-gray-800 min-h-96 rounded-lg p-4">
        <p className="text-gray-400">¡Datos cargados!</p>
        <p>Has cargado {juegos.length} juegos.</p>
        <p>Has cargado {marcas.length} marcas.</p>
        <p>Has cargado {consolas.length} consolas.</p>
      </div>

      {/* Aquí irán tus modales (que estarán ocultos) */}
      {/* <ModalAddProducto ... /> */}
      {/* <ModalEditProducto ... /> */}
    </div>
  );
}

export default Tienda;