'use client';

import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import { Target, Users, Heart, Award } from 'lucide-react';

export default function AboutPage() {
    const values = [
        {
            title: "Notre Mission",
            icon: Target,
            content: "Faciliter le commerce de proximité en Afrique grâce à une plateforme digitale moderne, sécurisée et dynamique."
        },
        {
            title: "Notre Communauté",
            icon: Users,
            content: "Plus de 100 000 vendeurs et acheteurs nous font confiance chaque jour pour leurs transactions quotidiennes."
        },
        {
            title: "Nos Valeurs",
            icon: Heart,
            content: "Intégrité, innovation et accessibilité sont au cœur de tout ce que nous entreprenons pour nos utilisateurs."
        },
        {
            title: "Notre Engagement",
            icon: Award,
            content: "Nous nous engageons à offrir la meilleure expérience utilisateur possible avec un support client réactif."
        }
    ];

    return (
        <AppContainer>
            <PageHeader variant="page" title="À Propos de Nous" />

            <main className="max-w-[1280px] mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-chocolate uppercase tracking-tighter mb-6">Belles Offres</h2>
                    <p className="text-xl text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed">
                        La marketplace préférée des Congolais pour vendre et acheter en toute simplicité.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {values.map((v, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-chocolate/5 shadow-xl space-y-4">
                            <div className="w-16 h-16 bg-beige rounded-2xl flex items-center justify-center text-chocolate">
                                <v.icon size={32} />
                            </div>
                            <h3 className="text-xl font-black text-chocolate uppercase tracking-tight">{v.title}</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">{v.content}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-chocolate rounded-[3rem] p-12 text-center text-beige">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Rejoignez l'Aventure</h3>
                    <p className="text-beige/70 font-medium mb-8">Belles Offres est en pleine expansion et nous cherchons toujours à nous améliorer.</p>
                    <div className="flex justify-center gap-4">
                        <div className="px-6 py-3 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest">Innovation</div>
                        <div className="px-6 py-3 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest">Confiance</div>
                        <div className="px-6 py-3 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest">Proximité</div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
