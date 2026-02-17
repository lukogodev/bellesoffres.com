'use client';

import { MapPin, X, Check } from 'lucide-react';
import { useState } from 'react';

export default function LocationFilter({
    isOpen,
    onClose,
    onApply
}: {
    isOpen: boolean;
    onClose: () => void;
    onApply: (loc: string) => void;
}) {
    const [selected, setSelected] = useState('');

    const locations = [
        "Abidjan, Côte d'Ivoire",
        "Dakar, Sénégal",
        "Lomé, Togo",
        "Cotonou, Bénin",
        "Bamako, Mali",
        "Ouagadougou, Burkina Faso",
        "Yaoundé, Cameroun",
        "Douala, Cameroun",
        "Paris, France (Diaspora)"
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="bg-white w-full sm:w-96 rounded-t-3xl sm:rounded-3xl p-6 pointer-events-auto transform transition-transform duration-300 ease-out shadow-2xl safe-pb">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MapPin className="text-chocolate w-6 h-6" />
                        Sélectionner une ville
                    </h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
                    {locations.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => setSelected(loc)}
                            className={`w-full p-4 rounded-xl flex items-center justify-between text-left transition-colors ${selected === loc
                                    ? 'bg-chocolate/10 text-chocolate ring-1 ring-chocolate'
                                    : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            <span className="font-medium">{loc}</span>
                            {selected === loc && <Check className="w-5 h-5" />}
                        </button>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => { onApply(selected); onClose(); }}
                        disabled={!selected}
                        className="w-full py-4 bg-chocolate text-beige font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                    >
                        Appliquer la zone
                    </button>
                </div>
            </div>
        </div>
    );
}
