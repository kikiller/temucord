import React, { useEffect, useState } from 'react';

interface Channel {
    id: number;
    name: string;
}

interface Props {
    activeServer: number;
    activeChannel: number;
    setActiveChannel: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChannelSidebar({
    activeServer,
    activeChannel,
    setActiveChannel,
}: Props) {

    const [channels, setChannels] = useState<Channel[]>([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [channelName, setChannelName] = useState('');

    const [creatingChannel, setCreatingChannel] = useState(false);

    useEffect(() => {

        if (!activeServer) {
            return;
        }

        fetchChannels();

    }, [activeServer]);

    const fetchChannels = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `http://temucord.local/api/servers/${activeServer}/channels`
            );

            const data = await response.json();

            if (data.status === 'success') {

                setChannels(data.channels);

                if (data.channels.length > 0) {

                    setActiveChannel(data.channels[0].id);
                }
            }

        } catch (error) {

            console.error('Error obteniendo canales:', error);

        } finally {

            setLoading(false);
        }
    };

    const handleCreateChannel = async () => {

        if (!channelName.trim()) {
            return;
        }

        try {

            setCreatingChannel(true);

            const savedUser = localStorage.getItem('user_data');

            if (!savedUser) {
                return;
            }

            const user = JSON.parse(savedUser);

            const response = await fetch(
                'http://temucord.local/api/channels',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        server_id: activeServer,
                        created_by: user.id,
                        name: channelName,
                    }),
                }
            );

            const data = await response.json();

            if (data.status === 'success') {

                setShowModal(false);

                setChannelName('');

                await fetchChannels();

                setActiveChannel(data.channel.id);
            }

        } catch (error) {

            console.error('Error creando canal:', error);

        } finally {

            setCreatingChannel(false);
        }
    };

    return (
        <>
            <aside className="w-60 bg-[#2b2d31] flex flex-col border-r border-black/20">

                {/* HEADER */}
                <div className="h-14 border-b border-black/20 flex items-center px-4 shadow-sm">

                    <h1 className="text-white text-sm font-bold truncate">
                        Temucord
                    </h1>

                </div>

                {/* CHANNELS */}
                <div className="flex-1 p-3 overflow-y-auto">

                    <div className="flex items-center justify-between mb-3 px-1">

                        <span className="text-[11px] tracking-wide text-zinc-400 font-bold">
                            CANALES
                        </span>

                        <button
                            onClick={() => setShowModal(true)}
                            className="
                                text-zinc-400
                                hover:text-white
                                text-xl
                                transition-all
                            "
                        >
                            +
                        </button>

                    </div>

                    {loading && (
                        <p className="text-zinc-500 text-sm">
                            Cargando canales...
                        </p>
                    )}

                    {!loading && channels.length === 0 && (
                        <p className="text-zinc-500 text-sm">
                            No hay canales
                        </p>
                    )}

                    <div className="space-y-1">

                        {channels.map((channel) => (

                            <button
                                key={channel.id}
                                onClick={() => setActiveChannel(channel.id)}
                                className={`
                                    w-full h-10 rounded-md px-3
                                    flex items-center gap-2
                                    transition-all
                                    text-left
                                    ${activeChannel === channel.id
                                        ? 'bg-[#404249] text-white'
                                        : 'hover:bg-[#35373c] text-zinc-400'
                                    }
                                `}
                            >

                                <span className="text-xl font-bold">
                                    #
                                </span>

                                <span className="text-sm font-medium truncate">
                                    {channel.name}
                                </span>

                            </button>

                        ))}

                    </div>

                </div>

            </aside>

            {/* MODAL */}
            {showModal && (

                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                    <div className="w-full max-w-md bg-[#313338] rounded-xl overflow-hidden shadow-2xl">

                        {/* HEADER */}
                        <div className="relative px-6 pt-6 pb-4 text-center">

                            <button
                                onClick={() => setShowModal(false)}
                                className="
                        absolute top-4 right-4
                        text-zinc-400 hover:text-white
                        text-2xl leading-none
                    "
                            >
                                ×
                            </button>

                            <h1 className="text-3xl font-bold text-white">
                                Crear un canal
                            </h1>

                            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                                Organiza tu servidor creando canales para diferentes temas.
                            </p>

                        </div>

                        {/* BODY */}
                        <div className="px-6 pb-6">

                            {/* NAME */}
                            <div className="mb-5">

                                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">
                                    Nombre del canal *
                                </label>

                                <div className="
                        h-12
                        bg-[#1e1f22]
                        border-2 border-[#5865f2]
                        rounded-xl
                        flex items-center px-4
                    ">

                                    <span className="text-zinc-500 text-xl mr-2">
                                        #
                                    </span>

                                    <input
                                        type="text"
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                        placeholder="nuevo-canal"
                                        className="
                                bg-transparent
                                flex-1
                                text-base
                                text-white
                                outline-none
                                placeholder:text-zinc-500
                            "
                                    />

                                </div>

                            </div>

                            {/* TYPE */}
                            <div className="mb-5">

                                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">
                                    Tipo de canal
                                </label>

                                <select
                                    className="
                            w-full h-12
                            bg-[#1e1f22]
                            rounded-xl
                            px-4
                            text-sm
                            text-white
                            outline-none
                        "
                                >
                                    <option value="open">
                                        Abierto (Público)
                                    </option>

                                    <option value="closed">
                                        Cerrado (Privado)
                                    </option>

                                </select>

                            </div>

                            {/* DESCRIPTION */}
                            <div className="mb-6">

                                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">
                                    Descripción (Opcional)
                                </label>

                                <textarea
                                    placeholder="Propósito de este canal..."
                                    className="
                            w-full h-24
                            bg-[#1e1f22]
                            rounded-xl
                            p-4
                            text-sm
                            text-white
                            outline-none
                            resize-none
                            placeholder:text-zinc-500
                        "
                                />

                            </div>

                            {/* FOOTER */}
                            <div className="border-t border-black/30 pt-5 flex justify-end gap-3">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="
                            h-10 px-5
                            text-sm
                            text-white
                            hover:underline
                        "
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={handleCreateChannel}
                                    disabled={creatingChannel}
                                    className="
                            h-10 px-5
                            rounded-lg
                            bg-[#5865f2]
                            hover:bg-[#4752c4]
                            text-white
                            text-sm
                            font-medium
                            disabled:opacity-50
                        "
                                >
                                    {creatingChannel
                                        ? 'Creando...'
                                        : 'Crear Canal'}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}
        </>
    );
}