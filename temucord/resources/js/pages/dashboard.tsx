import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ServerSidebar } from '@/components/ServerSidebar';
import { ChatArea } from '@/components/chat-area';
import { NotificationsPanel } from '@/components/notifications/NotificationsPanel';
import { AddFriendButton } from '@/components/friends/AddFriendButton';
import { DirectChatArea } from '@/components/DirectChatArea';

type AuthUser = {
    id: number;
    username: string;
    email: string;
    birth_date: string;
    is_global_admin: boolean;
    blocked_at: string | null;
};

type PageProps = {
    auth: {
        user: AuthUser | null;
    };
};

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    const [activeServer, setActiveServer] = useState<any>(null);
    const [activeChannel, setActiveChannel] = useState<any>(null);
    const [activeFriend, setActiveFriend] = useState<any>(null);

    const handleServerClick = (server: any) => {
        setActiveServer(server);
        setActiveChannel(null);
        setActiveFriend(null);
    };

    if (!user) {
        return (
            <>
                <Head title="Dashboard" />
                <div className="flex min-h-screen items-center justify-center bg-[#1e1f22] px-4 py-6 sm:px-6 sm:py-10">
                    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#2b2d31] p-6 text-white shadow-xl sm:p-8">
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Sesión no disponible
                        </h1>
                        <p className="mt-3 text-sm text-zinc-300 sm:text-base">
                            No se encontró el usuario autenticado.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    const roleLabel = user.is_global_admin ? 'Administrador' : 'Miembro';

    return (
        <>
            <Head title="Dashboard" />

            <SidebarProvider>
                <AppSidebar
                    onServerClick={handleServerClick}
                    onFriendClick={(friend) => {
                        setActiveServer(null);
                        setActiveChannel(null);
                        setActiveFriend(friend);
                    }}
                    userId={user.id}
                />

                <div className="relative flex h-screen w-full flex-1 overflow-hidden bg-[#313338] text-white">
                    <main className="flex flex-1 flex-col overflow-hidden">
                        <div className="absolute right-4 top-4 z-[9999] flex items-center gap-3">
                            <AddFriendButton userId={user.id} />
                            <NotificationsPanel userId={user.id} />
                        </div>

                        {!activeServer && !activeFriend ? (
                            <div className="flex h-full items-center justify-center overflow-y-auto px-4 py-6 sm:px-6 sm:py-10">
                                <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#2b2d31] p-6 text-white shadow-2xl sm:p-8">
                                    <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
                                        Bienvenido a Temucord
                                    </h1>

                                    <div className="mt-6 grid gap-3 rounded-lg bg-[#1e1f22] p-5 text-sm sm:text-base">
                                        <p className="break-words">
                                            <span className="font-semibold text-gray-400">
                                                Usuario:
                                            </span>{' '}
                                            {user.username}
                                        </p>

                                        <p className="break-words">
                                            <span className="font-semibold text-gray-400">
                                                Correo:
                                            </span>{' '}
                                            {user.email}
                                        </p>

                                        <p className="break-words">
                                            <span className="font-semibold text-gray-400">
                                                Fecha de nacimiento:
                                            </span>{' '}
                                            {new Date(user.birth_date).toLocaleDateString('es-MX')}
                                        </p>

                                        <p>
                                            <span className="font-semibold text-gray-400">
                                                Rol:
                                            </span>{' '}
                                            {roleLabel}
                                        </p>
                                    </div>

                                    <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center text-sm font-medium text-indigo-300">
                                        {user.is_global_admin
                                            ? 'Has iniciado sesión como administrador global.'
                                            : 'Has iniciado sesión como miembro.'}
                                    </div>
                                </div>
                            </div>
                        ) : activeFriend ? (
                            <DirectChatArea userId={user.id} friend={activeFriend} />
                        ) : activeChannel ? (
                            <ChatArea channel={activeChannel} />
                        ) : (
                            <>
                                <ServerSidebar
                                    server={activeServer}
                                    activeChannelId={activeChannel?.id}
                                    onChannelClick={(channel) => {
                                        setActiveChannel(channel);
                                        setActiveFriend(null);
                                    }}
                                />

                                <div className="flex h-full flex-col items-center justify-center text-zinc-400">
                                    <div className="space-y-3 text-center">
                                        <h2 className="text-4xl font-bold text-white">
                                            ¡Bienvenido a {activeServer.name}!
                                        </h2>
                                        <p className="text-lg">
                                            Selecciona un canal en el panel izquierdo para empezar a chatear.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </SidebarProvider>
        </>
    );
}

Dashboard.layout = (page: any) => <>{page}</>;