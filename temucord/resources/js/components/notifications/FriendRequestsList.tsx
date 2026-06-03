import { useEffect, useState } from 'react';

type Props = {
    userId: number;
    onChange: () => void;
};

type FriendRequest = {
    id: number;
    sender: {
        id: number;
        username: string;
        email: string;
    };
};

export function FriendRequestsList({ userId, onChange }: Props) {
    const [requests, setRequests] = useState<FriendRequest[]>([]);

    const loadRequests = async () => {
        const response = await fetch(`/api/friend-requests?user_id=${userId}`);
        const data = await response.json();

        setRequests(data.requests || []);
    };

    const acceptRequest = async (id: number) => {
        await fetch(`/api/friend-requests/${id}/accept`, {
            method: 'POST',
        });

        await loadRequests();
        onChange();
    };

    const rejectRequest = async (id: number) => {
        await fetch(`/api/friend-requests/${id}/reject`, {
            method: 'POST',
        });

        await loadRequests();
        onChange();
    };

    useEffect(() => {
        loadRequests();
    }, [userId]);

    return (
        <div className="mt-4 space-y-3">
            {requests.length === 0 ? (
                <p className="text-sm text-zinc-400">
                    No tienes solicitudes pendientes.
                </p>
            ) : (
                requests.map((request) => (
                    <div
                        key={request.id}
                        className="rounded-lg border border-zinc-700 bg-[#313338] p-4"
                    >
                        <p className="font-semibold text-white">
                            {request.sender.username}
                        </p>

                        <p className="text-sm text-zinc-400">
                            {request.sender.email}
                        </p>

                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={() => acceptRequest(request.id)}
                                className="rounded-md bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-500"
                            >
                                Aceptar
                            </button>

                            <button
                                onClick={() => rejectRequest(request.id)}
                                className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-500"
                            >
                                Rechazar
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}