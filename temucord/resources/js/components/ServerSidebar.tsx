import { ChevronDown, Hash, Calendar, Gem, Lock } from 'lucide-react';
import { Canales } from '@/components/Canales';

export function ServerSidebar({ 
    server, 
    activeChannelId, 
    onChannelClick 
}: { 
    server: any; 
    activeChannelId?: number | null;
    onChannelClick?: (channel: any) => void;
}) {
    if (!server) return null;

    return (
        <div className="flex h-screen w-60 shrink-0 flex-col bg-[#2b2d31] text-gray-300">
            <div className="flex h-12 cursor-pointer items-center justify-between border-b border-[#1e1f22] px-4 shadow-sm hover:bg-[#35373c] transition">
                <h1 className="truncate font-bold text-white">{server.name}</h1>
                <ChevronDown size={18} />
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-4 custom-scrollbar">
                <div className="space-y-0.5">
                    <button className="flex w-full items-center gap-3 rounded px-2 py-1.5 transition hover:bg-[#35373c]">
                        <Calendar size={20} className="text-gray-400" />
                        <span className="font-medium text-gray-300">Eventos</span>
                    </button>
                    <button className="flex w-full items-center gap-3 rounded px-2 py-1.5 transition hover:bg-[#35373c]">
                        <Gem size={20} className="text-gray-400" />
                        <span className="font-medium text-gray-300">Mejoras del servidor</span>
                    </button>
                </div>

                <div className="mx-2 h-[1px] bg-[#3f4147]"></div>

                <div>
                    <div className="flex items-center justify-between px-1 mb-1 group">
                        <div className="flex cursor-pointer items-center gap-1 text-gray-400 hover:text-gray-300 transition">
                            <ChevronDown size={12} />
                            <span className="text-xs font-bold uppercase tracking-wider">Canales</span>
                        </div>
                        <Canales serverId={server.id} />
                    </div>
                    
                    <div className="space-y-0.5 mt-2">
                        {server.channels && server.channels.length > 0 ? (
                            server.channels.map((channel: any) => (
                                <button 
                                    key={channel.id} 
                                    onClick={() => onChannelClick && onChannelClick(channel)}
                                    className={`group flex w-full items-center justify-between rounded px-2 py-1.5 transition ${
                                        activeChannelId === channel.id 
                                            ? 'bg-[#404249] text-white' 
                                            : 'text-gray-400 hover:bg-[#35373c] hover:text-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {channel.type === 'closed' ? (
                                            <Lock size={20} className={`${activeChannelId === channel.id ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`} />
                                        ) : (
                                            <Hash size={20} className={`${activeChannelId === channel.id ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`} />
                                        )}
                                        <span className="font-medium truncate">{channel.name}</span>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="px-2 py-3 text-xs text-center text-gray-500 font-medium border border-dashed border-[#3f4147] rounded mt-2">
                                Aún no hay canales.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}