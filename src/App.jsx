import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import { ReplayProvider } from './context/ReplayContext'; //Importamos ReplayProvider

function App() {

  return (
    <ReplayProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta "Layout" que envuelve a todas las demás, es el "marco" de la web */}
          <Route path="/" element={<Layout />}>
            
            {/* La ruta 'index' (/) cargará el componente Home */}
            <Route index element={<Home />} />
            
            {/* La ruta '/tienda' cargará el componente Tienda */}
            <Route path="tienda" element={<Tienda />} />

            {/* Ruta comodín por si no encuentra la página, cargamos home por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </ReplayProvider>
  );
  
}

export default App
