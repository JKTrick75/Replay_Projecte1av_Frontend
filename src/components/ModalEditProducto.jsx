import React, { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import SelectorConsolas from './SelectorConsolas';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';

function ModalEditProducto({ juego, consolasAgrupadas, onSave, onClose }) {
  
  const [formData, handleChangeForm, resetForm, setFieldForm, handleToggleArrayField] = useForm({
    nom: '',
    genero: '',
    consolas_disponibles: [],
    precio: 0,
    foto: ''
  });

  //Rellenamos el formulario cuando la prop 'juego' cambia (es decir, cuando abrimos el modal)
  useEffect(() => {
    if (juego) {
      setFieldForm('nom', juego.nom);
      setFieldForm('genero', juego.genero);
      setFieldForm('precio', juego.precio);
      setFieldForm('foto', juego.foto);
      setFieldForm('consolas_disponibles', juego.consolas_disponibles || []);
    }
  }, [juego]); //Se ejecuta si 'juego' o 'setFieldForm' cambian

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validación
    if (!formData.nom || !formData.genero || !formData.precio) {
      alert('Por favor, completa al menos el nombre y el género.');
      return;
    }
    //Llamamos a onSave (handleUpdateAPI) y le pasamos el ID del juego original
    onSave({ ...formData, _id: juego._id }); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
      <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-md overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >

        <h1 className="text-3xl font-bold text-center mb-2 text-[#444444]">
          Editar Juego
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Fila 1: Nombre y Género */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="nom-edit" className="block mb-2 font-medium">Nombre</label>
              <input
                type="text" id="nom-edit" name="nom"
                value={formData.nom}
                onChange={handleChangeForm}
                className="px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-[#E96B56]"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="genero-edit" className="block mb-2 font-medium">Género</label>
              <input
                type="text" id="genero-edit" name="genero"
                value={formData.genero}
                onChange={handleChangeForm}
                className="px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-[#E96B56]"
              />
            </div>
          </div>
          
          {/* Fila 2: Imagen y Precio */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="foto-edit" className="block mb-2 font-medium">URL de la Foto</label>
              <input
                type="url" id="foto-edit" name="foto"
                value={formData.foto}
                onChange={handleChangeForm}
                className="px-4 py-3 w-full border rounded-lg focus:outline-none focus:border-[#E96B56]"
              />
            </div>
            <div className="w-1/3">
              <label htmlFor="precio-edit" className="block mb-2 font-medium">Precio (€)</label>
              <input
                type="number" id="precio-edit" name="precio"
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
              Guardar Cambios
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditProducto;