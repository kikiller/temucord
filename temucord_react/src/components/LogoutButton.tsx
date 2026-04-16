export default function LogoutButton() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <button 
            onClick={handleLogout}
            className="mt-6 text-sm text-zinc-500 hover:text-white hover:outline hover:outline-1 hover:outline-white p-2 rounded transition-all"
        >
            Cerrar sesión
        </button>
    );
}