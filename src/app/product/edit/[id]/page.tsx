'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Camera, Trash2, Save } from "lucide-react";
import { Product } from "@/types";
import data from "@/mock/data.json";
import Image from "next/image";

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (params.id) {
            const found = (data.products as Product[]).find((p) => p.id === params.id);
            setProduct(found || null);
        }
    }, [params]);

    if (!product) return <div className="flex justify-center items-center h-screen">Chargement...</div>;

    // Condition check simulation: In real app, check session user ID vs product.seller.id
    // For now we assume access is granted if they land here

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-24">
            <header className="sticky top-0 z-10 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
                </button>
                <h1 className="text-lg font-bold">Modifier l'annonce</h1>
                <button className="text-chocolate font-bold text-sm flex items-center gap-1">
                    <Save className="w-4 h-4" />
                    Sauver
                </button>
            </header>

            <div className="p-4 space-y-6">
                {/* Image Preview / Edit */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-black/50 text-white p-3 rounded-full backdrop-blur-md">
                            <Camera className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Editable Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Titre</label>
                        <input
                            type="text"
                            defaultValue={product.title}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Prix</label>
                            <input
                                type="number"
                                defaultValue={product.price}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Devise</label>
                            <select
                                defaultValue={product.currency}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium appearance-none"
                            >
                                <option>FCFA</option>
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Description</label>
                        <textarea
                            rows={4}
                            defaultValue="Description actuelle du produit..."
                            className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-chocolate transition-all font-medium resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                        <button className="w-full p-3 bg-red-50 text-red-600 font-bold rounded-xl text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Supprimer l'annonce
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
