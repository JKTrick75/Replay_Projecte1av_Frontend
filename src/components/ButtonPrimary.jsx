import React from 'react';

function ButtonPrimary({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#E96B56] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#ee8b7a] duration-300"
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;