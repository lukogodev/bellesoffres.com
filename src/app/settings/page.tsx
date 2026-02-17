'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Globe,
    Moon,
    Sun,
    ShieldCheck,
    Info,
    ChevronRight,
    LogOut
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('fr');

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-black text-white' : 'bg-white text-black'} pb-24 transition-colors`}>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
                </button>
                <h1 className="text-lg font-bold">Paramètres Généraux</h1>
            </div>

            <div className="p-4 space-y-6">

                {/* Preferences */}
                <div className="space-y-1">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide px-2 mb-2">Préférences</h3>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                            </div>
                            <span className="font-medium text-sm">Thème</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{darkMode ? 'Sombre' : 'Clair'}</span>
                            <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ${darkMode ? 'bg-chocolate justify-end' : 'bg-gray-300 justify-start'}`}>
                                <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                            </div>
                        </div>
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <Globe className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-sm">Langue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{language === 'fr' ? 'Français' : 'English'}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </button>
                </div>

                {/* Legal & About */}
                <div className="space-y-1">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide px-2 mb-2">Légal</h3>

                    <Link href="/policy" className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-sm">Politique de confidentialité</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>

                    <Link href="/about" className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                                <Info className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-sm">À Propos</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                </div>

                {/* App Version */}
                <div className="text-center pt-8">
                    <p className="text-xs text-gray-400 font-medium">Belles Offres v1.0.0</p>
                    <p className="text-[10px] text-gray-300 mt-1">Made with ❤️ in Africa</p>
                </div>
            </div>
        </div>
    );
}
