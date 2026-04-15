import React from 'react';

export default function MessageInput({ channelName }: { channelName: string }) {
    return (
        <div className="px-4 py-2 bg-gray-800 w-full">
            <div className="flex items-center bg-[#383a40] rounded-lg px-4 py-2">
                <button className="text-gray-400 hover:text-white mr-4 text-xl">+</button>
                <input type="text" placeholder={`Enviar mensaje a #${channelName}`} className="bg-transparent w-full focus:outline-none text-gray-200" />
                <button className="ml-2 text-xl">😊</button>
            </div>
        </div>
    );
}