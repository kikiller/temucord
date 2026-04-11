import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.18),_transparent_35%)]" />

        <div className="relative z-10 w-full max-w-md">
            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur sm:p-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Link
                        href={home()}
                        className="flex flex-col items-center gap-2 font-medium"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                            <AppLogoIcon className="size-8 fill-current text-white" />
                        </div>
                        <span className="sr-only">{title}</span>
                    </Link>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                            {title}
                        </h1>
                        <p className="text-sm text-zinc-400 sm:text-base">
                            {description}
                        </p>
                    </div>
                </div>

                {children}
            </div>
        </div>
    </div>
);
}
