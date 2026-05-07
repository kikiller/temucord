import React from 'react';
import ServerIcon from '../server-icon';

export default function Sidebar({ username, isOpen }: { username: string; isOpen: boolean }) {

    const [activeServer, setActiveServer] = React.useState(1);

    const servers = [
        {
            id: 1,
            name: 'Prueba 1',
            image: 'https://placehold.co/48x48',
        },
        {
            id: 2,
            name: 'Prueba 2',
            image: 'https://placehold.co/48x48',
        },
        {
            id: 3,
            name: 'Prueba 3',
            image: 'https://placehold.co/48x48',
        },
    ];

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            localStorage.clear();
            window.location.href = '/login';
        }
    };

    return (
        <aside
            className={`
                ${isOpen ? 'w-64' : 'w-20'}
                border-r border-[#18181b]
                bg-[#09090b]
                flex flex-col
                p-4
                transition-all duration-300
                overflow-hidden
                hover:outline hover:outline-2 hover:outline-white hover:z-50
            `}
        >
            {/* HEADER */}
            <div className="flex items-center gap-2 px-2 mb-8">
                <div className="bg-[#5844a3] rounded-lg p-1 w-8 h-8 flex-shrink-0 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xs">T</span>
                </div>

                {isOpen && (
                    <span className="font-semibold text-sm text-white whitespace-nowrap">
                        Temucord
                    </span>
                )}
            </div>

            {/* NAV */}
            <nav className="flex-1">

                {/* DASHBOARD */}
                {isOpen && (
                    <p className="text-[10px] uppercase text-zinc-500 font-bold px-2 mb-2">
                        Platform
                    </p>
                )}

                <div
                    className={`
                        rounded-lg px-3 py-2 flex items-center gap-3
                        text-sm text-white border border-[#5844a3]/30 mb-6
                        ${!isOpen && 'justify-center'}
                    `}
                >
                    <span className="text-lg">📊</span>

                    {isOpen && (
                        <span className="whitespace-nowrap font-medium">
                            Dashboard
                        </span>
                    )}
                </div>

                {/* DIVISOR */}
                <div className="border-t border-zinc-800 mb-6" />

                {/* SERVERS */}
                <div
                    className={`
                        flex flex-col
                        ${isOpen ? 'items-start' : 'items-center'}
                    `}
                >
                    {servers.map((server) => (
                        <div
                            key={server.id}
                            onClick={() => setActiveServer(server.id)}
                            className={`
                                flex items-center gap-3 w-full
                                ${isOpen ? 'px-2' : 'justify-center'}
                            `}
                        >
                            <ServerIcon
                                name={server.name}
                                image={server.image}
                                isActive={activeServer === server.id}
                            />

                            {isOpen && (
                                <span className="text-white text-sm font-medium whitespace-nowrap">
                                    {server.name}
                                </span>
                            )}
                        </div>
                    ))}

                    {/* BOTON AGREGAR */}
                    <div
                        className={`
                            mt-4 w-full flex
                            ${isOpen ? 'justify-center' : 'justify-center'}
                        `}
                    >
                        <button
                            className="
                                w-14 h-14
                                rounded-full
                                bg-[#1e1f22]
                                hover:bg-green-600
                                hover:rounded-2xl
                                transition-all duration-200
                                text-zinc-300 hover:text-white
                                text-4xl font-light
                                flex items-center justify-center
                            "
                        >
                            +
                        </button>
                    </div>
                </div>
            </nav>

            {/* FOOTER */}
            <div className="mt-auto pt-4 border-t border-zinc-800 space-y-2">

                <div
                    className={`
                        flex items-center gap-3
                        px-2 text-sm text-zinc-400 py-1
                        ${!isOpen && 'justify-center'}
                    `}
                >
                    <span>📂</span>

                    {isOpen && (
                        <span className="whitespace-nowrap">
                            Repository
                        </span>
                    )}
                </div>

                {/* USER PANEL */}
                <div
                    onClick={handleLogout}
                    title="Cerrar sesión"
                    className={`
                        flex items-center justify-between
                        bg-zinc-900/50
                        hover:bg-red-900/20
                        rounded-lg p-2 mt-4
                        text-white cursor-pointer
                        transition-all
                        border border-transparent
                        hover:border-red-500/50
                        ${!isOpen && 'justify-center'}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                w-8 h-8 rounded-lg
                                bg-[#5844a3]
                                flex-shrink-0
                                flex items-center justify-center
                                text-xs font-bold uppercase
                            "
                        >
                            {username.charAt(0)}
                        </div>

                        {isOpen && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium whitespace-nowrap">
                                    {username}
                                </span>

                                <span className="text-[10px] text-zinc-500">
                                    Click para salir
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}