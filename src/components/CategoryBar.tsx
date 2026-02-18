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
        <div className="w-full bg-chocolate border-b border-white/5">
            <div className="w-full overflow-x-auto no-scrollbar py-6 px-4 space-x-8 flex items-start bg-chocolate">
                {categories.map((cat) => {
                    const isSelected = selected === cat.id;
                    const Icon = cat.icon;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className="flex flex-col items-center gap-2 min-w-[70px] group transition-all"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isSelected
                                ? 'bg-beige text-chocolate shadow-lg shadow-black/20 scale-105'
                                : 'bg-beige/10 text-beige/60 group-hover:bg-beige/20 group-hover:text-beige'
                                }`}>
                                <Icon className="w-5 h-5 stroke-[2]" />
                            </div>
                            <span className={`text-[9px] font-black tracking-widest uppercase transition-colors ${isSelected ? 'text-beige' : 'text-beige/40 group-hover:text-beige/60'
                                }`}>
                                {cat.label}
                            </span>
                        </button>
                    );
                })}
            </div>

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
