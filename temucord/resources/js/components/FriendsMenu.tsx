import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

type Friend = {
    id: number;
    username: string;
    email: string;
};

type Props = {
    userId: number;
    onFriendClick?: (friend: Friend) => void;
};

export function FriendsMenu({ userId, onFriendClick }: Props) {
    const [friendsOpen, setFriendsOpen] = useState(false);
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
        <div className="mt-3">
            <button
                onClick={() => setFriendsOpen(!friendsOpen)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-zinc-300 transition hover:bg-[#313338]"
            >
                <Users size={18} />
                <span>Amigos</span>
            </button>

            {friendsOpen && (
                <div className="ml-2 mt-2 space-y-1">
                    {friends.length === 0 ? (
                        <p className="px-2 text-xs text-zinc-500">
                            No tienes amigos
                        </p>
                    ) : (
                        friends.map((friend) => (
                            <button
                                key={friend.id}
                                onClick={() =>
                                    onFriendClick &&
                                    onFriendClick(friend)
                                }
                                className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-[#313338]"
                            >
                                <div className="font-semibold">
                                    {friend.username}
                                </div>

                                <div className="truncate text-xs text-zinc-500">
                                    {friend.email}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}