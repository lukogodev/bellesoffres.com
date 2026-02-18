'use client';

import Link from 'next/link';
import AppContainer from '@/components/AppContainer';
import { Home, Search, AlertCircle, ChevronLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <AppContainer className="bg-white">
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
                {/* Illustration / Icon */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 bg-beige rounded-full flex items-center justify-center animate-bounce">
                        <AlertCircle size={64} className="text-chocolate opacity-20" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-chocolate text-white text-xs font-black px-4 py-2 rounded-2xl shadow-xl">
                        404
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-4xl font-[1000] text-chocolate uppercase tracking-tighter mb-4 italic">
                    Oups ! <span className="text-chocolate/40">Page introuvable</span>
                </h1>
                <p className="text-gray-500 font-bold mb-12 max-w-xs leading-relaxed">
                    Il semble que cette offre ou cette page n'existe plus ou a été déplacée.
                </p>

                {/* Actions */}
                <div className="w-full space-y-4 max-w-xs">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-3 p-5 bg-chocolate text-beige rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-black transition-all active:scale-95"
                    >
                        <Home size={20} />
                        Retour à l'accueil
                    </Link>

                    <Link
                        href="/search"
                        className="flex items-center justify-center gap-3 p-5 bg-white border-2 border-chocolate/10 text-chocolate rounded-3xl font-black uppercase tracking-widest text-sm hover:border-chocolate/40 transition-all active:scale-95"
                    >
                        <Search size={20} />
                        Chercher un article
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 py-4 text-chocolate/40 font-black uppercase tracking-[0.2em] text-[10px] hover:text-chocolate transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Revenir en arrière
                    </button>
                </div>
            </div>
        </AppContainer>
    );
}
