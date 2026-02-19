'use client';

import { ArrowLeft, Menu as IconMenu, Heart, Play, Plus, User } from 'lucide-react';
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
            <header className="w-full sticky top-0 z-[60] bg-[#5D4037] shadow-xl border-b border-[#D7CCC8]/10">
                <div className="w-full px-4 py-4 md:py-5 flex items-center justify-between bg-[#5D4037] text-[#D7CCC8]">

                    {/* Empty Left Placeholder (for balance if needed, or maybe Logo Icon) */}
                    <div className="w-20 flex justify-start">
                        {/* Could be empty or have a small logo */}
                    </div>

                    {/* Centered Title */}
                    <div className="flex-1 flex justify-center">
                        <Link href="/">
                            <h1 className="text-2xl md:text-3xl font-[900] tracking-tighter capitalize italic font-serif text-[#FAF9F6] drop-shadow-md">
                                Belles <span className="text-[#D7CCC8]">Offres</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="w-20 flex items-center justify-end gap-1">
                        <Link href="/favorites" className="p-2 hover:bg-[#D7CCC8]/10 rounded-full transition-all text-[#D7CCC8] hover:text-[#FAF9F6]">
                            <Heart size={22} className="drop-shadow-sm" />
                            <span className="text-[8px] font-bold uppercase tracking-widest block text-center mt-0.5">Favoris</span>
                        </Link>
                        <Link href="/menu" className="p-2 hover:bg-[#D7CCC8]/10 rounded-full transition-all text-[#D7CCC8] hover:text-[#FAF9F6]">
                            <IconMenu size={22} className="drop-shadow-sm" />
                            <span className="text-[8px] font-bold uppercase tracking-widest block text-center mt-0.5">Menu</span>
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
