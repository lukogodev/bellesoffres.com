'use client';

import {
    Car,
    Home,
    Briefcase,
    Smartphone,
    Shirt,
    MoreHorizontal,
    Utensils,
    Hammer,
    Leaf
} from 'lucide-react';
import { useState } from 'react';

const categories = [
    { id: 'phones', label: 'Téléphones', icon: Smartphone },
    { id: 'fashion', label: 'Mode', icon: Shirt },
    { id: 'vehicles', label: 'Véhicules', icon: Car },
    { id: 'jobs', label: 'Loggments', icon: Briefcase },
    { id: 'property', label: 'Terrains', icon: Home },
    { id: 'food', label: 'Nourriture', icon: Utensils },
    { id: 'services', label: 'Services', icon: Hammer },
    { id: 'nature', label: 'Autre', icon: Leaf },
];

export default function CategoryBar() {
    const [selected, setSelected] = useState('phones');
    const [showModal, setShowModal] = useState(false);

    const handleCategoryClick = (id: string) => {
        setSelected(id);
    };

    return (
        <div className="w-full bg-white border-b border-[#D7CCC8]/30">
            {/* Titre section */}
            <div className="px-4 pt-6 pb-2">
                <h2 className="text-base font-black text-[#3E2723] tracking-tight">Catégories</h2>
            </div>

            {/* Liste scrollable */}
            <div className="w-full overflow-x-auto no-scrollbar py-3 px-4 flex items-start gap-5">
                {categories.map((cat) => {
                    const isSelected = selected === cat.id;
                    const Icon = cat.icon;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className="flex flex-col items-center gap-2 min-w-[72px] group transition-all"
                        >
                            {/* Icône container — grand cercle */}
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${isSelected
                                    ? 'bg-[#5D4037] border-[#5D4037] shadow-lg shadow-[#5D4037]/30 scale-105'
                                    : 'bg-white border-[#D7CCC8] group-hover:border-[#5D4037]/40 group-hover:bg-[#FAF9F6]'
                                }`}>
                                <Icon
                                    className={`w-7 h-7 stroke-[1.75] transition-colors ${isSelected
                                            ? 'text-[#D7CCC8]'
                                            : 'text-[#5D4037] group-hover:text-[#3E2723]'
                                        }`}
                                />
                            </div>

                            {/* Label */}
                            <span className={`text-[10px] font-bold tracking-wide text-center leading-tight max-w-[68px] transition-colors ${isSelected
                                    ? 'text-[#5D4037]'
                                    : 'text-[#5D4037]/50 group-hover:text-[#5D4037]/80'
                                }`}>
                                {cat.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
