import { useState } from 'react';
import { BookOpen, FolderGit2, LayoutGrid, Plus } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';

import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const [open, setOpen] = useState(false);
    const [serverName, setServerName] = useState('');
    const [serverImage, setServerImage] = useState<File | null>(null);

    const { servers } = usePage().props as any;

    const handleCreateServer = () => {
        router.post(
            '/servers',
            {
                name: serverName,
                image: serverImage,
            },
            {
                forceFormData: true,
                onSuccess: () => {
                    setOpen(false);
                    setServerName('');
                    setServerImage(null);
                },
                onError: (errors) => {
                    console.log(errors);
                    alert(JSON.stringify(errors));
                },
            }
        );
    };

    return (
        <>
            <Sidebar collapsible="icon" variant="inset">
                <SidebarHeader />

                <SidebarContent className="p-2">
                    <NavMain items={mainNavItems} />

                    <div className="my-3 border-t border-gray-300"></div>

                    <SidebarMenu>
                        {servers.map((server: any) => (
                            <SidebarMenuItem key={server.id}>
                                <SidebarMenuButton>
                                    <div className="flex items-center gap-2">
                                        {server.image && (
                                            <img
                                                src={`/storage/${server.image}`}
                                                alt={server.name}
                                                className="h-8 w-8 rounded-md object-cover"
                                            />
                                        )}
                                        <span>{server.name}</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}

                        <SidebarMenuItem>
                            <div className="flex justify-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-white transition hover:bg-zinc-700"
                                >
                                    <Plus size={22} />
                                </button>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter>
                    <NavFooter items={footerNavItems} className="mt-auto" />
                    <NavUser />
                </SidebarFooter>
            </Sidebar>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <div className="mt-4 space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">Crea tu servidor</h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Dale personalidad a tu nuevo servidor con un nombre y un icono.
                                Siempre tienes la opción de cambiarlo más tarde.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <label className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-400 text-sm text-gray-500">
                                {serverImage ? (
                                    <img
                                        src={URL.createObjectURL(serverImage)}
                                        alt="preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    'Upload'
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setServerImage(e.target.files[0]);
                                        }
                                    }}
                                />
                            </label>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Nombre del servidor *
                            </label>
                            <input
                                type="text"
                                value={serverName}
                                onChange={(e) => setServerName(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>

                        <div className="flex justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-full rounded-md bg-gray-200 py-2 font-medium text-black hover:bg-gray-300"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleCreateServer}
                                className="w-full rounded-md bg-violet-700 py-2 font-medium text-white hover:bg-violet-800"
                            >
                                Crear
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}