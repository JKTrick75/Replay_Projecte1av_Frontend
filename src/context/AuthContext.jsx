import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    //Al iniciar, miramos si hay sesión guardada
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsAuthLoading(false);
    }, []);

    //Función para Loguearse (guardamos datos)
    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
    };

    //Función para Cerrar Sesión (borramos datos)
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    //Función gestionar favoritos
    const toggleFavorito = async (juegoId) => {
        if (!user || !token) return false; //Es necesario tener iniciada la sesión

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuario/favoritos/${juegoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });
            const data = await response.json();

            if (data.ok) {
                //Actualizamos el STATE del usuario
                const usuarioActualizado = { ...user, favoritos: data.favoritos };
                
                setUser(usuarioActualizado);
                
                //Actualizamos localstorage
                localStorage.setItem('user', JSON.stringify(usuarioActualizado));
                
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error("Error toggling favorito:", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            login, 
            logout, 
            isAuthLoading,
            isAdmin: user?.rol === 'admin', //Para saber rápidamente el rol
            toggleFavorito,
            listaFavoritos: user?.favoritos || [] //Para saber rápidamente los favoritos
        }}>
            {children}
        </AuthContext.Provider>
    );
}