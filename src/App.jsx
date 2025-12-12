import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import Login from './pages/Login';
import Register from './pages/Register';
import { ReplayProvider } from './context/ReplayContext'; //Importamos ReplayProvider
import { AuthProvider, AuthContext } from './context/AuthContext'; //Importamos AuthProvider i AuthContext

function App() {

  return (
    <AuthProvider>
      <ReplayProvider>
        <BrowserRouter>
          <MainRoutes /> {/* MAPA RUTAS */}
        </BrowserRouter>
      </ReplayProvider>
    </AuthProvider>
  );
  
}

function MainRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Ruta "Layout" que envuelve a todas las demás, es el "marco" de la web */}
      <Route path="/" element={<Layout />}>
        
        {/* La ruta 'index' (/) cargará el componente Home */}
        <Route index element={<Home />} />
        
        {/* La ruta '/tienda' cargará el componente Tienda */}
        <Route path="tienda" element={<Tienda />} />

        {/* SI YA HAY USUARIO, redirigimos al home. Si no, mostramos login */}
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="register" element={!user ? <Register /> : <Navigate to="/" replace />} />

        {/* Ruta comodín por si no encuentra la página, cargamos home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  );
}

export default App
