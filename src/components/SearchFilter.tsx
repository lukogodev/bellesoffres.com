'use client';

import { useState } from 'react';
import { X, MapPin, Tag, DollarSign, ShoppingBag } from 'lucide-react';

interface SearchFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterValues) => void;
}

export interface FilterValues {
    category: string;
    priceMin: string;
    priceMax: string;
    country: string;
    city: string;
    state: 'neuf' | 'occasion' | '';
}

// 14 Catégories de produits physiques
const categories = [
    'Véhicules',
    'Téléphones',
    'Mode Homme',
    'Mode Femme',
    'Chaussures',
    'Informatique',
    'Électroménager',
    'Beauté & Soins',
    'Maison & Déco',
    'Électronique',
    'Bébé & Enfant',
    'Sport & Loisirs',
    'Alimentation',
    'Divers'
];

// Pays francophones d'Afrique
const countries = [
    { name: 'RD Congo', code: 'CD' },
    { name: 'Sénégal', code: 'SN' },
    { name: 'Côte d\'Ivoire', code: 'CI' },
    { name: 'Cameroun', code: 'CM' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Congo-Brazzaville', code: 'CG' },
    { name: 'Bénin', code: 'BJ' },
    { name: 'Togo', code: 'TG' },
    { name: 'Guinée', code: 'GN' },
    { name: 'Mali', code: 'ML' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Madagascar', code: 'MG' }
];

// Villes par pays
const citiesByCountry: { [key: string]: string[] } = {
    'RD Congo': [
        // Provinces et principales villes de RDC
        'Kinshasa', 'Masina', 'N\'Sele',
        'Butembo', 'Goma', 'Beni',
        'Bukavu', 'Uvira', 'Baraka',
        'Lubumbashi', 'Likasi', 'Kasumbalesa',
        'Kolwezi', 'Kasaji', 'Mutshatsha',
        'Kisangani', 'Isangi', 'Yangambi',
        'Matadi', 'Boma', 'Muanda',
        'Bunia', 'Mahagi', 'Aru',
        'Isiro', 'Watsa', 'Dungu',
        'Mbuji-Mayi', 'Miabi', 'Tshilenge',
        'Kananga', 'Demba', 'Dibaya',
        'Mbandaka', 'Bikoro', 'Lukolela',
        'Kalemie', 'Kongolo', 'Moba'
    ],
    'Sénégal': ['Dakar', 'Thiès', 'Saint-Louis'],
    'Côte d\'Ivoire': ['Abidjan', 'Yamoussoukro', 'Bouaké'],
    'Cameroun': ['Douala', 'Yaoundé', 'Garoua'],
    'Gabon': ['Libreville', 'Port-Gentil', 'Franceville'],
    'Congo-Brazzaville': ['Brazzaville', 'Pointe-Noire', 'Dolisie'],
    'Bénin': ['Cotonou', 'Porto-Novo', 'Parakou'],
    'Togo': ['Lomé', 'Kara', 'Atakpamé'],
    'Guinée': ['Conakry', 'Nzérékoré', 'Kankan'],
    'Mali': ['Bamako', 'Sikasso', 'Mopti'],
    'Burkina Faso': ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou'],
    'Rwanda': ['Kigali', 'Gisenyi', 'Butare'],
    'Burundi': ['Bujumbura', 'Gitega', 'Ngozi'],
    'Madagascar': ['Antananarivo', 'Toamasina', 'Antsirabe']
};

export default function SearchFilter({ isOpen, onClose, onApply }: SearchFilterProps) {
    const [filters, setFilters] = useState<FilterValues>({
        category: '',
        priceMin: '',
        priceMax: '',
        country: 'RD Congo',
        city: '',
        state: ''
    });

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        setFilters({
            category: '',
            priceMin: '',
            priceMax: '',
            country: 'RD Congo',
            city: '',
            state: ''
        });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay sombre */}
            <div
                className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
                onClick={onClose}
            />

            {/* Panneau latéral droit */}
            <div className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-white z-[101] shadow-2xl overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-chocolate text-beige px-6 py-4 flex items-center justify-between shadow-lg z-10">
                    <h2 className="text-lg font-black uppercase tracking-wider flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Filtrer la Recherche
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-beige/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Contenu */}
                <div className="p-6 space-y-6">
                    {/* 1. CATÉGORIE */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-xs font-black text-chocolate uppercase tracking-widest">
                            <ShoppingBag className="w-4 h-4" />
                            1. Sélectionner une Catégorie
                        </label>
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="w-full p-4 bg-beige/20 border-2 border-chocolate/10 rounded-2xl focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-chocolate outline-none"
                        >
                            <option value="">Toutes les catégories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* 2. PRIX MIN ET MAX */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-xs font-black text-chocolate uppercase tracking-widest">
                            <DollarSign className="w-4 h-4" />
                            2. Prix (FCFA)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[9px] font-bold text-chocolate/60 uppercase mb-2 ml-2">
                                    Prix Minimum
                                </label>
                                <input
                                    type="number"
                                    value={filters.priceMin}
                                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                                    placeholder="0"
                                    className="w-full p-4 bg-beige/20 border-2 border-chocolate/10 rounded-2xl focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-chocolate outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[9px] font-bold text-chocolate/60 uppercase mb-2 ml-2">
                                    Prix Maximum
                                </label>
                                <input
                                    type="number"
                                    value={filters.priceMax}
                                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                                    placeholder="999999"
                                    className="w-full p-4 bg-beige/20 border-2 border-chocolate/10 rounded-2xl focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-chocolate outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. LOCALISATION */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-xs font-black text-chocolate uppercase tracking-widest">
                            <MapPin className="w-4 h-4" />
                            3. Localisation
                        </label>

                        {/* Pays */}
                        <div>
                            <label className="block text-[9px] font-bold text-chocolate/60 uppercase mb-2 ml-2">
                                Pays
                            </label>
                            <select
                                value={filters.country}
                                onChange={(e) => {
                                    setFilters({ ...filters, country: e.target.value, city: '' });
                                }}
                                className="w-full p-4 bg-beige/20 border-2 border-chocolate/10 rounded-2xl focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-chocolate outline-none"
                            >
                                {countries.map((country) => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Ville */}
                        <div>
                            <label className="block text-[9px] font-bold text-chocolate/60 uppercase mb-2 ml-2">
                                Ville
                            </label>
                            <select
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                className="w-full p-4 bg-beige/20 border-2 border-chocolate/10 rounded-2xl focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-chocolate outline-none"
                            >
                                <option value="">Toutes les villes</option>
                                {citiesByCountry[filters.country]?.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 4. ÉTAT DU PRODUIT */}
                    <div className="space-y-3">
                        <label className="text-xs font-black text-chocolate uppercase tracking-widest">
                            4. État du Produit
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setFilters({ ...filters, state: filters.state === 'neuf' ? '' : 'neuf' })}
                                className={`p-4 rounded-2xl border-2 font-bold text-sm uppercase tracking-wider transition-all ${filters.state === 'neuf'
                                        ? 'bg-chocolate text-beige border-chocolate shadow-lg'
                                        : 'bg-beige/20 text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                    }`}
                            >
                                <div className={`w-5 h-5 mx-auto mb-1 rounded-full border-2 flex items-center justify-center ${filters.state === 'neuf' ? 'border-beige' : 'border-chocolate/30'
                                    }`}>
                                    {filters.state === 'neuf' && (
                                        <div className="w-3 h-3 rounded-full bg-beige"></div>
                                    )}
                                </div>
                                Neuf
                            </button>
                            <button
                                onClick={() => setFilters({ ...filters, state: filters.state === 'occasion' ? '' : 'occasion' })}
                                className={`p-4 rounded-2xl border-2 font-bold text-sm uppercase tracking-wider transition-all ${filters.state === 'occasion'
                                        ? 'bg-chocolate text-beige border-chocolate shadow-lg'
                                        : 'bg-beige/20 text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                    }`}
                            >
                                <div className={`w-5 h-5 mx-auto mb-1 rounded-full border-2 flex items-center justify-center ${filters.state === 'occasion' ? 'border-beige' : 'border-chocolate/30'
                                    }`}>
                                    {filters.state === 'occasion' && (
                                        <div className="w-3 h-3 rounded-full bg-beige"></div>
                                    )}
                                </div>
                                Occasion
                            </button>
                        </div>
                    </div>

                    {/* Résumé des filtres actifs */}
                    <div className="bg-beige/20 rounded-2xl p-4 border-2 border-chocolate/10">
                        <h3 className="text-xs font-black text-chocolate uppercase tracking-wider mb-3">
                            Filtres Actifs
                        </h3>
                        <div className="space-y-2 text-sm">
                            {filters.category && (
                                <div className="flex items-center gap-2 text-chocolate">
                                    <span className="font-bold">Catégorie:</span>
                                    <span className="font-medium">{filters.category}</span>
                                </div>
                            )}
                            {(filters.priceMin || filters.priceMax) && (
                                <div className="flex items-center gap-2 text-chocolate">
                                    <span className="font-bold">Prix:</span>
                                    <span className="font-medium">
                                        {filters.priceMin || '0'} - {filters.priceMax || '∞'} FCFA
                                    </span>
                                </div>
                            )}
                            {filters.country && (
                                <div className="flex items-center gap-2 text-chocolate">
                                    <span className="font-bold">Lieu:</span>
                                    <span className="font-medium">
                                        {filters.city ? `${filters.city}, ` : ''}{filters.country}
                                    </span>
                                </div>
                            )}
                            {filters.state && (
                                <div className="flex items-center gap-2 text-chocolate">
                                    <span className="font-bold">État:</span>
                                    <span className="font-medium capitalize">{filters.state}</span>
                                </div>
                            )}
                            {!filters.category && !filters.priceMin && !filters.priceMax && !filters.city && !filters.state && (
                                <p className="text-chocolate/50 font-medium italic">Aucun filtre actif</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Boutons d'action (sticky en bas) */}
                <div className="sticky bottom-0 bg-white border-t-2 border-gray-100 p-6 space-y-3 shadow-2xl">
                    <button
                        onClick={handleApply}
                        className="w-full py-4 bg-whatsapp hover:bg-[#1ebc57] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl active:scale-95 transition-all"
                    >
                        Appliquer les Filtres
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full py-3 bg-white border-2 border-chocolate/20 text-chocolate rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-beige/10 active:scale-95 transition-all"
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>
        </>
    );
}
