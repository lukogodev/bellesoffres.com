'use client';

import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import { HelpCircle, MessageCircle, FileText, Shield, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
    const faqs = [
        {
            q: "Comment publier une offre ?",
            a: "Cliquez sur le bouton 'Vendre' (+) dans la barre de navigation, remplissez les informations et ajoutez vos photos."
        },
        {
            q: "L'application est-elle gratuite ?",
            a: "Oui, la publication d'annonces standard est 100% gratuite. Des options de mise en avant payantes sont disponibles."
        },
        {
            q: "Comment contacter un vendeur ?",
            a: "Sur chaque page produit, cliquez sur le bouton vert 'WhatsApp' pour démarrer une discussion directe."
        },
        {
            q: "Sécurité : Comment payer ?",
            a: "Nous recommandons de ne jamais payer à l'avance. Inspectez le produit et payez lors de la remise en main propre."
        }
    ];

    return (
        <AppContainer className="bg-gray-50">
            <PageHeader variant="page" title="CENTRE D'AIDE" />

            <main className="max-w-[800px] mx-auto px-4 py-8 pb-32">
                {/* Section Recherche Aide */}
                <div className="bg-chocolate p-8 rounded-[3rem] shadow-2xl mb-10 overflow-hidden relative">
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-2xl font-black text-beige uppercase tracking-tighter">Comment pouvons-nous vous aider ?</h2>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/30" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher une réponse..."
                                className="w-full p-5 pl-12 bg-white rounded-2xl border-none font-bold text-chocolate shadow-inner outline-none"
                            />
                        </div>
                    </div>
                    {/* Déco */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full" />
                </div>

                {/* FAQ Rapide */}
                <div className="space-y-6 mb-12">
                    <h3 className="text-xs font-black text-chocolate/30 uppercase tracking-[0.3em] ml-2">Questions Fréquentes</h3>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group bg-white rounded-3xl border border-chocolate/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-black text-sm text-chocolate uppercase tracking-tight">{faq.q}</span>
                                    <ChevronRight className="text-chocolate/20 group-open:rotate-90 transition-transform" size={18} />
                                </summary>
                                <div className="px-6 pb-6 text-sm text-gray-500 font-medium leading-relaxed">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* Nous Contacter */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-chocolate/30 uppercase tracking-[0.3em] ml-2">Contacter le Support</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="https://wa.me/"
                            target="_blank"
                            className="flex items-center gap-4 p-6 bg-whatsapp text-white rounded-[2rem] shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                        >
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <span className="block font-black text-sm uppercase tracking-widest">Support WhatsApp</span>
                                <span className="text-[10px] font-bold opacity-70">Réponse sous 15 min</span>
                            </div>
                        </a>

                        <Link
                            href="/legal"
                            className="flex items-center gap-4 p-6 bg-white border-2 border-chocolate text-chocolate rounded-[2rem] shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                        >
                            <div className="w-12 h-12 bg-beige rounded-2xl flex items-center justify-center">
                                <FileText size={24} />
                            </div>
                            <div>
                                <span className="block font-black text-sm uppercase tracking-widest">Conditions Générales</span>
                                <span className="text-[10px] font-bold opacity-40 text-chocolate">Lire les Mentions</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
