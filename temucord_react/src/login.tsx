import { useState } from 'react';
import axios from 'axios';

// 1. IMPORTAMOS LAS IMÁGENES
// @ts-ignore
import fondoImagen from './assets/fondo-login.jpg'; 
// @ts-ignore
import logoRobot from './assets/logo-temucord.png'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje('Conectando...');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password
            });

            if (response.data.status === 'success') {
                localStorage.setItem('user_data', JSON.stringify(response.data.user));
                window.location.href = '/dashboard';
            }
        } catch (error: any) {
            setMensaje('Error: ' + (error.response?.data?.message || 'Credenciales incorrectas'));
        }
    };

    return (
        <div 
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center px-4"
            style={{ backgroundImage: `url(${fondoImagen})` }}
        >
            {/* Logo en la esquina superior izquierda - CORREGIDO (Sin círculo blanco) */}
            <div className="absolute top-8 left-10 z-20 flex items-center gap-2">
                <img 
                    src={logoRobot} 
                    alt="Logo Temucord" 
                    className="h-12 w-auto object-contain drop-shadow-md" 
                />
                <span className="text-2xl font-black tracking-tighter text-white drop-shadow-md">TEMUCORD</span>
            </div>

            {/* Tarjeta de Login Blanca (Maquetado oficial) */}
            <div className="relative z-10 w-full max-w-[480px] rounded-[20px] bg-white p-6 sm:p-10 shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">¡Te damos la bienvenida de nuevo!</h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-500 font-medium">¡Nos alegra verte de nuevo!</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-gray-600">
                            Correo electrónico <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 h-12 w-full rounded-lg bg-[#e3e5e8] px-4 text-gray-800 outline-none focus:ring-2 focus:ring-[#4e7a97]"
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-gray-600">
                            Contraseña <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 h-12 w-full rounded-lg bg-[#e3e5e8] px-4 text-gray-800 outline-none focus:ring-2 focus:ring-[#4e7a97]"
                            required 
                        />
                        <button type="button" className="mt-2 text-sm font-medium text-blue-500 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        className="h-12 w-full rounded-lg bg-[#4e7a97] font-bold text-white transition-all hover:bg-[#3d637a] active:scale-[0.98]"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="mt-6 text-center text-sm font-medium text-gray-500">
                    ¿Necesitas una cuenta?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">Regístrate</a>
                </div>

                {mensaje && (
                    <div className={`mt-4 rounded-md p-3 text-center text-xs font-bold ${
                        mensaje.includes('Error') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </div>
    );
}