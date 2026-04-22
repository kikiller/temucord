import { useState } from 'react';
import axios from 'axios';

// @ts-ignore
import fondoImagen from './assets/fondo-login.jpg'; 
// @ts-ignore
import logoRobot from './assets/logo-temucord.png'; 

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        display_name: '', // Nombre para mostrar
        username: '',
        password: '',
    });

    // Estados separados para la fecha
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje('Creando cuenta...');

        // Formateamos la fecha para Laravel (YYYY-MM-DD)
        const birth_date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                ...formData,
                birth_date,
                password_confirmation: formData.password // Laravel suele pedir confirmación
            });

            if (response.data.status === 'success') {
                setMensaje('¡Cuenta creada! Redirigiendo...');
                setTimeout(() => window.location.href = '/login', 1500);
            }
        } catch (error: any) {
            setMensaje('Error: ' + (error.response?.data?.message || 'No se pudo registrar'));
        }
    };

    // Generadores para los selectores de fecha
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div 
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center px-4"
            style={{ backgroundImage: `url(${fondoImagen})` }}
        >
            {/* Logo y Nombre arriba a la izquierda */}
            <div className="absolute top-8 left-10 z-20 flex items-center gap-2">
                <img src={logoRobot} alt="Logo" className="h-12 w-auto object-contain drop-shadow-md" />
                <span className="text-2xl font-black tracking-tighter text-white drop-shadow-md">TEMUCORD</span>
            </div>

            {/* Tarjeta de Registro */}
            <div className="relative z-10 w-full max-w-[480px] rounded-[20px] bg-white p-6 sm:p-10 shadow-2xl my-10">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Crear una cuenta</h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Correo */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600">Correo electrónico *</label>
                        <input type="email" name="email" onChange={handleChange} required 
                               className="mt-2 h-10 w-full rounded-lg bg-[#e3e5e8] px-4 text-gray-800 outline-none focus:ring-2 focus:ring-[#4e7a97]" />
                    </div>

                    {/* Nombre para mostrar */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600">Nombre para mostrar</label>
                        <input type="text" name="display_name" onChange={handleChange}
                               className="mt-2 h-10 w-full rounded-lg bg-[#e3e5e8] px-4 text-gray-800 outline-none focus:ring-2 focus:ring-[#4e7a97]" />
                    </div>

                    {/* Nombre de usuario */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600">Nombre de usuario *</label>
                        <input type="text" name="username" onChange={handleChange} required 
                               className="mt-2 h-10 w-full rounded-lg bg-[#e3e5e8] px-4 text-gray-800 outline-none focus:ring-2 focus:ring-[#4e7a97]" />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600">Contraseña *</label>
                        <input type="password" name="password" onChange={handleChange} required 
                               className="mt-2 h-10 w-full rounded-lg bg-[#e3e5e8] px-4 text-gray-800 outline-none focus:ring-2 focus:ring-[#4e7a97]" />
                    </div>

                    {/* Fecha de Nacimiento (Selectores triples) */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Fecha de nacimiento *</label>
                        <div className="flex gap-3">
                            <select value={day} onChange={(e) => setDay(e.target.value)} required 
                                    className="h-10 flex-1 rounded-lg bg-[#e3e5e8] px-2 text-gray-700 outline-none focus:ring-2 focus:ring-[#4e7a97]">
                                <option value="" disabled>Día</option>
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>

                            <select value={month} onChange={(e) => setMonth(e.target.value)} required 
                                    className="h-10 flex-[1.5] rounded-lg bg-[#e3e5e8] px-2 text-gray-700 outline-none focus:ring-2 focus:ring-[#4e7a97]">
                                <option value="" disabled>Mes</option>
                                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                            </select>

                            <select value={year} onChange={(e) => setYear(e.target.value)} required 
                                    className="h-10 flex-1 rounded-lg bg-[#e3e5e8] px-2 text-gray-700 outline-none focus:ring-2 focus:ring-[#4e7a97]">
                                <option value="" disabled>Año</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>

                    <button type="submit" 
                            className="mt-4 h-11 w-full rounded-lg bg-[#4e7a97] font-bold text-white transition-all hover:bg-[#3d637a] active:scale-[0.98]">
                        Crear una cuenta
                    </button>
                </form>

                <div className="mt-4 text-sm font-medium text-gray-500">
                    ¿Ya tienes una cuenta?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">Inicia sesión</a>
                </div>

                {mensaje && (
                    <div className={`mt-4 rounded-md p-2 text-center text-xs font-bold ${
                        mensaje.includes('Error') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </div>
    );
}