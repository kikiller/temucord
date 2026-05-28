import React, { useEffect, useRef, useState } from 'react';

interface Post {
    id: number;
    content: string;
    created_at: string;

    user: {
        id: number;
        username: string;
    };
}

interface Props {
    activeChannel: number;
}

export default function ChatArea({
    activeChannel,
}: Props) {

    const [posts, setPosts] = useState<Post[]>([]);

    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (!activeChannel) {
            return;
        }

        fetchPosts();

    }, [activeChannel]);

    useEffect(() => {

        scrollToBottom();

    }, [posts]);

    const scrollToBottom = () => {

        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    const fetchPosts = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `http://temucord.local/api/channels/${activeChannel}/posts`
            );

            const data = await response.json();

            setPosts(data);

        } catch (error) {

            console.error('Error obteniendo mensajes:', error);

        } finally {

            setLoading(false);
        }
    };

    const handleSendMessage = async () => {

        if (!message.trim()) {
            return;
        }

        try {

            const savedUser = localStorage.getItem('user_data');

            if (!savedUser) {
                return;
            }

            const user = JSON.parse(savedUser);

            const response = await fetch(
                `http://temucord.local/api/channels/${activeChannel}/posts`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        content: message,
                    }),
                }
            );

            const data = await response.json();

            setPosts((prev) => [...prev, data]);

            setMessage('');

        } catch (error) {

            console.error('Error enviando mensaje:', error);
        }
    };

    const formatTime = (dateString: string) => {

        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="flex-1 flex flex-col bg-[#313338]">

            {/* HEADER */}
            <div className="h-14 border-b border-black/20 flex items-center px-4 shadow-sm">

                <h1 className="text-white text-sm font-semibold">
                    # chat
                </h1>

            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-4">

                {loading && (
                    <p className="text-zinc-400 text-sm">
                        Cargando mensajes...
                    </p>
                )}

                {!loading && posts.length === 0 && (
                    <div className="h-full flex items-center justify-center">

                        <div className="text-center">

                            <h1 className="text-3xl font-bold text-white mb-3">
                                Bienvenido al canal
                            </h1>

                            <p className="text-zinc-400">
                                Este es el inicio del chat.
                            </p>

                        </div>

                    </div>
                )}

                <div className="space-y-4">

                    {posts.map((post) => (

                        <div
                            key={post.id}
                            className="flex gap-3 hover:bg-white/[0.02] px-2 py-1 rounded-md transition-all"
                        >

                            {/* AVATAR */}
                            <div className="
                                w-10 h-10 rounded-full
                                bg-[#5865f2]
                                flex items-center justify-center
                                text-white font-bold text-sm
                                flex-shrink-0
                            ">
                                {post.user.username.charAt(0).toUpperCase()}
                            </div>

                            {/* CONTENT */}
                            <div className="flex flex-col">

                                <div className="flex items-center gap-2">

                                    <span className="text-white font-medium text-sm">
                                        {post.user.username}
                                    </span>

                                    <span className="text-zinc-500 text-xs">
                                        {formatTime(post.created_at)}
                                    </span>

                                </div>

                                <p className="text-zinc-300 text-sm break-words">
                                    {post.content}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

                <div ref={messagesEndRef} />

            </div>

            {/* INPUT */}
            <div className="p-4">

                <div className="
                    h-11 rounded-lg
                    bg-[#383a40]
                    flex items-center px-4
                ">

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {

                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        placeholder="Enviar mensaje..."
                        className="
                            flex-1 bg-transparent
                            text-sm text-white
                            outline-none
                            placeholder:text-zinc-400
                        "
                    />

                    <button
                        onClick={handleSendMessage}
                        className="
                            ml-3
                            text-sm font-medium
                            text-[#5865f2]
                            hover:text-[#7983f5]
                            transition-all
                        "
                    >
                        Enviar
                    </button>

                </div>

            </div>

        </div>
    );
}