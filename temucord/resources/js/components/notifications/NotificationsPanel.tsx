import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { FriendRequestsList } from './FriendRequestsList';

type Props = {
    userId: number;
};

type Notification = {
    type: string;
    message: string;
    count: number;
};

export function NotificationsPanel({ userId }: Props) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);
    const [showRequests, setShowRequests] = useState(false);

    const loadNotifications = async () => {
        const response = await fetch(`/api/notifications?user_id=${userId}`);
        const data = await response.json();

        setNotifications(data.notifications || []);
    };

    useEffect(() => {
        loadNotifications();
    }, [userId]);

    const totalNotifications = notifications.reduce(
        (total, notification) => total + notification.count,
        0
    );

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#2b2d31] text-zinc-200 shadow-lg transition hover:bg-[#3a3c42]"
            >
                <Bell size={21} />

                {totalNotifications > 0 && (
                    <span className="absolute right-2 top-2 h-3 w-3 rounded-full bg-red-500 ring-2 ring-[#313338]" />
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-[360px] rounded-xl border border-zinc-700 bg-[#1e1f22] p-4 shadow-2xl">
                    <h2 className="mb-4 text-lg font-bold text-white">
                        Notificaciones
                    </h2>

                    <div className="space-y-3">
                        {notifications.length === 0 || totalNotifications === 0 ? (
                            <p className="text-sm text-zinc-400">
                                No tienes notificaciones.
                            </p>
                        ) : (
                            notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg bg-[#2b2d31] p-3 text-sm text-zinc-200"
                                >
                                    {notification.message}
                                </div>
                            ))
                        )}
                    </div>

                    <button
                        onClick={() => setShowRequests(!showRequests)}
                        className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        Ver solicitudes de amistad
                    </button>

                    {showRequests && (
                        <FriendRequestsList
                            userId={userId}
                            onChange={loadNotifications}
                        />
                    )}
                </div>
            )}
        </div>
    );
}