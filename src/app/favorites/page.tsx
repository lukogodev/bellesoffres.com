'use client';

import { Product } from '@/types';
import data from '@/mock/data.json';
import ListingCard from '@/components/ListingCard';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import { Heart, Search } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
    const favorites = (data.products as Product[]).filter(p => p.isFavorite);

    return (
        <AppContainer className="bg-gray-50">
            <PageHeader
                variant="page"
                title="MA LISTE DE SOUHAITS"
                rightContent={
                    <div className="flex bg-beige/20 rounded-full p-1 border border-beige/30">
                        <div className="bg-beige text-chocolate px-4 py-1.5 rounded-full text-[10px] font-[900] tracking-tighter uppercase shadow-sm">
                            {favorites.length} ARTICLES
                        </div>
                    </div>
                }
            />

            <main className="max-w-[1280px] mx-auto px-4 py-8 pb-32">
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                        {favorites.map((product, idx) => (
                            <div
                                key={product.id}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <ListingCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white rounded-[3rem] shadow-xl border border-chocolate/5">
                        <div className="w-28 h-28 bg-beige/40 rounded-full flex items-center justify-center mb-8 shadow-inner animate-pulse">
                            <Heart size={48} className="text-chocolate/10 fill-current" />
                        </div>
                        <h2 className="text-2xl font-black text-chocolate uppercase tracking-tighter mb-4">C'est bien calme ici...</h2>
                        <p className="text-sm text-gray-400 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
                            Vous n'avez pas encore ajouté de coups de cœur. Explorez nos dernières offres et enregistrez vos pépites !
                        </p>
                        <Link
                            href="/"
                            className="bg-chocolate hover:bg-black text-beige px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-chocolate/20 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
                        >
                            <Search size={20} />
                            Trouver des Belles Offres
                        </Link>
                    </div>
                )}
            </main>

            <BottomNav />
        </AppContainer>
    );
}
