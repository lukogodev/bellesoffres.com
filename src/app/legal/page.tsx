'use client';

import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import { Shield, Lock, FileText, Scale } from 'lucide-react';

export default function LegalPage() {
    const sections = [
        {
            title: "Conditions d'Utilisation",
            icon: FileText,
            content: "En utilisant Belles Offres, vous acceptez de ne publier que des articles réels et de respecter les lois en vigueur en RDC. Toute fraude entraînera une suppression définitive du compte."
        },
        {
            title: "Politique de Confidentialité",
            icon: Lock,
            content: "Vos données personnelles sont protégées et ne sont jamais vendues à des tiers. Nous n'utilisons vos informations que pour faciliter les transactions et améliorer votre expérience."
        },
        {
            title: "Sécurité des Transactions",
            icon: Shield,
            content: "Belles Offres agit en tant que plateforme de mise en relation. Nous recommandons de toujours vérifier le produit avant paiement et de privilégier les lieux publics pour les rencontres."
        },
        {
            title: "Mentions Légales",
            icon: Scale,
            content: "Propriété de Belles Offres SARL. Immatriculé à Kinshasa. Pour toute réclamation, contactez-nous via le support WhatsApp officiel."
        }
    ];

    return (
        <AppContainer>
            <PageHeader variant="page" title="Informations Légales" />

            <main className="max-w-[1280px] mx-auto px-4 py-12">
                <div className="space-y-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-8 border border-chocolate/5 shadow-xl hover:shadow-2xl transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-beige/30 rounded-2xl text-chocolate">
                                    <section.icon size={28} />
                                </div>
                                <h2 className="text-xl font-black text-chocolate uppercase tracking-tight">{section.title}</h2>
                            </div>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center p-10 bg-chocolate rounded-[2.5rem] text-beige">
                    <p className="text-sm font-bold opacity-70 mb-2">Besoin d'aide supplémentaire ?</p>
                    <p className="text-xs font-medium">L'équipe support est disponible 24/7 pour répondre à vos questions juridiques ou techniques.</p>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
