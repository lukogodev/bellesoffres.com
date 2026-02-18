'use client';

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import { Camera, MapPin, Video, Upload, X, Check, Plus } from "lucide-react";
import Link from 'next/link';

export default function PublishPage() {
    // États du formulaire
    const [images, setImages] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [productState, setProductState] = useState<'neuf' | 'occasion'>('neuf');
    const [saleType, setSaleType] = useState<'detail' | 'gros'>('detail');

    // Caractéristiques Dynamiques
    const [dynamicFields, setDynamicFields] = useState<{ id: number, label: string, value: string }[]>([]);

    // Vente en détails
    const [priceDetail, setPriceDetail] = useState('');
    const [currency, setCurrency] = useState('FCFA');

    // Vente en gros
    const [wholesaleType, setWholesaleType] = useState<'quantity' | 'weight'>('quantity');
    const [wholesaleQuantity, setWholesaleQuantity] = useState('2');
    const [wholesaleWeight, setWholesaleWeight] = useState('1');
    const [wholesalePrice, setWholesalePrice] = useState('');

    // Adresse
    const [country, setCountry] = useState('RD Congo');
    const [city, setCity] = useState('Kinshasa');
    const [address, setAddress] = useState('');

    // Vidéo marketing
    const [addVideo, setAddVideo] = useState(false);
    const [video, setVideo] = useState<string | null>(null);

    const addField = () => {
        setDynamicFields([...dynamicFields, { id: Date.now(), label: '', value: '' }]);
    };

    const removeField = (id: number) => {
        setDynamicFields(dynamicFields.filter(f => f.id !== id));
    };

    const updateField = (id: number, field: 'label' | 'value', text: string) => {
        setDynamicFields(dynamicFields.map(f => f.id === id ? { ...f, [field]: text } : f));
    };

    const categories = [
        'Mode & Vêtements',
        'Beauté & Cosmétiques',
        'Électronique',
        'Meubles & Décoration',
        'Sport & Loisirs',
        'Jouets & Enfants',
        'Livres & Papeterie',
        'Accessoires & Bijoux',
        'Électroménager',
        'Autres'
    ];

    const handleImageUpload = () => {
        if (images.length < 5) {
            setImages([...images, `https://placehold.co/400x300/F5F5DC/2B1700.png?text=Photo+${images.length + 1}`]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handlePublish = () => {
        if (images.length < 1) {
            alert('Veuillez ajouter au moins une photo');
            return;
        }
        if (!category || !productName || !description) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        alert('Produit publié avec succès !');
    };

    return (
        <AppContainer className="bg-white">
            <PageHeader
                variant="page"
                title="PUBLIER UNE OFFRE"
                backUrl="/"
            />

            <main className="px-4 py-8 pb-32">
                <div className="bg-[#FAF9F6] rounded-[3rem] border border-chocolate/5 p-6 md:p-12 shadow-sm">
                    <div className="space-y-12">

                        {/* 1. CATÉGORIE */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-chocolate/40 uppercase tracking-[0.2em]">
                                1. Choisir une Catégorie *
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-4 bg-white rounded-2xl border border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/5 transition-all font-bold text-chocolate outline-none appearance-none cursor-pointer"
                            >
                                <option value="">-- Sélectionner une catégorie --</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* 2. NOM DU PRODUIT */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-chocolate/40 uppercase tracking-[0.2em]">
                                2. Nom de l'annonce *
                            </label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Ex: Samsung Galaxy S23 Ultra"
                                className="w-full p-4 bg-white rounded-2xl border border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/5 transition-all font-bold text-chocolate placeholder:text-chocolate/20 outline-none"
                            />
                        </div>

                        {/* 3. IMAGES */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-[10px] font-black text-chocolate/40 uppercase tracking-[0.2em]">
                                    3. Photos (Max 5) *
                                </label>
                                <span className="text-[10px] font-black text-chocolate/30 tracking-widest uppercase">
                                    {images.length}/5
                                </span>
                            </div>

                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                {images.length < 5 && (
                                    <button
                                        onClick={handleImageUpload}
                                        className="w-32 h-32 flex-shrink-0 border-2 border-dashed border-chocolate/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-chocolate/30 bg-chocolate/5 hover:bg-beige/40 hover:border-chocolate/30 transition-all group"
                                    >
                                        <Camera size={24} />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Ajouter</span>
                                    </button>
                                )}

                                {images.map((img, idx) => (
                                    <div key={idx} className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-chocolate/5 group">
                                        <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-2 right-2 bg-chocolate text-beige rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. CARACTÉRISTIQUES DYNAMIQUES */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <label className="block text-[10px] font-black text-chocolate/40 uppercase tracking-[0.2em]">
                                    4. Caractéristiques spécifiques (Optionnel)
                                </label>
                                <button
                                    onClick={addField}
                                    className="px-4 py-2 bg-chocolate text-beige text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all flex items-center gap-2"
                                >
                                    <Plus size={14} />
                                    Ajouter un champ
                                </button>
                            </div>

                            <div className="space-y-3">
                                {dynamicFields.map((field) => (
                                    <div key={field.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2">
                                        <input
                                            type="text"
                                            value={field.label}
                                            onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                            placeholder="Ex: Couleur, Taille..."
                                            className="flex-1 p-4 bg-white rounded-xl border border-chocolate/10 focus:border-chocolate text-[13px] font-bold text-chocolate outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={field.value}
                                            onChange={(e) => updateField(field.id, 'value', e.target.value)}
                                            placeholder="Valeur..."
                                            className="flex-1 p-4 bg-white rounded-xl border border-chocolate/10 focus:border-chocolate text-[13px] font-bold text-chocolate outline-none"
                                        />
                                        <button
                                            onClick={() => removeField(field.id)}
                                            className="p-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. DESCRIPTION */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-chocolate/40 uppercase tracking-[0.2em]">
                                5. Description détaillée *
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                placeholder="Détaillez votre offre ici..."
                                className="w-full p-4 bg-white rounded-2xl border border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/5 transition-all font-medium text-chocolate placeholder:text-chocolate/20 resize-none outline-none"
                            />
                        </div>

                        {/* 6. ÉTAT & PRIX */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-chocolate/40 uppercase tracking-[0.2em]">
                                    6. État
                                </label>
                                <div className="flex gap-3 p-1.5 bg-chocolate/5 rounded-[1.5rem] border border-chocolate/5">
                                    <button
                                        onClick={() => setProductState('neuf')}
                                        className={`flex-1 py-3 items-center justify-center rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${productState === 'neuf' ? 'bg-chocolate text-beige shadow-lg' : 'text-chocolate/40 hover:bg-white'}`}
                                    >
                                        Neuf
                                    </button>
                                    <button
                                        onClick={() => setProductState('occasion')}
                                        className={`flex-1 py-3 items-center justify-center rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${productState === 'occasion' ? 'bg-chocolate text-beige shadow-lg' : 'text-chocolate/40 hover:bg-white'}`}
                                    >
                                        Occasion
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-chocolate/40 uppercase tracking-[0.2em]">
                                    7. Prix de vente
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={priceDetail}
                                        onChange={(e) => setPriceDetail(e.target.value)}
                                        placeholder="0.00"
                                        className="flex-1 p-4 bg-white rounded-xl border border-chocolate/10 focus:border-chocolate font-sans font-black text-lg text-chocolate outline-none"
                                    />
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-32 p-4 bg-white rounded-xl border border-chocolate/10 focus:border-chocolate font-black text-chocolate outline-none cursor-pointer"
                                    >
                                        <option value="FCFA">FCFA</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 8. LOCALISATION */}
                        <div className="space-y-6 pt-6 border-t border-chocolate/5">
                            <label className="block text-[10px] font-black text-chocolate/40 uppercase tracking-[0.2em]">
                                8. Localisation du produit
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-[9px] font-black text-chocolate/30 uppercase tracking-widest pl-2">Pays</label>
                                        <select
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className="w-full p-4 bg-white rounded-xl border border-chocolate/10 focus:border-chocolate text-[13px] font-bold text-chocolate outline-none"
                                        >
                                            <option value="RD Congo">RD Congo</option>
                                            <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                                            <option value="Cameroun">Cameroun</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[9px] font-black text-chocolate/30 uppercase tracking-widest pl-2">Ville</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Ex: Kinshasa"
                                            className="w-full p-4 bg-white rounded-xl border border-chocolate/10 focus:border-chocolate text-[13px] font-bold text-chocolate outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[9px] font-black text-chocolate/30 uppercase tracking-widest pl-2">Adresse détaillée</label>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows={4}
                                        placeholder="Commune, Quartier, Avenue, N°..."
                                        className="w-full p-4 bg-white rounded-xl border border-chocolate/10 focus:border-chocolate text-[13px] font-bold text-chocolate outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* BOUTON PUBLIER */}
                        <div className="pt-10">
                            <button
                                onClick={handlePublish}
                                className="w-full py-6 bg-whatsapp hover:bg-[#1ebc57] text-white rounded-2xl font-black text-xl uppercase tracking-widest shadow-xl shadow-green-200/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4"
                            >
                                <Upload size={24} />
                                Publier maintenant
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
