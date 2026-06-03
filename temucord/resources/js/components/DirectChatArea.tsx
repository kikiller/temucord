import { useEffect, useState } from 'react';

type Friend = {
    id: number;
    username: string;
    email: string;
};

type DirectMessage = {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at: string;
};

type Props = {
    userId: number;
    friend: Friend;
};

export function DirectChatArea({ userId, friend }: Props) {
    const [messages, setMessages] = useState<DirectMessage[]>([]);
    const [message, setMessage] = useState('');

    const loadMessages = async () => {
        const response = await fetch(
            `/api/direct-messages?user_id=${userId}&friend_id=${friend.id}`
        );

        const data = await response.json();
        setMessages(data.messages || []);
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        await fetch('/api/direct-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender_id: userId,
                receiver_id: friend.id,
                message,
            }),
        });

        setMessage('');
        await loadMessages();
    };

    useEffect(() => {
        loadMessages();
    }, [friend.id]);

    return (
        <div className="flex h-full flex-col bg-[#313338] text-white">
            <div className="border-b border-zinc-800 bg-[#2b2d31] px-5 py-4">
                <h2 className="text-lg font-bold">{friend.username}</h2>
                <p className="text-sm text-zinc-400">{friend.email}</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-zinc-400">
                        Todavía no hay mensajes con {friend.username}.
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMine = msg.sender_id === userId;

                        return (
                            <div
                                key={msg.id}
                                className={`flex ${
                                    isMine ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                                        isMine
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-[#2b2d31] text-zinc-100'
                                    }`}
                                >
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="border-t border-zinc-800 bg-[#2b2d31] p-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') sendMessage();
                        }}
                        placeholder={`Enviar mensaje a ${friend.username}`}
                        className="flex-1 rounded-lg border border-zinc-700 bg-[#1e1f22] px-4 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-indigo-500"
                    />

                    <button
                        onClick={sendMessage}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}