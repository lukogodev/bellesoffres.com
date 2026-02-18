'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, User, MapPin, Mail, Phone, Camera, Shield, Trash2, Key } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import Image from 'next/image';

export default function EditProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Profil mis à jour avec succès !');
            router.push('/profile');
        }, 1500);
    };

    const InputField = ({ label, icon: Icon, type = "text", defaultValue }: any) => (
        <div className="space-y-2">
            <label className="block text-[10px] font-black text-chocolate/50 uppercase tracking-[0.2em] ml-2">
                {label}
            </label>
            <div className="relative group">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/30 group-focus-within:text-chocolate transition-colors" size={20} />
                <input
                    type={type}
                    defaultValue={defaultValue}
                    className="w-full p-5 pl-12 bg-white rounded-2xl border-2 border-chocolate/5 focus:border-chocolate focus:ring-4 focus:ring-chocolate/5 transition-all font-bold text-chocolate outline-none shadow-sm"
                />
            </div>
        </div>
    );

    return (
        <AppContainer className="bg-gray-50">
            <PageHeader
                variant="page"
                title="MODIFIER MON PROFIL"
                rightContent={
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-beige text-chocolate px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? '...' : <><Save size={16} /> Enregistrer</>}
                    </button>
                }
            />

            <main className="max-w-[700px] mx-auto px-4 py-12">
                <div className="bg-white rounded-[3rem] shadow-2xl border border-chocolate/5 p-8 md:p-12 space-y-10">

                    {/* Photo de profil */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-full border-4 border-beige overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                                    alt="Avatar"
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white w-8 h-8" />
                            </div>
                        </div>
                        <button className="text-[10px] font-black text-chocolate uppercase tracking-widest hover:underline decoration-2">Changer la photo</button>
                    </div>

                    {/* Champs du formulaire */}
                    <div className="space-y-6">
                        <InputField label="Nom Complet" icon={User} defaultValue="Kouamé Jean" />
                        <InputField label="Email Commercial" icon={Mail} type="email" defaultValue="jean.kouame@example.com" />
                        <InputField label="WhatsApp (Public)" icon={Phone} type="tel" defaultValue="+225 07 07 07 07" />
                        <InputField label="Ville / Quartier" icon={MapPin} defaultValue="Kinshasa, Gombe" />
                    </div>

                    {/* Section Sécurité */}
                    <div className="pt-10 border-t border-gray-100 space-y-6">
                        <h3 className="text-xs font-black text-chocolate/30 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Shield size={16} /> Sécurité du compte
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 p-4 bg-gray-50 hover:bg-beige/20 text-chocolate rounded-2xl border border-chocolate/5 font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-sm">
                                <Key size={18} /> Changer le mot de passe
                            </button>
                            <button className="flex items-center justify-center gap-3 p-4 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-2xl border border-red-100 font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-sm">
                                <Trash2 size={18} /> Supprimer mon compte
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
