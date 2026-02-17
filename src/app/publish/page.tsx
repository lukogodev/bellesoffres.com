'use client';

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import { Camera, MapPin, Tag, Plus, Trash2, ChevronLeft, Info, HelpCircle } from "lucide-react";
import Link from 'next/link';

export default function PublishPage() {
    const [images, setImages] = useState<string[]>([]);
    const [specs, setSpecs] = useState<{ label: string; value: string }[]>([]);

    const handleImageUpload = () => {
        setImages([...images, "https://placehold.co/400x400/F5F5DC/2B1700.png?text=Photo"]);
    };

    const addSpec = () => {
        setSpecs([...specs, { label: "", value: "" }]);
    };

    const removeSpec = (index: number) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };

    const updateSpec = (index: number, field: 'label' | 'value', val: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = val;
        setSpecs(newSpecs);
    };

    return (
        <AppContainer>
            {/* Header Publish Page */}
            <PageHeader
                variant="page"
                title="Vendre"
                rightContent={
                    <button className="bg-beige text-chocolate px-6 py-2 rounded-full font-[900] text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                        Publier
                    </button>
                }
            />

            <main className="max-w-[1280px] mx-auto px-4 py-12">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-chocolate/5 p-8 md:p-12">
                    <div className="space-y-12">

                        {/* 1. Image Upload */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-chocolate uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-chocolate text-beige flex items-center justify-center text-[8px]">01</span>
                                Photos du produit
                            </h3>
                            <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
                                <button
                                    onClick={handleImageUpload}
                                    className="w-32 h-32 flex-shrink-0 border-[3px] border-dashed border-chocolate/20 rounded-[2rem] flex flex-col items-center justify-center gap-2 text-chocolate/40 bg-gray-50 hover:bg-beige/20 hover:border-chocolate/40 transition-all group"
                                >
                                    <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                        <Camera size={32} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Ajouter</span>
                                </button>

                                {images.map((img, idx) => (
                                    <div key={idx} className="w-32 h-32 flex-shrink-0 rounded-[2rem] overflow-hidden relative shadow-lg group border-2 border-white">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                            className="absolute top-2 right-2 bg-chocolate text-beige rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Infos de Base */}
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black text-chocolate uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-chocolate text-beige flex items-center justify-center text-[8px]">02</span>
                                Informations
                            </h3>

                            <div className="space-y-6">
                                <div className="group">
                                    <label className="block text-[9px] font-black text-chocolate/40 uppercase ml-4 mb-2 tracking-widest">Titre de l'annonce</label>
                                    <input
                                        type="text"
                                        placeholder="Que vendez-vous ?"
                                        className="w-full p-6 bg-gray-50 rounded-3xl border-none focus:ring-[6px] focus:ring-beige transition-all font-black text-lg text-black placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-[9px] font-black text-chocolate/40 uppercase ml-4 mb-2 tracking-widest">Prix de vente</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="w-full p-6 bg-gray-50 rounded-3xl border-none focus:ring-[6px] focus:ring-beige transition-all font-black text-lg text-black"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-[9px] font-black text-chocolate/40 uppercase ml-4 mb-2 tracking-widest">Devise</label>
                                        <select className="w-full p-6 bg-gray-50 rounded-3xl border-none focus:ring-[6px] focus:ring-beige transition-all font-black text-lg text-black appearance-none">
                                            <option>FCFA</option>
                                            <option>USD</option>
                                            <option>EUR</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[9px] font-black text-chocolate/40 uppercase ml-4 mb-2 tracking-widest">Catégorie</label>
                                    <div className="relative">
                                        <Tag className="absolute left-6 top-7 text-chocolate/20 w-6 h-6" />
                                        <select className="w-full p-6 pl-16 bg-gray-50 rounded-3xl border-none focus:ring-[6px] focus:ring-beige transition-all font-black text-lg text-black appearance-none">
                                            <option>Immobilier</option>
                                            <option>Véhicules</option>
                                            <option>Mode & Luxe</option>
                                            <option>Tech & Electronique</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Caractéristiques Dynamiques */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mx-4">
                                <h3 className="text-[10px] font-black text-chocolate uppercase tracking-[0.3em] flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-chocolate text-beige flex items-center justify-center text-[8px]">03</span>
                                    Caractéristiques
                                </h3>
                                <button
                                    onClick={addSpec}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-chocolate text-beige rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Plus size={16} />
                                    Ajouter
                                </button>
                            </div>

                            <div className="bg-beige/10 p-4 rounded-[2rem] border-2 border-dashed border-chocolate/5 space-y-4">
                                {specs.length === 0 && (
                                    <div className="text-center py-10 space-y-2">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                                            <HelpCircle size={24} className="text-chocolate/20" />
                                        </div>
                                        <p className="text-[10px] font-black text-chocolate/30 uppercase tracking-widest">
                                            Aucune spécification ajoutée
                                        </p>
                                    </div>
                                )}
                                {specs.map((spec, i) => (
                                    <div key={i} className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-chocolate/5 group transition-all">
                                        <input
                                            type="text"
                                            placeholder="Label (ex: Marque)"
                                            value={spec.label}
                                            onChange={(e) => updateSpec(i, 'label', e.target.value)}
                                            className="flex-1 w-full p-3 bg-gray-50 rounded-xl border-none text-xs font-black uppercase tracking-tighter focus:ring-4 focus:ring-beige transition-all"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Valeur (ex: Apple)"
                                            value={spec.value}
                                            onChange={(e) => updateSpec(i, 'value', e.target.value)}
                                            className="flex-1 w-full p-3 bg-gray-50 rounded-xl border-none text-xs font-black uppercase tracking-tighter focus:ring-4 focus:ring-beige transition-all"
                                        />
                                        <button
                                            onClick={() => removeSpec(i)}
                                            className="p-3 text-red-500 hover:bg-red-50 transition-colors rounded-xl md:ml-2"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Description & Lieu */}
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black text-chocolate uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-chocolate text-beige flex items-center justify-center text-[8px]">04</span>
                                Finalisation
                            </h3>

                            <div className="space-y-6">
                                <div className="group">
                                    <label className="block text-[9px] font-black text-chocolate/40 uppercase ml-4 mb-2 tracking-widest">Description</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Dites-nous en plus sur l'état, l'histoire..."
                                        className="w-full p-6 bg-gray-50 rounded-3xl border-none focus:ring-[6px] focus:ring-beige transition-all font-bold text-black resize-none"
                                    ></textarea>
                                </div>

                                <div className="group">
                                    <label className="block text-[9px] font-black text-chocolate/40 uppercase ml-4 mb-2 tracking-widest">Ville & Quartier</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-6 text-chocolate/20 w-6 h-6" />
                                        <input
                                            type="text"
                                            placeholder="Ex: Abidjan, Cocody"
                                            className="w-full p-6 pl-16 bg-gray-50 rounded-3xl border-none focus:ring-[6px] focus:ring-beige transition-all font-black text-lg text-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10">
                            <button className="w-full py-6 bg-whatsapp text-white rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-2xl shadow-green-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                                PUBLIER MAINTENANT
                            </button>
                            <p className="text-[9px] font-black text-chocolate/30 text-center mt-6 uppercase tracking-widest">
                                En publiant, vous acceptez nos <Link href="/legal" className="underline decoration-2">Conditions d'utilisation</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNav />
        </AppContainer>
    );
}
