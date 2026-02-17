'use client';

import { ArrowLeft, Heart, Menu } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PageHeaderProps {
    /** Type de header: 'home' pour l'accueil, 'page' pour les autres pages */
    variant?: 'home' | 'page';
    /** Titre de la page (utilisé pour variant='page') */
    title?: string;
    /** Icône optionnelle à afficher à côté du titre */
    icon?: ReactNode;
    /** Actions/boutons personnalisés à droite du header */
    rightContent?: ReactNode;
    /** URL de retour (par défaut '/') */
    backUrl?: string;
}

export default function PageHeader({
    variant = 'page',
    title = 'Page',
    icon,
    rightContent,
    backUrl = '/'
}: PageHeaderProps) {
    if (variant === 'home') {
        // Header de la page d'accueil (Belles Offres)
        return (
            <header className="w-full sticky top-0 z-50 bg-chocolate shadow-xl">
                <div className="max-w-[1280px] mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-[900] text-beige tracking-tighter uppercase leading-none">
                        Belles Offres
                    </h1>

                    <div className="flex items-center gap-6">
                        <Link href="/favorites" className="relative group">
                            <Heart className="w-6 h-6 text-beige transition-transform active:scale-75" />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-chocolate"></span>
                        </Link>
                        <button className="text-beige active:scale-75 transition-transform">
                            <Menu className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </header>
        );
    }

    // Header standard pour toutes les autres pages
    return (
        <header className="w-full sticky top-0 z-50 bg-chocolate shadow-xl">
            <div className="max-w-[1280px] mx-auto px-4 py-4 flex items-center justify-between">
                {/* Bouton Retour */}
                <Link href={backUrl} className="text-beige p-1 transition-transform active:scale-75">
                    <ArrowLeft size={28} strokeWidth={2.5} />
                </Link>

                {/* Titre au centre */}
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-[900] text-beige tracking-tighter uppercase flex items-center gap-2">
                    {icon && <span className="flex items-center">{icon}</span>}
                    <span className="truncate max-w-[200px]">{title}</span>
                </h1>

                {/* Contenu de droite (optionnel) */}
                <div className="text-beige">
                    {rightContent || <div className="w-10" />} {/* Spacer pour équilibrer si pas de contenu */}
                </div>
            </div>
        </header>
    );
}
