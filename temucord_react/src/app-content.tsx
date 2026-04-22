import * as React from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import type { AppVariant } from '@/types';

type Props = React.ComponentProps<'main'> & {
    variant?: AppVariant;
};

export function AppContent({ variant = 'sidebar', children, ...props }: Props) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset
                className="min-w-0 overflow-x-hidden"
                {...props}
            >
                {children}
            </SidebarInset>
        );
    }

    return (
        <main
            className="mx-auto flex h-full min-w-0 w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl px-4 py-4 sm:px-6"
            {...props}
        >
            {children}
        </main>
    );
}