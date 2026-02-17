'use client';

import BottomNav from "@/components/BottomNav";
import { Bell, MessageCircle, Heart, Tag } from "lucide-react";

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
            color: 'text-blue-500 bg-blue-100'
        },
        {
            id: 2,
            type: 'favorite',
            title: 'Nouveau favori',
            message: 'Fatou Diop a aimé votre produit "MacBook Air M1"',
            time: 'Il y a 1h',
            read: true,
            icon: Heart,
            color: 'text-red-500 bg-red-100'
        },
        {
            id: 3,
            type: 'system',
            title: 'Bienvenue !',
            message: 'Bienvenue sur Belles Offres. Complétez votre profil pour vendre plus vite.',
            time: 'Il y a 1j',
            read: true,
            icon: Bell,
            color: 'text-chocolate bg-beige'
        },
        {
            id: 4,
            type: 'promo',
            title: 'Promo Flash',
            message: 'Boostez vos annonces à -50% ce week-end !',
            time: 'Il y a 2j',
            read: true,
            icon: Tag,
            color: 'text-green-500 bg-green-100'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-24">
            <header className="sticky top-0 z-10 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 px-4 py-4">
                <h1 className="text-xl font-bold">Notifications</h1>
            </header>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                        <div key={notif.id} className={`p-4 flex gap-4 ${notif.read ? 'bg-transparent' : 'bg-blue-50/50 dark:bg-blue-900/10'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                                <Icon className="w-5 h-5 fill-current" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`text-sm font-bold ${notif.read ? 'text-gray-900 dark:text-gray-100' : 'text-black dark:text-white'}`}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-[10px] text-gray-400">{notif.time}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
                                    {notif.message}
                                </p>
                            </div>
                            {!notif.read && (
                                <div className="w-2 h-2 rounded-full bg-chocolate mt-1.5 flex-shrink-0" />
                            )}
                        </div>
                    );
                })}
            </div>

            <BottomNav />
        </div>
    );
}
