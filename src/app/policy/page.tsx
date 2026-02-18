'use client';

import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import { Eye, ShieldAlert, Database, BellRing } from 'lucide-react';

export default function PolicyPage() {
    const policies = [
        {
            title: "Collecte des Données",
            icon: Database,
            content: "Nous collectons uniquement les informations nécessaires au bon fonctionnement de votre boutique : nom, numéro de téléphone et localisation. Aucune donnée n'est collectée sans votre consentement explicite."
        },
        {
            title: "Utilisation des Cookies",
            icon: Eye,
            content: "Nous utilisons des cookies pour mémoriser vos préférences et améliorer la vitesse de l'application. Vous pouvez les désactiver dans les paramètres de votre navigateur."
        },
        {
            title: "Protection & Sécurité",
            icon: ShieldAlert,
            content: "Toutes vos données sont cryptées et stockées sur des serveurs sécurisés. Nous utilisons les protocoles les plus stricts pour empêcher tout accès non autorisé."
        },
        {
            title: "Vos Droits",
            icon: BellRing,
            content: "Vous disposez d'un droit d'accès, de rectification et de suppression de toutes vos données. Vous pouvez supprimer votre compte à tout moment depuis les paramètres."
        }
    ];

    return (
        <AppContainer>
            <PageHeader variant="page" title="Confidentialité" />

            <main className="max-w-[1280px] mx-auto px-4 py-12">
                <div className="bg-beige/10 border-2 border-chocolate/5 rounded-[3rem] p-8 md:p-12 mb-12">
                    <h2 className="text-2xl font-black text-chocolate uppercase tracking-tighter mb-6 text-center">Engagement de Confidentialité</h2>
                    <p className="text-gray-600 font-medium leading-relaxed text-center max-w-2xl mx-auto">
                        Chez Belles Offres, le respect de votre vie privée est notre priorité absolue.
                        Cette page détaille la manière dont nous traitons vos informations avec le plus grand soin.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {policies.map((p, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-chocolate/5 shadow-lg flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-14 h-14 bg-chocolate text-beige rounded-2xl flex items-center justify-center shrink-0">
                                <p.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-chocolate uppercase tracking-tight mb-2">{p.title}</h3>
                                <p className="text-sm text-gray-500 font-bold leading-relaxed">{p.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
