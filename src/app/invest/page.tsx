'use client';

import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import { Play, DollarSign, CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';

// Icône WhatsApp
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
    </svg>
);

export default function InvestPage() {
    return (
        <AppContainer>
            <PageHeader variant="page" title="Investir dans Belles Offres" />

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                {/* Vidéo de présentation */}
                <div className="relative aspect-video bg-chocolate rounded-3xl overflow-hidden shadow-2xl mb-10 group">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <div className="w-20 h-20 bg-beige/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                            <Play className="w-10 h-10 text-chocolate fill-current ml-1" />
                        </div>
                    </div>
                    {/* Placeholder content for video */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="text-beige font-black text-xl uppercase tracking-widest drop-shadow-lg">
                            Présentation du concept
                        </div>
                        <div className="text-beige/70 text-sm font-bold uppercase tracking-widest drop-shadow-lg">
                            L'équipe Belles Offres vous explique TOUT
                        </div>
                    </div>
                </div>

                {/* Titre et Concept */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-chocolate uppercase tracking-tighter mb-4">
                        Devenez Investisseur
                    </h2>
                    <p className="text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
                        Participez à la croissance de la plus grande marketplace dynamique de la RDC.
                        Investissez dans notre infrastructure et bénéficiez de revenus publicitaires et de rendements mensuels garantis.
                    </p>
                </div>

                {/* Avantages */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-3xl border border-chocolate/5 shadow-xl text-center space-y-4">
                        <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto">
                            <TrendingUp className="w-8 h-8 text-chocolate" />
                        </div>
                        <h3 className="font-black text-chocolate uppercase text-sm tracking-widest">Rendements Élevés</h3>
                        <p className="text-xs text-gray-500 font-bold leading-relaxed">
                            Bénéficiez de dividendes issus des frais de mise en avant et de la publicité.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-chocolate/5 shadow-xl text-center space-y-4">
                        <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto">
                            <ShieldCheck className="w-8 h-8 text-chocolate" />
                        </div>
                        <h3 className="font-black text-chocolate uppercase text-sm tracking-widest">Sécurité Garantie</h3>
                        <p className="text-xs text-gray-500 font-bold leading-relaxed">
                            Votre capital est sécurisé et investi dans le développement technologique.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-chocolate/5 shadow-xl text-center space-y-4">
                        <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto">
                            <DollarSign className="w-8 h-8 text-chocolate" />
                        </div>
                        <h3 className="font-black text-chocolate uppercase text-sm tracking-widest">Accès Prioritaire</h3>
                        <p className="text-xs text-gray-500 font-bold leading-relaxed">
                            Accédez en avant-première aux nouvelles fonctionnalités et aux opportunités.
                        </p>
                    </div>
                </div>

                {/* Section Contact */}
                <div className="bg-chocolate rounded-[2.5rem] p-10 text-center text-beige">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Prêt à investir ?</h3>

                    <div className="space-y-4 mb-10 max-w-md mx-auto">
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                            <div className="w-6 h-6 border-2 border-beige rounded-md flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-beige" />
                            </div>
                            <span className="text-sm font-bold text-beige/90 capitalize leading-none">J'accepte les conditions d'investissement</span>
                        </div>
                    </div>

                    <a
                        href="https://wa.me/+243000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-whatsapp hover:bg-[#1ebc57] text-white font-black py-5 px-10 rounded-2xl inline-flex items-center gap-4 shadow-2xl transition-all active:scale-95"
                    >
                        <WhatsAppIcon />
                        <span className="uppercase tracking-widest text-sm">Contacter l'équipe</span>
                    </a>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
