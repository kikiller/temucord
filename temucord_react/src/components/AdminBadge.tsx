export default function AdminBadge({ isAdmin }: { isAdmin: boolean }) {
    return (
        <div className="mt-6 rounded-xl bg-zinc-800 p-4 text-sm text-zinc-300 border border-zinc-700 hover:outline hover:outline-2 hover:outline-white transition-all">
            {isAdmin ? '👑 Has iniciado sesión como administrador global.' : '👤 Has iniciado sesión como miembro.'}
        </div>
    );
}