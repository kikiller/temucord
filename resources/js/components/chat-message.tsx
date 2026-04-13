import React from 'react';

interface Props { user: { name: string; avatar: string }; text: string; timestamp: string; isGrouped?: boolean; }

export default function ChatMessage({ user, text, timestamp, isGrouped }: Props) {
    return (
        <div className={`flex items-start px-4 hover:bg-gray-700/30 ${isGrouped ? 'py-0.5' : 'py-3 mt-4'}`}>
            <div className="w-10 mr-4 flex-shrink-0">{!isGrouped && <img src={user.avatar} className="w-10 h-10 rounded-full" alt="" />}</div>
            <div>
                {!isGrouped && <div className="flex items-baseline"><h3 className="font-medium text-white mr-2">{user.name}</h3><span className="text-[10px] text-gray-400">{timestamp}</span></div>}
                <p className="text-gray-300">{text}</p>
            </div>
        </div>
    );
}