'use client';

import {
    Car,
    Home,
    Briefcase,
    Smartphone,
    Shirt,
    MoreHorizontal,
    Utensils,
    Hammer
} from 'lucide-react';
import { useState } from 'react';

const categories = [
    { id: 'all', label: 'Tout', icon: MoreHorizontal },
    { id: 'vehicles', label: 'Voitures', icon: Car },
    { id: 'property', label: 'Immobilier', icon: Home },
    { id: 'jobs', label: 'Emplois', icon: Briefcase },
    { id: 'electronics', label: 'Tech', icon: Smartphone },
    { id: 'fashion', label: 'Mode', icon: Shirt },
    { id: 'food', label: 'Nourriture', icon: Utensils },
    { id: 'services', label: 'Services', icon: Hammer },
];

export default function CategoryBar() {
    const [selected, setSelected] = useState('all');
    const [showModal, setShowModal] = useState(false);

    const handleCategoryClick = (id: string) => {
        if (['property', 'vehicles', 'jobs', 'food'].includes(id)) {
            setShowModal(true);
            return;
        }
        setSelected(id);
    };

    return (
        <div className="w-full overflow-x-auto no-scrollbar py-4 pl-4 space-x-4 flex items-start">
            {categories.map((cat) => {
                const isSelected = selected === cat.id;
                const Icon = cat.icon;

                return (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="flex flex-col items-center gap-2 min-w-[64px] group"
                    >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-chocolate/5 ${isSelected
                                ? 'bg-chocolate text-beige shadow-chocolate/30 scale-110'
                                : 'bg-beige text-chocolate group-hover:bg-chocolate/10'
                            }`}>
                            <Icon className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <span className={`text-[10px] font-bold tracking-wide transition-colors ${isSelected ? 'text-chocolate' : 'text-gray-500'
                            }`}>
                            {cat.label}
                        </span>
                    </button>
                );
            })}

            {/* Simple Modal for "Coming Soon" */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl skew-y-1">
                        <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <Hammer className="w-8 h-8 text-chocolate" />
                        </div>
                        <h3 className="text-xl font-bold text-chocolate mb-2">Bientôt disponible !</h3>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            Cette catégorie est à venir très bientôt mais n&apos;est pas encore disponible pour le moment.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-chocolate text-beige font-bold py-3 px-8 rounded-xl w-full active:scale-95 transition-transform"
                        >
                            Compris
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
