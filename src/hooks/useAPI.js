import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function useAPI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //Generar cabeceras con token para las peticiones
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'x-access-token': token }) //Si hay token, lo añade
        };
    };

    //READ
    const getItems = async (endpoint) => {
        setIsLoading(true);
        setError(null);
        try {
            //Permitimos pasar URLs completas (para los filtros) o endpoints relativos
            const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}/${endpoint}`;
            
            //Petición, pasamos token en el header
            const response = await fetch(url, {
                headers: getAuthHeaders() 
            });

            const data = await response.json();
            if (!data.ok) throw new Error(data.error || response.statusText);
            
            return data.resultado;
        } catch (err) {
            console.error("API Error:", err);
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    //CREATE
    const createItem = async (endpoint, item) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: getAuthHeaders(), //Pasamos token
                body: JSON.stringify(item),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.error);
            return data.resultado;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    //UPDATE
    const updateItem = async (endpoint, id, item) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(), //Pasamos token
                body: JSON.stringify(item),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.error);
            return data.resultado;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    //DELETE
    const deleteItem = async (endpoint, id) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(), //Pasamos token
            });
            const data = await response.json(); 
            if (!data.ok) throw new Error(data.error);
            return true; 
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    //Login/Register
    const postAuth = async (endpoint, body) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.error);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { getItems, createItem, updateItem, deleteItem, postAuth, isLoading, error };
}