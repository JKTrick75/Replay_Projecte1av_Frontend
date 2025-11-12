import React from 'react';
import { Link } from 'react-router-dom';

// Un pequeño componente para los iconos sociales (puedes reemplazarlos por los de una librería)
const SocialIcon = ({ href, children }) => (
  <a 
    href={href} 
    className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white hover:bg-[#E96B56] hover:-translate-y-1 duration-300"
  >
    {children}
  </a>
);

function Footer() {
  return (
    <footer className="w-full bg-[#444444] text-white py-12 px-5 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        
        {/* Columna 1: Logo e Info */}
        <div>
          <Link to="/" className="flex items-center text-2xl font-bold mb-4">
            <span role="img" aria-label="logo" className="h-10 mr-2.5 text-4xl">🎮</span>
            RePlay
          </Link>
          <div className="space-y-2">
            <p className="flex items-center text-white/70">info@replay.com</p>
            <p className="flex items-center text-white/70">+34 123 456 789</p>
            <p className="flex items-center text-white/70">Valencia, España</p>
          </div>
        </div>
        
        {/* Columna 2: Enlaces Útiles */}
        <div>
          <h3 className="text-xl font-bold mb-6">Enlaces útiles</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-white/70 hover:text-white duration-300">Home</Link></li>
            <li><Link to="/tienda" className="text-white/70 hover:text-white duration-300">Tienda</Link></li>
            <li><a href="#" className="text-white/70 hover:text-white duration-300">Cómo funciona</a></li>
            <li><a href="#" className="text-white/70 hover:text-white duration-300">Registro</a></li>
          </ul>
        </div>
        
        {/* Columna 3: Empresa */}
        <div>
          <h3 className="text-xl font-bold mb-6">Empresa</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white/70 hover:text-white duration-300">Sobre nosotros</a></li>
            <li><a href="#" className="text-white/70 hover:text-white duration-300">Contacto</a></li>
            <li><a href="#" className="text-white/70 hover:text-white duration-300">Términos y condiciones</a></li>
          </ul>
        </div>
        
        {/* Columna 4: Redes Sociales */}
        <div>
          <h3 className="text-xl font-bold mb-6">Síguenos</h3>
          <div className="flex gap-4">
            {/* He usado texto como placeholder para los iconos de FontAwesome (fab fa-...) */}
            <SocialIcon href="#">F</SocialIcon>
            <SocialIcon href="#">T</SocialIcon>
            <SocialIcon href="#">I</SocialIcon>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center mt-12 pt-6 text-white/20 border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} RePlay. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;