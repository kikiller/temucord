import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ServerSidebar } from '@/components/ServerSidebar';
import { ChatArea } from '@/components/chat-area';

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

    const handleServerClick = (server: any) => {
        setActiveServer(server);
        setActiveChannel(null); 
    };

    if (!user) {
        return (
            <>
                <Head title="Dashboard" />
                <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10 bg-[#1e1f22]">
                    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#2b2d31] p-6 text-white shadow-xl sm:p-8">
                        <h1 className="text-2xl font-bold sm:text-3xl">Sesión no disponible</h1>
                        <p className="mt-3 text-sm text-zinc-300 sm:text-base">No se encontró el usuario autenticado.</p>
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
                <AppSidebar onServerClick={handleServerClick} />
                
                <div className="flex flex-1 w-full h-screen bg-[#313338] overflow-hidden text-white">
                    
                    <ServerSidebar 
                        server={activeServer} 
                        activeChannelId={activeChannel?.id}
                        onChannelClick={(channel) => setActiveChannel(channel)}
                    />

                    <main className="flex-1 flex flex-col overflow-hidden">
                        
                        {!activeServer ? (
                            <div className="flex h-full items-center justify-center px-4 py-6 sm:px-6 sm:py-10 overflow-y-auto">
                                <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#2b2d31] p-6 text-white shadow-2xl sm:p-8">
                                    <h1 className="text-2xl font-bold sm:text-3xl text-center mb-6">Bienvenido a Temucord</h1>
                                    <div className="mt-6 grid gap-3 text-sm sm:text-base bg-[#1e1f22] p-5 rounded-lg">
                                        <p className="break-words"><span className="font-semibold text-gray-400">Usuario:</span> {user.username}</p>
                                        <p className="break-words"><span className="font-semibold text-gray-400">Correo:</span> {user.email}</p>
                                        <p className="break-words"><span className="font-semibold text-gray-400">Fecha de nacimiento:</span> {new Date(user.birth_date).toLocaleDateString('es-MX')}</p>
                                        <p><span className="font-semibold text-gray-400">Rol:</span> {roleLabel}</p>
                                    </div>
                                    <div className="mt-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4 text-sm text-indigo-300 text-center font-medium">
                                        {user.is_global_admin ? 'Has iniciado sesión como administrador global.' : 'Has iniciado sesión como miembro.'}
                                    </div>
                                </div>
                            </div>
                        ) : activeChannel ? (
                            <ChatArea channel={activeChannel} />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                                <div className="text-center space-y-3">
                                    <h2 className="text-4xl font-bold text-white">¡Bienvenido a {activeServer.name}!</h2>
                                    <p className="text-lg">Selecciona un canal en el panel izquierdo para empezar a chatear.</p>
                                </div>
                            </div>
                        )}
                        
                    </main>
                </div>
            </SidebarProvider>
        </>
    );
}

Dashboard.layout = (page: any) => <>{page}</>;