import React, { useContext } from 'react';
import { useForm } from '../hooks/useForm';
import SelectorConsolas from './SelectorConsolas';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import { ReplayContext } from '../context/ReplayContext'; //Importamos ReplayContext

function ModalAddProducto({ onClose }) {
  //Obtenemos los datos y la función del ReplayContext
  const { addJuego, consolasAgrupadas } = useContext(ReplayContext);
  
  //Usamos useForm para el estado del formulario
  const [formData, handleChangeForm, resetForm, setFieldForm, handleToggleArrayField] = useForm({
    nom: '',
    genero: '',
    consolas_disponibles: [],
    precio: 0,
    foto: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Validación
    if (!formData.nom || !formData.genero || !formData.precio) {
      alert('Por favor, completa los campos.');
      return;
    }
    //Llamamos a la función de añadir juego de ReplayContext
    addJuego(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose} //Cerramos al pulsar fuera del modal
    >
      <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-md overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} //Evitamos que se cierre al pulsar dentro
      >
        
        <h1 className="text-3xl font-bold text-center mb-2 text-[#444444]">
          Añadir Nuevo Juego
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Fila 1: Nombre y Género */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="nom" className="block mb-2 font-medium">Nombre</label>
              <input
                type="text" id="nom" name="nom"
                value={formData.nom}
                onChange={handleChangeForm}
                className="px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-[#E96B56]"
                placeholder="Ej: Super Mario Odyssey"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="genero" className="block mb-2 font-medium">Género</label>
              <input
                type="text" id="genero" name="genero"
                value={formData.genero}
                onChange={handleChangeForm}
                className="px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-[#E96B56]"
                placeholder="Ej: Plataformas"
              />
            </div>
          </div>
          
          {/* Fila 2: Imagen y Precio */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="foto" className="block mb-2 font-medium">URL de la Imagen</label>
              <input
                type="url" id="foto" name="foto"
                value={formData.foto}
                onChange={handleChangeForm}
                className="px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-[#E96B56]"
                placeholder="https://..."
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="precio" className="block mb-2 font-medium">Precio (€)</label>
              <input
                type="number" id="precio" name="precio"
                step="0.01"
                value={formData.precio}
                onChange={handleChangeForm}
                className="px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-[#E96B56]"
              />
            </div>
          </div>

          {/* Fila 3: Selector de Consolas */}
          <SelectorConsolas
            consolasAgrupadas={consolasAgrupadas}
            selectedIds={formData.consolas_disponibles}
            onToggle={(consolaId) => handleToggleArrayField('consolas_disponibles', consolaId)}
          />

          {/* Fila 4: Botones */}
          <div className="flex justify-end gap-4 mt-8">
            <ButtonSecondary onClick={onClose}>
              Cancelar
            </ButtonSecondary>
            <ButtonPrimary type="submit">
              Crear Producto
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAddProducto;