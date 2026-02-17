'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import { Edit3, Trash2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [selectedReason, setSelectedReason] = useState<string>('');

    const deleteReasons = [
        { id: 'sold', label: 'Produit déjà vendu' },
        { id: 'damaged', label: 'Produit en mauvais état' },
        { id: 'outofstock', label: 'Produit en rupture de Stock' },
        { id: 'other', label: 'Autres raisons' }
    ];

    const handleDelete = () => {
        if (!selectedReason) {
            alert('Veuillez sélectionner une raison');
            return;
        }

        // Logique de suppression
        if (confirm('Êtes-vous sûr de vouloir supprimer définitivement ce produit ?')) {
            console.log('Produit supprimé pour la raison:', selectedReason);
            alert('Produit supprimé avec succès');
            router.push('/profile');
        }
    };

    return (
        <AppContainer>
            <PageHeader
                variant="page"
                title="Modifier le produit"
            />

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bouton Modifier */}
                    <Link
                        href={`/product/edit/${params.id}/update`}
                        className="bg-white border-2 border-chocolate rounded-3xl p-8 hover:bg-beige/10 transition-all group shadow-lg hover:shadow-2xl"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-20 h-20 bg-chocolate rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Edit3 className="w-10 h-10 text-beige" />
                            </div>
                            <h3 className="text-lg font-black text-chocolate uppercase tracking-wide">
                                1. Modifier les Informations
                            </h3>
                            <p className="text-sm text-gray-600 font-medium">
                                Modifier le nom, prix, description, images, vidéo et autres détails de votre produit
                            </p>
                        </div>
                    </Link>

                    {/* Bouton Supprimer */}
                    <button
                        onClick={() => document.getElementById('delete-modal')?.classList.remove('hidden')}
                        className="bg-white border-2 border-red-500 rounded-3xl p-8 hover:bg-red-50 transition-all group shadow-lg hover:shadow-2xl"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Trash2 className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-lg font-black text-red-500 uppercase tracking-wide">
                                2. Supprimer le Produit
                            </h3>
                            <p className="text-sm text-gray-600 font-medium">
                                Supprimer définitivement ce produit de votre boutique
                            </p>
                        </div>
                    </button>
                </div>

                {/* Modal de Suppression */}
                <div
                    id="delete-modal"
                    className="hidden fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            e.currentTarget.classList.add('hidden');
                        }
                    }}
                >
                    <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl">
                        <h2 className="text-xl font-black text-chocolate mb-6 uppercase tracking-wide text-center">
                            Pourquoi souhaitez-vous supprimer votre produit ?
                        </h2>

                        {/* Options de raison */}
                        <div className="space-y-3 mb-6">
                            {deleteReasons.map((reason) => (
                                <button
                                    key={reason.id}
                                    onClick={() => setSelectedReason(reason.id)}
                                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all ${selectedReason === reason.id
                                            ? 'bg-chocolate text-beige border-chocolate'
                                            : 'bg-gray-50 text-chocolate border-gray-200 hover:border-chocolate/40'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedReason === reason.id
                                                ? 'border-beige bg-beige'
                                                : 'border-gray-400'
                                            }`}>
                                            {selectedReason === reason.id && (
                                                <div className="w-3 h-3 rounded-full bg-chocolate"></div>
                                            )}
                                        </div>
                                        <span>{reason.label}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Bouton Supprimer */}
                        <button
                            onClick={handleDelete}
                            disabled={!selectedReason}
                            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all mb-4 ${selectedReason
                                    ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Supprimer Définitivement le Produit
                        </button>

                        {/* Message d'alerte */}
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs font-bold text-red-700 leading-relaxed">
                                ATTENTION : SI VOUS CLIQUEZ SUR SUPPRIMER LE PRODUIT, VOUS NE POURREZ PLUS RÉCUPÉRER CE PRODUIT À MOINS QUE VOUS NE LE REPUBLIEZ À NOUVEAU. CETTE ACTION EST IRRÉVERSIBLE.
                            </p>
                        </div>

                        {/* Bouton Annuler */}
                        <button
                            onClick={() => document.getElementById('delete-modal')?.classList.add('hidden')}
                            className="w-full mt-4 py-3 rounded-2xl border-2 border-gray-300 font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
