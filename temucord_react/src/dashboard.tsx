import { useEffect, useState } from 'react';

import ServerSidebar from './components/ServerSidebar';

import ChannelSidebar from './components/ChannelSidebar';

import ChatArea from './components/ChatArea';

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

    const [activeChannel, setActiveChannel] = useState<number>(0);

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
        <div className="flex h-screen bg-[#1e1f22] text-white overflow-hidden">

            {/* SERVERS */}
            <ServerSidebar
                username={user.username}
                activeServer={activeServer}
                setActiveServer={setActiveServer}
            />

            {/* CHANNELS */}
            <ChannelSidebar
                activeServer={activeServer}
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
            />

            {/* CHAT */}
            <ChatArea
                activeChannel={activeChannel}
            />

        </div>
    );
}