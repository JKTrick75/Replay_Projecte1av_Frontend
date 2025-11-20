import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useAPI } from '../hooks/useAPI';

export const ReplayContext = createContext();

export function ReplayProvider({ children }) {
    // --- STATES ---
    const [juegos, setJuegos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [consolas, setConsolas] = useState([]);
    
    // --- STATES MODALES ---
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [juegoAEditar, setJuegoAEditar] = useState(null);

    //STATE de carga para cuando cargamos la lista de juegos
    const [isListLoading, setIsListLoading] = useState(true);

    const { getItems, createItem, updateItem, deleteItem } = useAPI();

    // --- CARGA INICIAL (Marcas y Consolas) ---
    //Cargamos esto al inicio porque hace falta para los selectores
    useEffect(() => {
        const cargarMC = async () => {
            const datosMarcas = await getItems('marca');
            const datosConsolas = await getItems('consola');
            if (datosMarcas) setMarcas(datosMarcas);
            if (datosConsolas) setConsolas(datosConsolas);
        };
        cargarMC();
    }, []);

    // --- AGRUPAR CONSOLAS POR MARCA ---
    const consolasAgrupadas = useMemo(() => {
        return marcas.map(marca => {
            const consolasDeLaMarca = consolas.filter(
                consola => consola.marca_id === marca._id
            );
            return {
                marca: marca.nom,
                consolas: consolasDeLaMarca
            };
        });
    }, [marcas, consolas]);

    // --- FUNCIONES DE JUEGOS ---
    const fetchJuegos = async (queryString = '') => {
        setIsListLoading(true);

        const endpoint = queryString ? `juego?${queryString}` : 'juego';
        const datos = await getItems(endpoint);
        if (datos) setJuegos(datos);

        setIsListLoading(false);
    };

    const addJuego = async (nuevoJuego) => {
        const guardado = await createItem('juego', nuevoJuego);
        if (guardado) {
            setJuegos(prev => [...prev, guardado]);
            setIsCreateModalOpen(false);
        }
    };

    const updateJuego = async (juegoEditado) => {
        const guardado = await updateItem('juego', juegoEditado._id, juegoEditado);
        if (guardado) {
            setJuegos(prev => prev.map(j => j._id === guardado._id ? guardado : j));
            setJuegoAEditar(null);
        }
    };

    const removeJuego = async (id) => {
        if (!window.confirm("¿Seguro que quieres borrar este juego?")) return;
        
        const exito = await deleteItem('juego', id);
        if (exito) {
            setJuegos(prev => prev.filter(j => j._id !== id));
        }
    };

    // --- GESTIÓN MODALES ---
    const openCreateModal = () => setIsCreateModalOpen(true);

    const openEditModal = (juego) => setJuegoAEditar(juego);
    
    const closeModals = () => {
        setIsCreateModalOpen(false);
        setJuegoAEditar(null);
    };

    return (
        <ReplayContext.Provider value={{
            juegos, marcas, consolas, consolasAgrupadas, isLoading: isListLoading,
            isCreateModalOpen, juegoAEditar,
            fetchJuegos, addJuego, updateJuego, removeJuego,
            openCreateModal, openEditModal, closeModals
        }}>
            {children}
        </ReplayContext.Provider>
    );
}