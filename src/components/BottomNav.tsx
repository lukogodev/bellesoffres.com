'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Play, Plus, User, Bell } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    if (pathname.includes('/video/') || pathname.includes('/product/')) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#5D4037] text-[#D7CCC8] pb-safe pt-2 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t border-[#D7CCC8]/10">
            <div className="flex items-center justify-between max-w-md mx-auto relative">
                <Link href="/" className={`flex flex-col items-center gap-1 p-2 transition-all ${pathname === '/' ? 'text-white scale-110' : 'hover:text-white/80'}`}>
                    <div className={`p-1.5 rounded-2xl transition-all ${pathname === '/' ? 'bg-white/10' : ''}`}>
                        <Home size={24} strokeWidth={pathname === '/' ? 3 : 2} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Accueil</span>
                </Link>

                <Link href="/feed" className={`flex flex-col items-center gap-1 p-2 transition-all ${pathname === '/feed' ? 'text-white scale-110' : 'hover:text-white/80'}`}>
                    <div className={`p-1.5 rounded-2xl transition-all ${pathname === '/feed' ? 'bg-white/10' : ''}`}>
                        <Play size={24} strokeWidth={pathname === '/feed' ? 3 : 2} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Vidéos</span>
                </Link>

                <div className="relative -top-6">
                    <Link href="/publish" className="flex flex-col items-center justify-center w-16 h-16 bg-[#D7CCC8] rounded-full border-4 border-[#5D4037] shadow-xl text-[#5D4037] hover:scale-110 transition-transform active:scale-95 group">
                        <Plus size={32} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                    </Link>
                    <span className="absolute -bottom-5 w-full text-center text-[9px] font-bold uppercase tracking-widest text-[#D7CCC8]">Vendre</span>
                </div>

                <Link href="/notifications" className={`flex flex-col items-center gap-1 p-2 transition-all ${pathname === '/notifications' ? 'text-white scale-110' : 'hover:text-white/80'}`}>
                    <div className={`p-1.5 rounded-2xl transition-all ${pathname === '/notifications' ? 'bg-white/10' : ''}`}>
                        <Bell size={24} strokeWidth={pathname === '/notifications' ? 3 : 2} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Notifs</span>
                </Link>

                <Link href="/profile" className={`flex flex-col items-center gap-1 p-2 transition-all ${pathname === '/profile' ? 'text-white scale-110' : 'hover:text-white/80'}`}>
                    <div className={`p-1.5 rounded-2xl transition-all ${pathname === '/profile' ? 'bg-white/10' : ''}`}>
                        <User size={24} strokeWidth={pathname === '/profile' ? 3 : 2} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Profil</span>
                </Link>
            </div>
        </div>
    );
}
