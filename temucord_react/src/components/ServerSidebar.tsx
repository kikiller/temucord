import React, { useEffect, useRef, useState } from 'react';
import ServerIcon from '../server-icon';

interface Server {
    id: number;
    name: string;
    image: string | null;
}

interface Props {
    username: string;
    activeServer: number;
    setActiveServer: React.Dispatch<React.SetStateAction<number>>;
}

export default function ServerSidebar({
    username,
    activeServer,
    setActiveServer,
}: Props) {

    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [serverName, setServerName] = useState('');

    const [creatingServer, setCreatingServer] = useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {

        fetchServers();

    }, []);

    const fetchServers = async () => {

        try {

            const response = await fetch('http://127.0.0.1:8000/api/servers');

            const data = await response.json();

            if (data.status === 'success') {

                setServers(data.servers);

                if (data.servers.length > 0 && activeServer === 0) {

                    setActiveServer(data.servers[0].id);
                }
            }

        } catch (error) {

            console.error('Error obteniendo servidores:', error);

        } finally {

            setLoading(false);
        }
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setSelectedImage(file);

        setPreviewImage(URL.createObjectURL(file));
    };

    const resetModal = () => {

        setServerName('');

        setSelectedImage(null);

        setPreviewImage(null);

        setShowCreateModal(false);
    };

    const handleCreateServer = async () => {

        if (!serverName.trim()) {
            return;
        }

        try {

            setCreatingServer(true);

            const savedUser = localStorage.getItem('user_data');

            if (!savedUser) {
                return;
            }

            const user = JSON.parse(savedUser);

            const formData = new FormData();

            formData.append('name', serverName);

            formData.append('owner_id', user.id);

            if (selectedImage) {

                formData.append('image', selectedImage);
            }

            const response = await fetch(
                'http://127.0.0.1:8000/api/servers',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            console.log(response);

            const data = await response.json();

            console.log(data);

            if (data.status === 'success') {

                await fetchServers();

                setActiveServer(data.server.id);

                resetModal();
            }

        } catch (error) {

            console.error('Error creando servidor:', error);

        } finally {

            setCreatingServer(false);
        }
    };

    const handleLogout = () => {

        if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {

            localStorage.clear();

            window.location.href = '/login';
        }
    };

    return (
        <>
            <aside className="w-64 border-r border-[#18181b] bg-[#09090b] flex flex-col p-4">

                {/* HEADER */}
                <div className="flex items-center gap-2 px-2 mb-8">

                    <div className="bg-[#5844a3] rounded-lg p-1 w-8 h-8 flex items-center justify-center shadow-lg">

                        <span className="text-white font-bold text-xs">
                            T
                        </span>

                    </div>

                    <span className="font-semibold text-sm text-white whitespace-nowrap">
                        Temucord
                    </span>

                </div>

                {/* DASHBOARD */}
                <nav className="mb-6">

                    <p className="text-[10px] uppercase text-zinc-500 font-bold px-2 mb-2">
                        Platform
                    </p>

                    <div className="rounded-lg px-3 py-2 flex items-center gap-3 text-sm text-white border border-[#5844a3]/30">

                        <span className="text-lg">
                            📊
                        </span>

                        <span className="whitespace-nowrap font-medium">
                            Dashboard
                        </span>

                    </div>

                </nav>

                {/* SERVERS */}
                <div className="border-t border-zinc-800 pt-6 flex-1 overflow-y-auto">

                    <div className="space-y-2">

                        {loading && (
                            <p className="text-zinc-500 text-sm">
                                Cargando servidores...
                            </p>
                        )}

                        {!loading && servers.length === 0 && (
                            <p className="text-zinc-500 text-sm">
                                No tienes servidores
                            </p>
                        )}

                        {servers.map((server) => (

                            <div
                                key={server.id}
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={() => setActiveServer(server.id)}
                            >

                                <ServerIcon
                                    name={server.name}
                                    image={
                                        server.image
                                            ? `http://127.0.0.1:8000/storage/${server.image}`
                                            : undefined
                                    }
                                    isActive={activeServer === server.id}
                                />

                                <span className="text-white text-sm font-medium">
                                    {server.name}
                                </span>

                            </div>

                        ))}

                    </div>

                    {/* CREATE */}
                    <div className="flex justify-center mt-6">

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="
                                w-16 h-16 rounded-full
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

                {/* FOOTER */}
                <div className="mt-auto pt-4 border-t border-zinc-800">

                    <div
                        onClick={handleLogout}
                        title="Cerrar sesión"
                        className="
                            flex items-center gap-3
                            bg-zinc-900/50
                            hover:bg-red-900/20
                            rounded-lg p-2
                            text-white cursor-pointer
                            transition-all
                        "
                    >

                        <div className="w-8 h-8 rounded-lg bg-[#5844a3] flex items-center justify-center text-xs font-bold uppercase">

                            {username.charAt(0)}

                        </div>

                        <div className="flex flex-col">

                            <span className="text-sm font-medium">
                                {username}
                            </span>

                            <span className="text-[10px] text-zinc-500">
                                Click para salir
                            </span>

                        </div>

                    </div>

                </div>

            </aside>

            {/* MODAL */}
            {showCreateModal && (

                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                    <div className="w-full max-w-md bg-[#111214] rounded-3xl border border-zinc-800 p-6 relative">

                        {/* CLOSE */}
                        <button
                            onClick={resetModal}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white text-3xl"
                        >
                            ×
                        </button>

                        <h1 className="text-3xl font-bold text-center text-white">
                            Crea tu servidor
                        </h1>

                        <p className="text-center text-zinc-500 text-sm mt-3 leading-relaxed">
                            Dale personalidad a tu nuevo servidor con un nombre y un icono.
                        </p>

                        {/* IMAGE */}
                        <div className="flex justify-center mt-8">

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="
                                    w-32 h-32 rounded-full
                                    border-2 border-dashed border-zinc-500
                                    overflow-hidden
                                    hover:border-[#8b5cf6]
                                    transition-all
                                    flex items-center justify-center
                                    text-zinc-400
                                "
                            >

                                {previewImage ? (

                                    <img
                                        src={previewImage}
                                        className="w-full h-full object-cover"
                                    />

                                ) : (

                                    <span className="text-sm">
                                        Upload
                                    </span>

                                )}

                            </button>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </div>

                        {/* INPUT */}
                        <div className="mt-8">

                            <label className="block text-white text-sm font-semibold mb-2">
                                Nombre del servidor *
                            </label>

                            <input
                                type="text"
                                value={serverName}
                                onChange={(e) => setServerName(e.target.value)}
                                className="
                                    w-full h-14
                                    bg-[#09090b]
                                    border-2 border-[#8b5cf6]
                                    rounded-2xl
                                    px-4
                                    text-white
                                    outline-none
                                "
                            />

                        </div>

                        {/* BUTTONS */}
                        <div className="grid grid-cols-2 gap-4 mt-8">

                            <button
                                onClick={resetModal}
                                className="
                                    h-14 rounded-2xl
                                    bg-zinc-300
                                    text-black font-medium
                                "
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleCreateServer}
                                disabled={creatingServer}
                                className="
                                    h-14 rounded-2xl
                                    bg-gradient-to-b from-purple-500 to-purple-700
                                    text-white font-medium
                                    disabled:opacity-50
                                "
                            >
                                {creatingServer ? 'Creando...' : 'Crear'}
                            </button>

                        </div>

                    </div>

                </div>

            )}
        </>
    );
}