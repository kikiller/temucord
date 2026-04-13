import { Head, usePage } from '@inertiajs/react';

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

    if (!user) {
        return (
            <>
                <Head title="Dashboard" />
                <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
                    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-white shadow-xl sm:p-8">
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

            <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
                <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-white shadow-2xl sm:p-8">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Bienvenido a Temucord
                    </h1>

                    <div className="mt-6 grid gap-3 text-sm sm:text-base">
                        <p className="break-words">
                            <span className="font-semibold">Usuario:</span>{' '}
                            {user.username}
                        </p>
                        <p className="break-words">
                            <span className="font-semibold">Correo:</span>{' '}
                            {user.email}
                        </p>
                        <p className="break-words">
                            <span className="font-semibold">
                                Fecha de nacimiento:
                            </span>{' '}
                            {new Date(user.birth_date).toLocaleDateString(
                                'es-MX',
                            )}
                        </p>
                        <p>
                            <span className="font-semibold">Rol:</span>{' '}
                            {roleLabel}
                        </p>
                    </div>

                    <div className="mt-6 rounded-xl bg-zinc-800 p-4 text-sm text-zinc-300">
                        {user.is_global_admin
                            ? 'Has iniciado sesión como administrador global.'
                            : 'Has iniciado sesión como miembro.'}
                    </div>
                </div>
            </div>
        </>
    );
}