import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useAPI } from '../hooks/useAPI';
import ButtonPrimary from '../components/ButtonPrimary';

function Register() {
    const [formData, handleChange] = useForm({ username: '', email: '', password: '' });
    const { postAuth, isLoading, error } = useAPI();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await postAuth('auth/register', formData);
            if (data?.ok) {
                alert('Usuario registrado correctamente. Ahora inicia sesión.');
                navigate('/login');
            }
        } catch (err) {
            console.error("Error en register", err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold text-[#444444] mb-6 text-center">Crear Cuenta</h2>
            
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Usuario</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Contraseña</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                
                <ButtonPrimary type="submit" disabled={isLoading} className="w-full justify-center">
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                </ButtonPrimary>
            </form>

            <p className="mt-4 text-center text-gray-600">
                ¿Ya tienes cuenta? <Link to="/login" className="text-[#E96B56] font-bold">Inicia sesión</Link>
            </p>
        </div>
    );
}

export default Register;