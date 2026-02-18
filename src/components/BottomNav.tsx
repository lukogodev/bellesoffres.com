'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Play, Plus, User } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', icon: Home, label: 'Accueil' },
        { href: '/feed', icon: Play, label: 'Vidéos' },
        { href: '/publish', icon: Plus, label: 'Vendre' },
        { href: '/profile', icon: User, label: 'Profil' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center md:hidden">
            <div className="w-full max-w-6xl bg-chocolate flex justify-around items-center h-[65px] px-4 font-sans border-t border-beige/10">
                {navItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 ${isActive ? 'text-white' : 'text-beige/60 hover:text-beige'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                            <span className={`text-[9px] font-black mt-1.5 uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
