import { useEffect, useState } from 'react';

type Friend = {
    id: number;
    username: string;
    email: string;
};

type Props = {
    userId: number;
    activeFriendId?: number;
    onFriendClick: (friend: Friend) => void;
};

export function FriendsSidebar({ userId, activeFriendId, onFriendClick }: Props) {
    const [friends, setFriends] = useState<Friend[]>([]);

    const loadFriends = async () => {
        const response = await fetch(`/api/friends?user_id=${userId}`);
        const data = await response.json();

        setFriends(data.friends || []);
    };

    useEffect(() => {
        loadFriends();
    }, [userId]);

    return (
        <aside className="w-64 shrink-0 border-r border-zinc-800 bg-[#2b2d31] text-white">
            <div className="border-b border-zinc-800 p-4">
                <h2 className="text-lg font-bold">Amigos</h2>
                <p className="text-xs text-zinc-400">Mensajes directos</p>
            </div>

            <div className="p-3">
                {friends.length === 0 ? (
                    <p className="text-sm text-zinc-400">
                        Todavía no tienes amigos agregados.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {friends.map((friend) => (
                            <button
                                key={friend.id}
                                onClick={() => onFriendClick(friend)}
                                className={`w-full rounded-lg px-3 py-2 text-left transition ${
                                    activeFriendId === friend.id
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-zinc-300 hover:bg-[#313338]'
                                }`}
                            >
                                <p className="font-semibold">{friend.username}</p>
                                <p className="truncate text-xs text-zinc-400">
                                    {friend.email}
                                </p>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}