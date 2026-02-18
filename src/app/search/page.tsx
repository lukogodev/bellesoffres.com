'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, MapPin, Zap, ArrowLeft, X } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import ListingCard from '@/components/ListingCard';
import SearchFilter, { FilterValues } from '@/components/SearchFilter';
import data from '@/mock/data.json';
import { Product } from '@/types';

export default function SearchPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [results, setResults] = useState<Product[]>([]);
    const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);

    useEffect(() => {
        // Initial search results
        setResults(data.products as Product[]);
    }, []);

    const handleFilterApply = (filters: FilterValues) => {
        setActiveFilters(filters);
        // Ici on filtrerait normalement les donnees
        console.log('Filtres appliqués:', filters);
    };

    return (
        <AppContainer>
            {/* Header avec barre de recherche intégrée */}
            <div className="sticky top-0 z-[60] bg-chocolate pb-6">
                <div className="max-w-[1280px] mx-auto px-4 pt-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 text-beige hover:bg-beige/10 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/30 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Que cherchez-vous ?"
                                className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl text-[14px] font-bold text-chocolate placeholder:text-chocolate/20 focus:outline-none focus:ring-4 focus:ring-beige/30 transition-all shadow-inner"
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-chocolate/30 hover:text-chocolate"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className={`p-4 rounded-2xl border backdrop-blur-md transition-all active:scale-90 ${activeFilters
                                    ? 'bg-beige text-chocolate border-beige'
                                    : 'bg-beige/10 text-beige border-beige/20'
                                }`}
                        >
                            <SlidersHorizontal className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                {/* Status bar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h2 className="text-xl font-[900] text-chocolate uppercase tracking-tight">
                            Résultats de recherche
                        </h2>
                        {activeFilters && (
                            <p className="text-[10px] font-black text-chocolate/40 uppercase tracking-widest">
                                Filtres : {activeFilters.category || 'Toutes catégories'} • {activeFilters.city || activeFilters.country}
                            </p>
                        )}
                    </div>
                    <div className="bg-beige text-chocolate px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                        {results.length} ARTICLES
                    </div>
                </div>

                {/* Grid */}
                {results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {results.map((product) => (
                            <ListingCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-beige rounded-full flex items-center justify-center">
                            <Search className="w-10 h-10 text-chocolate opacity-20" />
                        </div>
                        <h3 className="text-lg font-black text-chocolate uppercase">Aucun résultat trouvé</h3>
                        <p className="text-gray-400 font-medium text-sm">Essayez de modifier vos filtres ou votre recherche.</p>
                        <button
                            onClick={() => { setActiveFilters(null); setSearchQuery(''); }}
                            className="text-chocolate font-black text-xs uppercase tracking-widest underline decoration-2 underline-offset-4"
                        >
                            Réinitialiser tout
                        </button>
                    </div>
                )}
            </main>

            <SearchFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={handleFilterApply}
            />

            <BottomNav />
        </AppContainer>
    );
}
