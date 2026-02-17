'use client';

import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import { Settings, Edit, LogOut, Package, Heart, MapPin, ChevronRight, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
    const user = {
        name: "Kouamé Jean",
        email: "jean.kouame@example.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        location: "Abidjan, Cocody",
        joined: "Jan 2024",
        stats: {
            listings: 12,
            sold: 5,
            rating: 4.8
        }
    };

    return (
        <AppContainer className="bg-gray-50">
            {/* Header */}
            <PageHeader
                variant="page"
                title="Mon Profil"
                rightContent={
                    <Link href="/settings" className="p-2 bg-beige/10 rounded-full text-beige hover:bg-beige/20 transition-colors">
                        <Settings className="w-5 h-5" />
                    </Link>
                }
            />

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                {/* Profile Header Card */}
                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-chocolate/5 p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full border-4 border-beige overflow-hidden shadow-lg relative">
                                <Image
                                    src={user.avatar}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <button className="absolute bottom-1 right-1 bg-chocolate text-white p-2 rounded-full border-4 border-white shadow-md active:scale-90 transition-transform">
                                <Edit className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <h1 className="text-3xl font-black text-chocolate">{user.name}</h1>
                                <div className="flex items-center justify-center md:justify-start gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    <ShieldCheck size={12} />
                                    Vendeur Vérifié
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium">{user.email}</p>
                            <div className="flex items-center justify-center md:justify-start gap-1 text-chocolate/60 text-sm font-bold">
                                <MapPin className="w-4 h-4" />
                                <span>{user.location}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <Link href="/profile/edit" className="flex-1 md:flex-none px-8 py-3 bg-chocolate text-beige rounded-2xl font-bold text-center shadow-lg active:scale-95 transition-transform">
                                Editer
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-100">
                        <div className="text-center group cursor-pointer">
                            <span className="block text-2xl font-black text-chocolate group-hover:scale-110 transition-transform">{user.stats.listings}</span>
                            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">En cours</span>
                        </div>
                        <div className="text-center group cursor-pointer border-l border-r border-gray-100">
                            <span className="block text-2xl font-black text-chocolate group-hover:scale-110 transition-transform">{user.stats.sold}</span>
                            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Vendus</span>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="flex items-center justify-center gap-1">
                                <span className="block text-2xl font-black text-chocolate group-hover:scale-110 transition-transform">{user.stats.rating}</span>
                                <span className="text-sm text-yellow-500">★</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Avis (12)</span>
                        </div>
                    </div>
                </div>

                {/* Account Menu */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-chocolate/40 uppercase tracking-[0.2em] ml-6 mb-2">Général</h3>
                    <div className="bg-white rounded-3xl shadow-sm border border-chocolate/5 overflow-hidden">
                        <MenuItem icon={Package} label="Mes Annonces" count={user.stats.listings} />
                        <MenuItem icon={Heart} label="Mes Favoris" count={2} />
                        <MenuItem icon={Settings} label="Paramètres" />
                    </div>

                    <h3 className="text-xs font-black text-chocolate/40 uppercase tracking-[0.2em] ml-6 mb-2 mt-8">Sécurité</h3>
                    <div className="bg-white rounded-3xl shadow-sm border border-chocolate/5 overflow-hidden">
                        <MenuItem icon={LogOut} label="Déconnexion" danger />
                    </div>
                </div>
            </main>
            <BottomNav />
        </AppContainer>
    );
}

const MenuItem = ({ icon: Icon, label, count, danger = false }: { icon: any, label: string, count?: number, danger?: boolean }) => (
    <button className={`w-full flex items-center justify-between p-5 hover:bg-beige/10 transition-colors border-b last:border-none border-gray-50 ${danger ? 'text-red-500' : 'text-chocolate'}`}>
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${danger ? 'bg-red-50' : 'bg-beige/30'}`}>
                <Icon className={`w-5 h-5 ${danger ? 'text-red-500' : 'text-chocolate'}`} />
            </div>
            <span className="font-bold text-sm tracking-tight">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {count !== undefined && (
                <span className="bg-chocolate/5 text-chocolate text-[10px] font-black px-2 py-0.5 rounded-full">
                    {count}
                </span>
            )}
            <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>
    </button>
);
