import React from 'react';

interface Props { name: string; avatar: string; status: 'online' | 'offline'; }

export default function MemberListItem({ name, avatar, status }: Props) {
    return (
        <div className="flex items-center px-2 py-1.5 mx-2 rounded hover:bg-gray-700/50 cursor-pointer group">
            <div className="relative mr-3">
                <img src={avatar} className="w-8 h-8 rounded-full" alt="" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#2b2d31] ${status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
            </div>
            <span className="text-gray-400 group-hover:text-gray-200 font-medium">{name}</span>
        </div>
    );
}