'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

/**
 * Hook de protection — redirige vers /auth si l'utilisateur n'est pas connecté.
 * Usage: useRequireAuth() dans n'importe quel composant/page.
 */
export function useRequireAuth(redirectTo = '/auth') {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [isAuthenticated, isLoading, redirectTo, router]);

    return { isAuthenticated, isLoading };
}
