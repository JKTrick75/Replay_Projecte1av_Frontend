import React from 'react';

function ButtonDark({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="text-md bg-gray-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 duration-300" 
    >
      {children}
    </button>
  );
}

export default ButtonDark;