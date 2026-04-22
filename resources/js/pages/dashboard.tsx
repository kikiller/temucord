import { Head, usePage } from '@inertiajs/react';
import { Layers3, Server as ServerIcon, Users } from 'lucide-react';
import { dashboard } from '@/routes';

type ServerItem = {
    id: number;
    name: string;
    description: string | null;
    channels_count: number;
};

type SharedProps = {
    userServers: ServerItem[];
    flash?: {
        success?: string;
    };
};

export default function Dashboard() {
    const { userServers = [], flash } = usePage<SharedProps>().props;

    const totalServers = userServers.length;
    const totalChannels = userServers.reduce(
        (total, server) => total + server.channels_count,
        0,
    );

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {flash?.success && (
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {flash.success}
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <ServerIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Servidores
                                </p>
                                <p className="text-2xl font-bold">
                                    {totalServers}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <Layers3 className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Canales creados
                                </p>
                                <p className="text-2xl font-bold">
                                    {totalChannels}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Estado
                                </p>
                                <p className="text-lg font-semibold">
                                    Issue #12 en progreso
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Mis servidores
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Lista de servidores creados por el usuario.
                            </p>
                        </div>
                    </div>

                    {userServers.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {userServers.map((server) => (
                                <div
                                    key={server.id}
                                    className="rounded-2xl border border-sidebar-border/70 bg-background p-4 transition hover:border-primary/40 dark:border-sidebar-border"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
                                            {server.name.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-base font-semibold">
                                                {server.name}
                                            </h3>

                                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                {server.description ||
                                                    'Sin descripción'}
                                            </p>

                                            <p className="mt-3 text-xs font-medium text-muted-foreground">
                                                {server.channels_count}{' '}
                                                {server.channels_count === 1
                                                    ? 'canal'
                                                    : 'canales'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-sidebar-border p-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                Aún no has creado servidores.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};