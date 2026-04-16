export default function UserInfo({ label, value }: { label: string; value: string }) {
    return (
        <p className="break-words p-2 rounded-lg hover:outline hover:outline-1 hover:outline-white/40 transition-all">
            <span className="font-semibold text-zinc-400">{label}:</span>{' '}
            <span className="text-white">{value}</span>
        </p>
    );
}