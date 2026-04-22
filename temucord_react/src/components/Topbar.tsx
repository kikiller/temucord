import PrimaryButton from './PrimaryButton';

export default function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
        <header className="h-14 border-b border-[#18181b] bg-[#09090b] flex items-center justify-between px-4 hover:outline hover:outline-2 hover:outline-white hover:z-50 transition-all">
            <button 
                onClick={toggleSidebar}
                className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 transition-colors active:scale-90"
                title="Contraer/Expandir"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            </button>
            
            <PrimaryButton label="Añadir amigo" icon="👤+" onClick={() => alert('Abriendo menú de amigos...')} />
        </header>
    );
}