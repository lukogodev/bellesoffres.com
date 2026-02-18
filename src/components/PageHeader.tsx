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
            <header className="w-full sticky top-0 z-[60] bg-chocolate shadow-md">
                <div className="w-full px-4 py-4 md:py-6 flex items-center bg-chocolate text-beige">
                    {/* Navigation Buttons Left */}
                    <div className="flex items-center gap-1 md:gap-4 shrink-0">
                        <Link href="/menu" className="p-2 hover:bg-beige/10 rounded-full transition-all">
                            <Menu size={22} />
                        </Link>
                        <Link href="/publish" className="p-2 hover:bg-beige/10 rounded-full transition-all flex items-center gap-2">
                            <Plus size={20} className="text-white" />
                        </Link>
                        <Link href="/favorites" className="p-2 hover:bg-beige/10 rounded-full transition-all">
                            <Heart size={20} />
                        </Link>
                        <Link href="/profile" className="p-2 hover:bg-beige/10 rounded-full transition-all">
                            <User size={20} />
                        </Link>
                    </div>

                    {/* Site Title / Logo */}
                    <div className="flex-1 ml-4 overflow-hidden">
                        <Link href="/">
                            <h1 className="text-lg md:text-2xl font-[1000] tracking-tighter uppercase leading-none italic truncate">
                                Belles <span className="text-white">Offres</span>
                            </h1>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="w-full sticky top-0 z-[60] bg-chocolate border-b border-white/5">
            <div className="w-full px-4 py-4 flex items-center justify-between bg-chocolate text-beige">
                <Link href={backUrl} className="text-beige p-2 hover:bg-beige/10 rounded-full transition-all shrink-0">
                    <ArrowLeft size={20} strokeWidth={3} />
                </Link>

                <h1 className="text-xs font-black tracking-widest uppercase flex items-center gap-2 truncate px-4">
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
