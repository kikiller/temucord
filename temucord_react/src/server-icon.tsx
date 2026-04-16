import React from 'react';

interface Props { image?: string; name: string; isActive?: boolean; }

export default function ServerIcon({ image, name, isActive }: Props) {
    return (
        <div className="relative flex items-center justify-center group mb-2">
            <div className={`absolute left-0 bg-white rounded-r-full transition-all ${isActive ? 'h-8 w-1' : 'h-2 w-1 scale-0 group-hover:scale-100'}`} />
            <div className={`flex items-center justify-center w-12 h-12 transition-all cursor-pointer ${isActive ? 'rounded-2xl bg-indigo-500 text-white' : 'rounded-3xl group-hover:rounded-2xl bg-gray-700 text-gray-400 hover:bg-indigo-500 hover:text-white'}`}>
                {image ? <img src={image} className="w-full h-full rounded-[inherit] object-cover" alt="" /> : <span>{name.charAt(0)}</span>}
            </div>
        </div>
    );
}