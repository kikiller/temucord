export default function PrimaryButton({ label, icon, onClick }: { label: string; icon?: string; onClick?: () => void }) {
    return (
        <button 
            onClick={onClick}
            className="flex items-center gap-2 bg-[#5844a3] hover:bg-[#463583] text-white text-sm font-bold py-2 px-4 rounded-lg transition-all active:scale-95 shadow-lg hover:outline hover:outline-2 hover:outline-white"
        >
            {icon && <span className="text-base">{icon}</span>}
            {label}
        </button>
    );
}