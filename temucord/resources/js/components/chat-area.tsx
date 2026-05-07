import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Hash, Lock, Send } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export function ChatArea({ channel }: { channel: any }) {

    const { auth } = usePage().props as any;

    const [posts, setPosts] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!channel) return;

        setLoading(true);

        axios.get(`/channels/${channel.id}/posts`)
            .then(res => {

                setPosts(res.data);

                setLoading(false);
            })
            .catch(err => {

                console.error('Error cargando mensajes:', err);

                if (err.response) {
                    console.log(err.response.data);
                }

                setLoading(false);
            });

    }, [channel]);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });

    }, [posts]);

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        if (!content.trim()) return;

        const messageToSend = content;

        setContent('');

        axios.post(`/channels/${channel.id}/posts`, {
            content: messageToSend,
            user_id: auth.user.id
        })
        .then(res => {

            setPosts(prev => [...prev, res.data]);

        })
        .catch(err => {

            console.error('Error enviando mensaje:', err);

            if (err.response) {

                console.log('Respuesta Laravel:', err.response.data);

                alert(JSON.stringify(err.response.data, null, 2));
            }
            else {

                alert('No hubo respuesta del servidor');
            }

            setContent(messageToSend);
        });
    };

    if (!channel) return null;

    return (

        <div className="flex flex-col h-full bg-[#313338] text-gray-200">

            <div className="flex h-12 items-center border-b border-[#1e1f22] px-4 shadow-sm shrink-0">

                <div className="flex items-center gap-2">

                    {channel.type === 'closed' ? (

                        <Lock
                            size={20}
                            className="text-gray-400"
                        />

                    ) : (

                        <Hash
                            size={20}
                            className="text-gray-400"
                        />
                    )}

                    <h2 className="font-bold text-white">
                        {channel.name}
                    </h2>

                    {channel.description && (
                        <>

                            <div className="h-4 w-[1px] bg-gray-600 mx-2"></div>

                            <span className="text-sm text-gray-400 truncate">
                                {channel.description}
                            </span>

                        </>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">

                {loading ? (

                    <div className="text-center text-gray-400 mt-4">
                        Cargando mensajes...
                    </div>

                ) : posts.length === 0 ? (

                    <div className="flex flex-col items-start justify-end h-full text-gray-400 pb-4">

                        <div className="h-16 w-16 bg-[#404249] rounded-full flex items-center justify-center mb-4">

                            <Hash
                                size={40}
                                className="text-white"
                            />

                        </div>

                        <h3 className="text-3xl font-bold text-white mb-2">
                            ¡Te damos la bienvenida a #{channel.name}!
                        </h3>

                        <p>
                            Este es el comienzo del canal.
                        </p>

                    </div>

                ) : (

                    posts.map((post: any) => (

                        <div
                            key={post.id}
                            className="flex gap-4 hover:bg-[#2e3035] p-2 -mx-2 rounded transition"
                        >

                            <div className="h-10 w-10 shrink-0 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-white uppercase mt-0.5">

                                {post.user?.username
                                    ? post.user.username.charAt(0)
                                    : '?'}

                            </div>

                            <div className="flex flex-col">

                                <div className="flex items-baseline gap-2">

                                    <span className="font-semibold text-white hover:underline cursor-pointer">

                                        {post.user?.username || 'Usuario'}

                                    </span>

                                    <span className="text-xs text-gray-400">

                                        {new Date(post.created_at).toLocaleDateString()}

                                        {' '}

                                        {new Date(post.created_at).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}

                                    </span>
                                </div>

                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">

                                    {post.content}

                                </p>
                            </div>
                        </div>
                    ))
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 shrink-0">

                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center bg-[#383a40] rounded-lg"
                >

                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`Enviar mensaje a #${channel.name}`}
                        className="w-full bg-transparent border-none text-gray-200 px-4 py-3 outline-none focus:ring-0 placeholder-gray-500"
                        autoComplete="off"
                    />

                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className="absolute right-3 p-1.5 text-gray-400 hover:text-indigo-400 disabled:opacity-50 disabled:hover:text-gray-400 transition"
                    >

                        <Send size={20} />

                    </button>
                </form>
            </div>
        </div>
    );
}