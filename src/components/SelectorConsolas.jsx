import React from 'react';

function SelectorConsolas({ consolasAgrupadas = [], selectedIds = [], onToggle }) {
  return (
    <div className="my-6">
      <label className="block mb-2 font-medium text-[#444444]">
        Consolas Disponibles
      </label>

      <div className="space-y-4">
        {consolasAgrupadas.map(grupo => (
          <div key={grupo.marca} className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DEDFE0]">
            
            {/* Nombre Marca */}
            <h4 className="font-bold text-lg text-[#444444] mb-3 border-b border-[#DEDFE0] pb-2">
              {grupo.marca}
            </h4>
            
            {/* Lista Consolas */}
            <div className="flex flex-wrap gap-3">
              {grupo.consolas.map(consola => {
                const isSelected = selectedIds.includes(consola._id);

                return (
                  <div
                    key={consola._id}
                    className={`
                      py-2 px-4 rounded-full text-sm font-medium cursor-pointer duration-200
                      ${isSelected //Toggle estilos
                        ? 'bg-[#E96B56] text-white shadow-lg'
                        : 'bg-white text-[#666666] border border-[#DEDFE0] hover:bg-gray-100'}
                    `}
                    onClick={() => onToggle(consola._id)}
                  >
                    {consola.nom}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectorConsolas;