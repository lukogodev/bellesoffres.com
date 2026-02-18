'use client';

import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import { Bell, MessageCircle, Heart, Tag, CheckCheck, Trash2 } from "lucide-react";

export default function NotificationsPage() {
    // Mock Notifications
    const notifications = [
        {
            id: 1,
            type: 'message',
            title: 'Nouveau message',
            message: 'Kouamé Jean vous a envoyé un message pour "iPhone 13 Pro Max"',
            time: 'Il y a 2 min',
            read: false,
            icon: MessageCircle,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            id: 2,
            type: 'favorite',
            title: 'Nouveau favori',
            message: 'Fatou Diop a aimé votre produit "MacBook Air M1"',
            time: 'Il y a 1h',
            read: true,
            icon: Heart,
            color: 'bg-red-100 text-red-600'
        },
        {
            id: 3,
            type: 'system',
            title: 'Bienvenue !',
            message: 'Bienvenue sur Belles Offres. Complétez votre profil pour vendre plus vite.',
            time: 'Il y a 1j',
            read: true,
            icon: Bell,
            color: 'bg-beige text-chocolate'
        },
        {
            id: 4,
            type: 'promo',
            title: 'Promo Flash',
            message: 'Boostez vos annonces à -50% ce week-end !',
            time: 'Il y a 2j',
            read: true,
            icon: Tag,
            color: 'bg-green-100 text-green-600'
        }
    ];

    return (
        <AppContainer className="bg-gray-50">
            <PageHeader
                variant="page"
                title="Alertes & Notifications"
                rightContent={
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-beige/10 rounded-full text-beige hover:bg-beige/20 transition-all">
                        <CheckCheck size={16} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Tout lire</span>
                    </button>
                }
            />

            <main className="max-w-[1280px] mx-auto pt-6 pb-24">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-chocolate/5 overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => {
                                const Icon = notif.icon;
                                return (
                                    <div
                                        key={notif.id}
                                        className={`group p-6 flex gap-5 transition-all hover:bg-beige/5 cursor-pointer relative ${!notif.read ? 'bg-beige/10' : ''
                                            }`}
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-110 ${notif.color}`}>
                                            <Icon className={`w-6 h-6 ${notif.type === 'favorite' ? 'fill-current' : ''}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={`text-sm font-black uppercase tracking-tight ${notif.read ? 'text-chocolate/60' : 'text-chocolate'}`}>
                                                    {notif.title}
                                                </h3>
                                                <span className="text-[10px] font-black text-gray-400/60 uppercase tracking-widest">{notif.time}</span>
                                            </div>
                                            <p className={`text-[13px] leading-relaxed font-bold ${notif.read ? 'text-gray-400' : 'text-gray-700'}`}>
                                                {notif.message}
                                            </p>
                                        </div>

                                        {/* Badge non lu */}
                                        {!notif.read && (
                                            <div className="absolute left-3 top-3 w-2.5 h-2.5 rounded-full bg-chocolate shadow-[0_0_10px_rgba(43,23,0,0.5)]" />
                                        )}

                                        {/* Action de suppression au hover */}
                                        <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center space-y-4">
                                <div className="w-20 h-20 bg-beige rounded-full flex items-center justify-center">
                                    <Bell className="w-10 h-10 text-chocolate opacity-20" />
                                </div>
                                <h3 className="text-lg font-black text-chocolate uppercase">Aucune notification</h3>
                                <p className="text-gray-400 font-medium text-sm">Vous êtes à jour !</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
