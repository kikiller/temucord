import React from 'react';

interface Props { name: string; type: 'text' | 'voice'; isActive?: boolean; }

export default function ChannelButton({ name, type, isActive }: Props) {
    return (
        <div className={`flex items-center px-2 py-1 mx-2 rounded group cursor-pointer transition-colors ${isActive ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'}`}>
            <span className="mr-2 text-xl">{type === 'text' ? '#' : '🔊'}</span>
            <span className="font-medium truncate">{name}</span>
        </div>
    );
}