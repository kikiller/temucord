import React from 'react';

interface Props { name: string; avatar: string; tag: string; }

export default function UserStatusPanel({ name, avatar, tag }: Props) {
    return (
        <div className="bg-[#232428] p-2 flex items-center justify-between">
            <div className="flex items-center hover:bg-gray-700/50 p-1 rounded cursor-pointer min-w-0">
                <img src={avatar} className="w-8 h-8 rounded-full mr-2" alt="" />
                <div className="truncate"><p className="text-white text-xs font-bold truncate">{name}</p><p className="text-gray-400 text-[10px] truncate">#{tag}</p></div>
            </div>
            <div className="flex text-gray-400 space-x-1">
                <button className="p-1.5 hover:bg-gray-600 rounded">🎙️</button>
                <button className="p-1.5 hover:bg-gray-600 rounded">⚙️</button>
            </div>
        </div>
    );
}