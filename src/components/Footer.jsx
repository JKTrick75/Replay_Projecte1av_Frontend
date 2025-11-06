import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-gray-950 p-6 mt-12 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} Replay Tienda. Todos los derechos reservados.</p>
      <p>Proyecto de 2º DAW</p>
    </footer>
  );
}

export default Footer;