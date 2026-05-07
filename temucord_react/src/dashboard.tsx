import { useEffect, useState } from 'react';

import ServerSidebar from './components/ServerSidebar';

type AuthUser = {
    id: number;
    username: string;
    email: string;
    birth_date: string;
    is_global_admin: boolean;
};

export default function Dashboard() {

    const [user, setUser] = useState<AuthUser | null>(null);

    const [activeServer, setActiveServer] = useState<number>(0);

    useEffect(() => {

        const savedUser = localStorage.getItem('user_data');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

    }, []);

    if (!user) {

        return (
            <div className="bg-[#09090b] h-screen flex items-center justify-center text-white text-xl font-bold">
                Cargando Temucord...
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#09090b] text-white overflow-hidden">

            {/* SERVER SIDEBAR */}
            <ServerSidebar
                username={user.username}
                activeServer={activeServer}
                setActiveServer={setActiveServer}
            />

            {/* MAIN CONTENT */}
            <main className="flex-1 flex items-center justify-center">

                <div className="text-center">

                    <h1 className="text-5xl font-bold mb-4">
                        Temucord
                    </h1>

                    <p className="text-zinc-400 text-lg">
                        Servidor seleccionado:
                    </p>

                    <p className="text-[#5844a3] text-3xl font-bold mt-3">
                        {activeServer || 'Ninguno'}
                    </p>

                </div>

            </main>

        </div>
    );
}