'use client';

import { ReactNode } from 'react';

interface AppContainerProps {
    children: ReactNode;
    /** Classe CSS supplémentaire pour le conteneur principal */
    className?: string;
}

/**
 * Conteneur principal de l'application qui assure l'alignement uniforme
 * de tous les éléments (Header, Main, BottomNav) sur grand écran.
 * 
 * Largeur max: 1280px, centré avec mx-auto
 */
export default function AppContainer({ children, className = '' }: AppContainerProps) {
    return (
        <div className={`min-h-screen bg-white pb-32 ${className}`}>
            {children}
        </div>
    );
}
