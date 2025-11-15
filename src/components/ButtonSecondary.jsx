import React from 'react';

function ButtonSecondary({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white border border-[#E96B56] text-[#E96B56] px-5 py-2 rounded-lg font-medium hover:bg-[#E96B56] hover:text-white duration-300"
    >
      {children}
    </button>
  );
}

export default ButtonSecondary;