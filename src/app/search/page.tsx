'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Filter, MapPin, Tag } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function SearchPage() {
    const router = useRouter();
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
        // Logic to filter products
        // For mock, just go back to home or show results
        router.push('/?search=true');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
                </button>
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-chocolate"
                        autoFocus
                    />
                </div>
            </div>

            <div className="p-4 space-y-8">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-chocolate" />
                    <h2 className="font-bold text-lg">Filtres</h2>
                </div>

                {/* Category Filter */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Catégorie</label>
                    <div className="flex flex-wrap gap-2">
                        {['Tout', 'Mode', 'Électronique', 'Maison', 'Véhicules', 'Services'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${category === cat
                                        ? 'bg-chocolate text-white border-chocolate'
                                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-4 uppercase tracking-wide">Prix (FCFA)</label>
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="1000000"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-chocolate"
                        />
                        <div className="flex justify-between mt-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                            <span>0 FCFA</span>
                            <span>1 000 000+ FCFA</span>
                        </div>
                    </div>
                </div>

                {/* Location Filter */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Localisation</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                        <select
                            className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium appearance-none"
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Partout</option>
                            <option value="Abidjan">Abidjan</option>
                            <option value="Dakar">Dakar</option>
                            <option value="Lomé">Lomé</option>
                            <option value="Cotonou">Cotonou</option>
                            <option value="Bamako">Bamako</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={handleSearch}
                    className="w-full py-3.5 bg-chocolate text-white font-bold rounded-xl shadow-lg hover:bg-[#b05515] transition-colors"
                >
                    Afficher les résultats (124)
                </button>
            </div>
        </div>
    );
}
