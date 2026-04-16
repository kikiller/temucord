import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import UserInfo from './components/UserInfo';
import AdminBadge from './components/AdminBadge';

type AuthUser = { 
    username: string; 
    email: string; 
    birth_date: string; 
    is_global_admin: boolean; 
};

export default function Dashboard() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user_data');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    if (!user) {
        return <div className="bg-[#09090b] h-screen flex items-center justify-center text-white text-xl font-bold">Cargando Temucord...</div>;
    }

    return (
        <div className="flex min-h-screen bg-[#09090b] font-sans text-white">
            <Sidebar username={user.username} isOpen={isSidebarOpen} />
            
            <div className="flex-1 flex flex-col">
                <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-2xl bg-[#121212] border border-[#1c1c1f] rounded-3xl p-10 shadow-2xl hover:outline hover:outline-2 hover:outline-white transition-all">
                        <h1 className="text-4xl font-bold mb-8">
                            Bienvenido a <span className="text-[#5844a3]">Temucord</span>
                        </h1>
                        
                        <div className="mt-6 space-y-2">
                            <UserInfo label="Usuario" value={user.username} />
                            <UserInfo label="Correo" value={user.email} />
                            <UserInfo label="Rol" value={user.is_global_admin ? 'Administrador' : 'Miembro'} />
                        </div>

                        <AdminBadge isAdmin={user.is_global_admin} />
                    </div>
                </main>
            </div>
        </div>
    );
}