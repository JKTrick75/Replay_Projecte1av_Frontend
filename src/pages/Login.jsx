import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useAPI } from '../hooks/useAPI';
import { AuthContext } from '../context/AuthContext';
import ButtonPrimary from '../components/ButtonPrimary'; // Asumo que existe por tu Tienda.jsx

function Login() {
    const [formData, handleChange] = useForm({ username: '', password: '' });
    const { postAuth, isLoading, error } = useAPI();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await postAuth('auth/login', formData);
            
            if (data?.ok) {
                //Guardamos sesión en el contexto
                login(data.usuario, data.accessToken);
                //Redirigimos al home
                navigate('/');
            }
        } catch (err) {
            console.error("Error en login", err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold text-[#444444] mb-6 text-center">Iniciar Sesión</h2>
            
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Usuario o Email</label>
                    <input 
                        type="text" name="username"
                        value={formData.username} onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:border-[#E96B56]"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Contraseña</label>
                    <input 
                        type="password" name="password"
                        value={formData.password} onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:border-[#E96B56]"
                        required
                    />
                </div>
                
                <ButtonPrimary type="submit" disabled={isLoading} className="w-full justify-center">
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </ButtonPrimary>
            </form>

            <p className="mt-4 text-center text-gray-600">
                ¿No tienes cuenta? <Link to="/register" className="text-[#E96B56] font-bold">Regístrate ahora</Link>
            </p>
        </div>
    );
}

export default Login;