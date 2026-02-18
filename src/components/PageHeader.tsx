'use client';

import { ArrowLeft, Menu, Heart, Play, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PageHeaderProps {
    variant?: 'home' | 'page';
    title?: string;
    icon?: ReactNode;
    rightContent?: ReactNode;
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
        return (
            <header className="w-full sticky top-0 z-[60] bg-chocolate flex justify-center shadow-md">
                <div className="w-full max-w-6xl px-4 py-4 flex justify-between items-center bg-chocolate text-beige">
                    {/* Mobile: Menu icon left */}
                    <button className="md:hidden p-2 hover:bg-beige/10 rounded-full transition-all">
                        <Menu size={24} />
                    </button>

                    {/* Logo: Centered on mobile, Left on desktop */}
                    <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <h1 className="text-xl md:text-2xl font-[900] tracking-[0.1em] uppercase leading-none italic">
                            Belles Offres
                        </h1>
                    </div>

                    {/* Desktop: Actions right */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/publish" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                            <Plus size={18} />
                            Vendre
                        </Link>
                        <Link href="/favorites" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                            <Heart size={18} />
                            Favoris
                        </Link>
                        <Link href="/feed" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                            <Play size={18} />
                            Vidéos
                        </Link>
                        <Link href="/profile" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                            <User size={18} />
                            Profil
                        </Link>
                    </div>

                    {/* Mobile Spacer (to keep logo centered) */}
                    <div className="w-10 md:hidden" />
                </div>
            </header>
        );
    }

    return (
        <header className="w-full sticky top-0 z-[60] bg-chocolate flex justify-center border-b border-beige/10">
            <div className="w-full max-w-6xl px-4 py-3 flex items-center justify-between bg-chocolate text-beige">
                <Link href={backUrl} className="text-beige p-2 hover:bg-beige/10 rounded-full transition-all shrink-0">
                    <ArrowLeft size={20} strokeWidth={3} />
                </Link>

                <h1 className="text-sm font-black tracking-[0.1em] uppercase flex items-center gap-2 truncate px-4">
                    {icon && <span className="flex items-center">{icon}</span>}
                    <span className="truncate">{title}</span>
                </h1>

                <div className="flex items-center justify-end min-w-[40px] shrink-0">
                    {rightContent || <div className="w-4" />}
                </div>
            </div>
        </header>
    );
}
