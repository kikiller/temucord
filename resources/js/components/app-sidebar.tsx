import { Link, useForm, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Plus } from 'lucide-react';
import { useState } from 'react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

type ServerItem = {
    id: number;
    name: string;
    description: string | null;
    channels_count: number;
};

type SharedProps = {
    userServers: ServerItem[];
    flash?: {
        success?: string;
    };
};

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
    const { userServers = [], flash } = usePage<SharedProps>().props;
    const [open, setOpen] = useState(false);

    const form = useForm({
        name: '',
        description: '',
        channel_name: 'general',
        channel_type: 'open',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        form.post('/servers', {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                form.reset();
                form.setData('channel_name', 'general');
                form.setData('channel_type', 'open');
            },
        });
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                <SidebarGroup className="px-2 py-2">
                    <SidebarGroupLabel>Servidores</SidebarGroupLabel>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <SidebarGroupAction
                                aria-label="Crear servidor"
                                title="Crear servidor"
                            >
                                <Plus />
                            </SidebarGroupAction>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Crear servidor</DialogTitle>
                                <DialogDescription>
                                    Crea un servidor nuevo y su canal inicial.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nombre del servidor</Label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData('name', e.target.value)
                                        }
                                        placeholder="Mi servidor"
                                    />
                                    {form.errors.name && (
                                        <p className="text-sm text-red-500">
                                            {form.errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Input
                                        id="description"
                                        value={form.data.description}
                                        onChange={(e) =>
                                            form.setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Servidor para mi equipo"
                                    />
                                    {form.errors.description && (
                                        <p className="text-sm text-red-500">
                                            {form.errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="channel_name">
                                        Nombre del canal inicial
                                    </Label>
                                    <Input
                                        id="channel_name"
                                        value={form.data.channel_name}
                                        onChange={(e) =>
                                            form.setData(
                                                'channel_name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="general"
                                    />
                                    {form.errors.channel_name && (
                                        <p className="text-sm text-red-500">
                                            {form.errors.channel_name}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="channel_type">
                                        Tipo del canal inicial
                                    </Label>
                                    <select
                                        id="channel_type"
                                        value={form.data.channel_type}
                                        onChange={(e) =>
                                            form.setData(
                                                'channel_type',
                                                e.target.value as
                                                    | 'open'
                                                    | 'closed',
                                            )
                                        }
                                        className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        <option value="open">Abierto</option>
                                        <option value="closed">Cerrado</option>
                                    </select>
                                    {form.errors.channel_type && (
                                        <p className="text-sm text-red-500">
                                            {form.errors.channel_type}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={form.processing}
                                >
                                    {form.processing
                                        ? 'Creando servidor...'
                                        : 'Crear servidor'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <SidebarGroupContent>
                        {flash?.success && (
                            <p className="px-2 pb-2 text-xs text-emerald-600">
                                {flash.success}
                            </p>
                        )}

                        {userServers.length > 0 ? (
                            <SidebarMenu>
                                {userServers.map((server) => (
                                    <SidebarMenuItem key={server.id}>
                                        <SidebarMenuButton
                                            type="button"
                                            tooltip={{ children: server.name }}
                                            className="gap-3"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                                                {server.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                                                <span className="truncate text-sm font-medium">
                                                    {server.name}
                                                </span>
                                                <span className="truncate text-xs text-sidebar-foreground/70">
                                                    {server.channels_count}{' '}
                                                    {server.channels_count === 1
                                                        ? 'canal'
                                                        : 'canales'}
                                                </span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        ) : (
                            <p className="px-2 text-xs text-sidebar-foreground/70">
                                Aún no tienes servidores.
                            </p>
                        )}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}