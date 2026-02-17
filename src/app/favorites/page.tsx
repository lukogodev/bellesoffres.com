'use client';

import { Product } from '@/types';
import data from '@/mock/data.json';
import ListingCard from '@/components/ListingCard';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
    const favorites = (data.products as Product[]).filter(p => p.isFavorite);

    return (
        <AppContainer className="bg-gray-50">
            {/* Header avec PageHeader */}
            <PageHeader
                variant="page"
                title="Mes Favoris"
                icon={<Heart size={20} className="fill-current" />}
                rightContent={
                    <span className="text-[10px] font-black bg-beige text-chocolate px-2.5 py-1 rounded-full shadow-sm">
                        {favorites.length} ARTICLES
                    </span>
                }
            />

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {favorites.map((product) => (
                            <ListingCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        <div className="w-20 h-20 bg-beige rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <Heart size={40} className="text-chocolate/20" />
                        </div>
                        <h2 className="text-xl font-bold text-chocolate mb-2">Votre liste est vide</h2>
                        <p className="text-sm text-gray-500 max-w-xs mx-auto mb-8">
                            Enregistrez les articles qui vous plaisent pour les retrouver facilement ici.
                        </p>
                        <Link href="/" className="bg-chocolate text-beige px-8 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-transform">
                            Découvrir les offres
                        </Link>
                    </div>
                )}
            </main>

            <BottomNav />
        </AppContainer>
    );
}
