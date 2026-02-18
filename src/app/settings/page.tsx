'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Globe,
    Moon,
    Sun,
    ShieldCheck,
    Info,
    ChevronRight,
    LogOut,
    Bell,
    Lock,
    Scale
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';

export default function SettingsPage() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('fr');

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

    const SettingItem = ({ icon: Icon, label, value, href, onClick, color = "bg-beige/30", textColor = "text-chocolate" }: any) => {
        const Content = (
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-chocolate/5 hover:bg-beige/10 transition-all group active:scale-[0.98]">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${color} ${textColor} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon size={20} />
                    </div>
                    <span className="font-black text-sm uppercase tracking-tight text-black">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                    {value && <span className="text-xs font-bold text-gray-400">{value}</span>}
                    <ChevronRight size={18} className="text-gray-300" />
                </div>
            </div>
        );

        if (href) return <Link href={href} className="block">{Content}</Link>;
        return <button onClick={onClick} className="w-full text-left">{Content}</button>;
    };

    return (
        <AppContainer className="bg-gray-50">
            <PageHeader variant="page" title="Paramètres" />

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                <div className="space-y-8">
                    {/* Section Préférences */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-2">Préférences</h3>
                        <div className="space-y-3">
                            <SettingItem
                                icon={darkMode ? Moon : Sun}
                                label="Mode Nuit"
                                value={darkMode ? "Activé" : "Désactivé"}
                                onClick={toggleDarkMode}
                            />
                            <SettingItem
                                icon={Globe}
                                label="Langue de l'App"
                                value={language === 'fr' ? "Français" : "English"}
                                onClick={toggleLanguage}
                            />
                            <SettingItem
                                icon={Bell}
                                label="Notifications"
                                value="Toutes"
                                href="/notifications"
                            />
                        </div>
                    </div>

                    {/* Section Sécurité & Légal */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-2">Sécurité & Légal</h3>
                        <div className="space-y-3">
                            <SettingItem
                                icon={Lock}
                                label="Confidentialité"
                                href="/policy"
                            />
                            <SettingItem
                                icon={Scale}
                                label="Mentions Légales"
                                href="/legal"
                            />
                            <SettingItem
                                icon={Info}
                                label="À Propos"
                                href="/about"
                            />
                        </div>
                    </div>

                    {/* Section Compte */}
                    <div className="space-y-4 pt-4">
                        <button className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-500 rounded-3xl border-2 border-red-100 font-black uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-red-100">
                            <LogOut size={20} />
                            Se Déconnecter
                        </button>
                    </div>

                    {/* App Version Info */}
                    <div className="text-center pt-8 space-y-1">
                        <p className="text-[10px] font-black text-chocolate/20 uppercase tracking-[0.3em]">Belles Offres v1.0.0</p>
                        <p className="text-[9px] font-bold text-gray-300">Made with ❤️ for Africa</p>
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
