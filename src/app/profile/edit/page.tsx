'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Shield, User, MapPin, Mail, Phone } from 'lucide-react';

export default function EditProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/profile');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
                </button>
                <h1 className="text-lg font-bold">Modifier le profil</h1>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="text-chocolate font-bold text-sm disabled:opacity-50 flex items-center gap-1"
                >
                    {loading ? 'Enregistrement...' : 'Sauvegarder'}
                </button>
            </div>

            <div className="p-4 space-y-6 max-w-lg mx-auto">
                {/* Avatar Edit */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 relative overflow-hidden group hover:opacity-90 cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold">Modifier</span>
                        </div>
                    </div>
                    <span className="text-chocolate text-xs font-bold cursor-pointer">Changer la photo</span>
                </div>

                {/* Form Groups */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Nom complet</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                defaultValue="Kouamé Jean"
                                className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                defaultValue="jean.kouame@example.com"
                                className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Téléphone (WhatsApp)</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="tel"
                                defaultValue="+225 07 07 07 07"
                                className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Localisation</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                defaultValue="Abidjan, Cocody"
                                className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-gray-400" />
                        Sécurité
                    </h3>
                    <button className="w-full p-3 bg-red-50 text-red-600 font-bold rounded-xl text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2 mb-3">
                        Supprimer mon compte
                    </button>
                    <button className="w-full p-3 bg-gray-100 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">
                        Changer le mot de passe
                    </button>
                </div>
            </div>
        </div>
    );
}
