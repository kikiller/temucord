import { useState } from 'react';
import { UserPlus } from 'lucide-react';

type Props = {
    userId: number;
};

type UserResult = {
    id: number;
    username: string;
    email: string;
};

export function AddFriendButton({ userId }: Props) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<UserResult[]>([]);
    const [message, setMessage] = useState('');

    const searchUsers = async (value: string) => {
        setSearch(value);
        setMessage('');

        if (value.trim().length < 2) {
            setUsers([]);
            return;
        }

        const response = await fetch(
            `/api/users/search?user_id=${userId}&search=${encodeURIComponent(value)}`
        );

        const data = await response.json();

        setUsers(data.users || []);
    };

    const sendFriendRequest = async (receiverId: number) => {
        const response = await fetch('/api/friend-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender_id: userId,
                receiver_id: receiverId,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || 'No se pudo enviar la solicitud');
            return;
        }

        setMessage('Solicitud enviada correctamente');
        setUsers([]);
        setSearch('');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2b2d31] text-zinc-200 shadow-lg transition hover:bg-[#3a3c42]"
                title="Agregar amigo"
            >
                <UserPlus size={21} />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-[380px] rounded-xl border border-zinc-700 bg-[#1e1f22] p-4 shadow-2xl">
                    <h2 className="mb-4 text-lg font-bold text-white">
                        Agregar amigo
                    </h2>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => searchUsers(e.target.value)}
                        placeholder="Buscar por nombre de usuario"
                        className="w-full rounded-lg border border-zinc-700 bg-[#313338] px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-indigo-500"
                    />

                    {message && (
                        <p className="mt-3 rounded-lg bg-[#2b2d31] p-2 text-sm text-zinc-200">
                            {message}
                        </p>
                    )}

                    <div className="mt-4 space-y-3">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between rounded-lg bg-[#2b2d31] p-3"
                            >
                                <div>
                                    <p className="font-semibold text-white">
                                        {user.username}
                                    </p>

                                    <p className="text-xs text-zinc-400">
                                        {user.email}
                                    </p>
                                </div>

                                <button
                                    onClick={() => sendFriendRequest(user.id)}
                                    className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-500"
                                >
                                    Agregar
                                </button>
                            </div>
                        ))}

                        {search.trim().length >= 2 &&
                            users.length === 0 &&
                            !message && (
                                <p className="text-sm text-zinc-400">
                                    No se encontraron usuarios.
                                </p>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}