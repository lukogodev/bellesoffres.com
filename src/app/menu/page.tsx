'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    X,
    User,
    Heart,
    ShoppingBag,
    Settings,
    HelpCircle,
    ShieldCheck,
    DollarSign,
    Bell,
    LogOut,
    ChevronRight,
    Play,
    PlusCircle,
    Store
} from 'lucide-react';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';

export default function MenuPage() {
    const router = useRouter();

    const MenuItem = ({ icon: Icon, label, href, subLabel, color = "bg-beige/30", iconColor = "text-chocolate" }: any) => (
        <Link
            href={href}
            className="flex items-center justify-between p-5 bg-white rounded-3xl border border-chocolate/5 hover:bg-beige/10 transition-all active:scale-[0.98] group"
        >
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${color} ${iconColor} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon size={22} />
                </div>
                <div>
                    <span className="block font-black text-sm uppercase tracking-tight text-chocolate">{label}</span>
                    {subLabel && <span className="text-[10px] font-bold text- chocolate/40 uppercase tracking-widest leading-none">{subLabel}</span>}
                </div>
            </div>
            <ChevronRight size={18} className="text-chocolate/20 group-hover:text-chocolate transition-colors" />
        </Link>
    );

    return (
        <AppContainer className="bg-gray-50">
            {/* Header du Menu */}
            <div className="bg-chocolate p-6 pt-10 rounded-b-[3.5rem] shadow-2xl relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-[1000] text-beige uppercase tracking-tighter italic">
                        Belles <span className="text-white">Offres</span>
                    </h1>
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all active:scale-90"
                    >
                        <X size={24} />
                    </button>
                </div>

                <Link href="/profile" className="flex items-center gap-4 p-4 bg-white/10 rounded-3xl border border-white/10 hover:bg-white/20 transition-all">
                    <div className="w-14 h-14 rounded-full border-2 border-beige overflow-hidden bg-white/5">
                        <div className="w-full h-full flex items-center justify-center text-xl font-black text-beige">K</div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-white font-black text-lg leading-tight uppercase tracking-tight">Kouamé Jean</h2>
                        <p className="text-beige/50 text-[10px] font-bold uppercase tracking-widest">Voir mon profil</p>
                    </div>
                </Link>
            </div>

            <main className="px-5 py-10 pb-32 space-y-12">
                {/* 1. MON ACTIVITÉ */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-chocolate/30 uppercase tracking-[0.3em] ml-2">Mon Activité</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <MenuItem
                            icon={ShoppingBag}
                            label="Mes Ventes"
                            subLabel="Gérer mes articles"
                            href="/profile"
                        />
                        <MenuItem
                            icon={Heart}
                            label="Mes Favoris"
                            subLabel="Articles sauvegardés"
                            href="/favorites"
                        />
                        <MenuItem
                            icon={Bell}
                            label="Notifications"
                            subLabel="Alertes et messages"
                            href="/notifications"
                        />
                    </div>
                </div>

                {/* 2. DÉCOUVRIR */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-chocolate/30 uppercase tracking-[0.3em] ml-2">Découvrir</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <MenuItem
                            icon={Play}
                            label="Flux Vidéo"
                            subLabel="Vidéos TikTok-style"
                            href="/feed"
                            color="bg-red-50"
                            iconColor="text-red-500"
                        />
                        <MenuItem
                            icon={PlusCircle}
                            label="Publier"
                            subLabel="Vendre un article"
                            href="/publish"
                            color="bg-green-50"
                            iconColor="text-green-600"
                        />
                    </div>
                </div>

                {/* 3. ASSISTANCE & PARAMÈTRES */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-chocolate/30 uppercase tracking-[0.3em] ml-2">Assistance & Infos</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <MenuItem
                            icon={Settings}
                            label="Paramètres"
                            href="/settings"
                        />
                        <MenuItem
                            icon={HelpCircle}
                            label="Besoin d'aide ?"
                            href="/help"
                        />
                        <MenuItem
                            icon={DollarSign}
                            label="Investir"
                            href="/invest"
                            color="bg-yellow-50"
                            iconColor="text-yellow-600"
                        />
                    </div>
                </div>

                {/* Bouton Déconnexion */}
                <button className="w-full flex items-center justify-center gap-4 p-6 bg-red-50 text-red-500 rounded-[2rem] border-2 border-red-100 font-extrabold uppercase tracking-[0.2em] text-xs hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-red-100">
                    <LogOut size={20} />
                    Se Déconnecter
                </button>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
