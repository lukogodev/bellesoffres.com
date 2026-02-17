'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Play, Plus, Bell, User } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', icon: Home, label: 'Accueil' },
        { href: '/feed', icon: Play, label: 'Vidéos' },
        { href: '/publish', icon: Plus, label: 'Vendre', center: true },
        { href: '/notifications', icon: Bell, label: 'Alertes' },
        { href: '/profile', icon: User, label: 'Profil' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-chocolate shadow-[0_-8px_20px_rgba(0,0,0,0.3)] pb-safe pt-2 z-[100] h-[75px]">
            <div className="max-w-[1280px] mx-auto flex justify-around items-center h-full px-2 relative font-sans">
                {navItems.map(({ href, icon: Icon, label, center }) => {
                    const isActive = pathname === href;

                    if (center) {
                        return (
                            <Link
                                key={href}
                                href={href}
                                className="relative -top-6 flex flex-col items-center"
                            >
                                <div className="w-14 h-14 bg-beige rounded-full flex items-center justify-center border-[4px] border-chocolate shadow-xl transform transition-all active:scale-90 hover:scale-105">
                                    <Plus className="w-8 h-8 text-chocolate stroke-[3.5]" />
                                </div>
                                <span className="text-[9px] font-black text-beige mt-1 uppercase tracking-tighter">
                                    {label}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`group flex flex-col items-center justify-center w-14 transition-all duration-300 ${isActive ? 'relative' : ''
                                }`}
                        >
                            {isActive ? (
                                <>
                                    <div className="absolute -top-10 w-14 h-14 bg-beige rounded-full border-[4px] border-chocolate flex items-center justify-center shadow-2xl animate-in zoom-in-50 duration-300">
                                        <Icon className="w-6 h-6 text-chocolate fill-current" />
                                    </div>
                                    <span className="text-[10px] font-black text-beige mt-8 tracking-tight uppercase">
                                        {label}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Icon className="w-6 h-6 text-beige/50 group-hover:text-beige transition-colors" />
                                    <span className="text-[10px] font-bold text-beige/40 group-hover:text-beige mt-1 tracking-tight uppercase">
                                        {label}
                                    </span>
                                </>
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
