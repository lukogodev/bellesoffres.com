'use client';

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import { Camera, MapPin, Video, Upload, X, Check } from "lucide-react";
import Link from 'next/link';

export default function PublishPage() {
    // États du formulaire
    const [images, setImages] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [productState, setProductState] = useState<'neuf' | 'occasion'>('neuf');
    const [saleType, setSaleType] = useState<'detail' | 'gros'>('detail');

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

    // Catégories disponibles (seulement produits physiques)
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
        // Validation
        if (images.length < 3) {
            alert('Veuillez ajouter au moins 3 photos');
            return;
        }
        if (!category || !productName || !description) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Logique de publication
        console.log('Publication du produit...');
        alert('Produit publié avec succès !');
    };

    return (
        <AppContainer>
            {/* Header */}
            <PageHeader
                variant="page"
                title="PUBLIER UN PRODUIT"
                backUrl="/"
            />

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-chocolate/5 p-6 md:p-12">
                    <div className="space-y-10">

                        {/* 1. CATÉGORIE */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                1. Choisir une Catégorie *
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-5 bg-beige/20 rounded-2xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-black outline-none"
                            >
                                <option value="">-- Sélectionner une catégorie --</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* 2. NOM DU PRODUIT */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                2. Nom du Produit *
                            </label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Ex: iPhone 13 Pro Max 256GB"
                                className="w-full p-5 bg-beige/20 rounded-2xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-black placeholder:text-gray-400 outline-none"
                            />
                        </div>

                        {/* 3. IMAGES (Format 4:3, Min 3, Max 5) */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                    3. Images du Produit * (Min: 3, Max: 5)
                                </label>
                                <span className="text-xs font-bold text-chocolate/50">
                                    {images.length}/5
                                </span>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4">
                                {/* Bouton d'ajout */}
                                {images.length < 5 && (
                                    <button
                                        onClick={handleImageUpload}
                                        className="w-36 h-28 flex-shrink-0 border-[3px] border-dashed border-chocolate/20 rounded-2xl flex flex-col items-center justify-center gap-2 text-chocolate/40 bg-beige/10 hover:bg-beige/30 hover:border-chocolate/40 transition-all group"
                                    >
                                        <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                            <Camera size={28} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-wider">Ajouter</span>
                                    </button>
                                )}

                                {/* Images ajoutées */}
                                {images.map((img, idx) => (
                                    <div key={idx} className="w-36 h-28 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-lg group border-2 border-chocolate/10">
                                        <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-2 right-2 bg-chocolate text-beige rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        >
                                            <X size={16} />
                                        </button>
                                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] font-black px-2 py-1 rounded-lg">
                                            Photo {idx + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. DESCRIPTION */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                4. Description Complète *
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                placeholder="Exemple : iPhone 13 Pro Max en excellent état, acheté il y a 6 mois. Toujours sous garantie Apple. Capacité de 256GB, couleur Sierra Blue. Livré avec boîte d'origine, chargeur et écouteurs. Aucune rayure, batterie à 100%. Possibilité de test avant achat."
                                className="w-full p-5 bg-beige/20 rounded-2xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-medium text-black placeholder:text-gray-400/70 placeholder:text-sm resize-none outline-none"
                            />
                        </div>

                        {/* 5. ÉTAT DU PRODUIT */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                5. État du Produit *
                            </label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setProductState('neuf')}
                                    className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase tracking-wider transition-all ${productState === 'neuf'
                                            ? 'bg-chocolate text-beige border-chocolate shadow-lg'
                                            : 'bg-beige/20 text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                        }`}
                                >
                                    <Check className={`w-5 h-5 mx-auto mb-1 ${productState === 'neuf' ? 'opacity-100' : 'opacity-0'}`} />
                                    Neuf
                                </button>
                                <button
                                    onClick={() => setProductState('occasion')}
                                    className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase tracking-wider transition-all ${productState === 'occasion'
                                            ? 'bg-chocolate text-beige border-chocolate shadow-lg'
                                            : 'bg-beige/20 text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                        }`}
                                >
                                    <Check className={`w-5 h-5 mx-auto mb-1 ${productState === 'occasion' ? 'opacity-100' : 'opacity-0'}`} />
                                    Occasion
                                </button>
                            </div>
                        </div>

                        {/* 6. TYPE DE VENTE */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                6. Type de Vente *
                            </label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setSaleType('detail')}
                                    className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase tracking-wider transition-all ${saleType === 'detail'
                                            ? 'bg-chocolate text-beige border-chocolate shadow-lg'
                                            : 'bg-beige/20 text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                        }`}
                                >
                                    <Check className={`w-5 h-5 mx-auto mb-1 ${saleType === 'detail' ? 'opacity-100' : 'opacity-0'}`} />
                                    Vendre en Détails
                                </button>
                                <button
                                    onClick={() => setSaleType('gros')}
                                    className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase tracking-wider transition-all ${saleType === 'gros'
                                            ? 'bg-chocolate text-beige border-chocolate shadow-lg'
                                            : 'bg-beige/20 text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                        }`}
                                >
                                    <Check className={`w-5 h-5 mx-auto mb-1 ${saleType === 'gros' ? 'opacity-100' : 'opacity-0'}`} />
                                    Vendre en Gros
                                </button>
                            </div>
                        </div>

                        {/* 7. VENTE EN DÉTAILS - Champs conditionnels */}
                        {saleType === 'detail' && (
                            <div className="space-y-6 p-6 bg-beige/10 rounded-3xl border-2 border-chocolate/10">
                                <h3 className="text-sm font-black text-chocolate uppercase tracking-wide">Prix de Vente en Détails</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">Prix *</label>
                                        <input
                                            type="number"
                                            value={priceDetail}
                                            onChange={(e) => setPriceDetail(e.target.value)}
                                            placeholder="0"
                                            className="w-full p-4 bg-white rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-lg text-chocolate outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">Devise *</label>
                                        <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="w-full p-4 bg-white rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-lg text-chocolate outline-none"
                                        >
                                            <option value="FCFA">FCFA</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 8. VENTE EN GROS - Champs conditionnels */}
                        {saleType === 'gros' && (
                            <div className="space-y-6 p-6 bg-beige/10 rounded-3xl border-2 border-chocolate/10">
                                <h3 className="text-sm font-black text-chocolate uppercase tracking-wide">Vente en Gros</h3>

                                {/* Choix entre Quantité ou Poids */}
                                <div className="flex gap-4 mb-6">
                                    <button
                                        onClick={() => setWholesaleType('quantity')}
                                        className={`flex-1 p-4 rounded-xl border-2 font-bold text-xs uppercase tracking-wider transition-all ${wholesaleType === 'quantity'
                                                ? 'bg-chocolate text-beige border-chocolate'
                                                : 'bg-white text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                            }`}
                                    >
                                        Par Quantité
                                    </button>
                                    <button
                                        onClick={() => setWholesaleType('weight')}
                                        className={`flex-1 p-4 rounded-xl border-2 font-bold text-xs uppercase tracking-wider transition-all ${wholesaleType === 'weight'
                                                ? 'bg-chocolate text-beige border-chocolate'
                                                : 'bg-white text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                            }`}
                                    >
                                        Par Kilogramme
                                    </button>
                                </div>

                                {/* Vente par Quantité */}
                                {wholesaleType === 'quantity' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">
                                                Nombre de Produits (multiples de 2, entre 2 et 24)
                                            </label>
                                            <select
                                                value={wholesaleQuantity}
                                                onChange={(e) => setWholesaleQuantity(e.target.value)}
                                                className="w-full p-4 bg-white rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-lg text-chocolate outline-none"
                                            >
                                                {[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map(num => (
                                                    <option key={num} value={num}>{num} produits</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">Prix Global *</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={wholesalePrice}
                                                    onChange={(e) => setWholesalePrice(e.target.value)}
                                                    placeholder="Prix pour toute la quantité"
                                                    className="flex-1 p-4 bg-white rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-lg text-chocolate outline-none"
                                                />
                                                <select
                                                    value={currency}
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                    className="w-32 p-4 bg-white rounded-xl border-2 border-chocolate/10 focus:border-chocolate transition-all font-bold text-chocolate outline-none"
                                                >
                                                    <option value="FCFA">FCFA</option>
                                                    <option value="USD">USD</option>
                                                    <option value="EUR">EUR</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Vente par Poids */}
                                {wholesaleType === 'weight' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">
                                                Poids (Kg)
                                            </label>
                                            <select
                                                value={wholesaleWeight}
                                                onChange={(e) => setWholesaleWeight(e.target.value)}
                                                className="w-full p-4 bg-white rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-lg text-chocolate outline-none"
                                            >
                                                {[1, 5, 10, 25, 50, 100].map(weight => (
                                                    <option key={weight} value={weight}>{weight} Kg</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">Prix Global *</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={wholesalePrice}
                                                    onChange={(e) => setWholesalePrice(e.target.value)}
                                                    placeholder="Prix pour toute la masse"
                                                    className="flex-1 p-4 bg-white rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-lg text-chocolate outline-none"
                                                />
                                                <select
                                                    value={currency}
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                    className="w-32 p-4 bg-white rounded-xl border-2 border-chocolate/10 focus:border-chocolate transition-all font-bold text-chocolate outline-none"
                                                >
                                                    <option value="FCFA">FCFA</option>
                                                    <option value="USD">USD</option>
                                                    <option value="EUR">EUR</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 9. ADRESSE DE LIVRAISON */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                9. Adresse de Livraison *
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">Pays</label>
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full p-4 bg-beige/20 rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-chocolate outline-none"
                                    >
                                        <option value="RD Congo">RD Congo</option>
                                        <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                                        <option value="Sénégal">Sénégal</option>
                                        <option value="Cameroun">Cameroun</option>
                                        <option value="Bénin">Bénin</option>
                                        <option value="Togo">Togo</option>
                                        <option value="Mali">Mali</option>
                                        <option value="Burkina Faso">Burkina Faso</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">Ville</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="Ex: Kinshasa"
                                        className="w-full p-4 bg-beige/20 rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-chocolate placeholder:text-gray-400 outline-none"
                                    />
                                </div>
                            </div>

                            {/* 10. Autre Adresse */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-chocolate/70 uppercase tracking-wider">Autre Adresse (Commune, Quartier, Avenue, Rue)</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 text-chocolate/30 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Ex: Commune KIMEMI, Q.BIONDI / Av.Beni, Rue d'Embiance"
                                        className="w-full p-4 pl-12 bg-beige/20 rounded-xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-medium text-chocolate placeholder:text-gray-400/70 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 11. VIDÉO MARKETING */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                11. Ajouter une Vidéo Marketing
                            </label>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setAddVideo(true)}
                                    className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase tracking-wider transition-all ${addVideo
                                            ? 'bg-chocolate text-beige border-chocolate shadow-lg'
                                            : 'bg-beige/20 text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                        }`}
                                >
                                    <Check className={`w-5 h-5 mx-auto mb-1 ${addVideo ? 'opacity-100' : 'opacity-0'}`} />
                                    Oui
                                </button>
                                <button
                                    onClick={() => setAddVideo(false)}
                                    className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase tracking-wider transition-all ${!addVideo
                                            ? 'bg-chocolate text-beige border-chocolate shadow-lg'
                                            : 'bg-beige/20 text-chocolate border-chocolate/20 hover:border-chocolate/40'
                                        }`}
                                >
                                    <Check className={`w-5 h-5 mx-auto mb-1 ${!addVideo ? 'opacity-100' : 'opacity-0'}`} />
                                    Non
                                </button>
                            </div>

                            {/* Import vidéo si OUI */}
                            {addVideo && (
                                <div className="p-6 bg-beige/10 rounded-2xl border-2 border-dashed border-chocolate/20">
                                    {!video ? (
                                        <button
                                            onClick={() => setVideo('video-uploaded.mp4')}
                                            className="w-full p-8 flex flex-col items-center justify-center gap-3 text-chocolate hover:bg-beige/20 rounded-xl transition-all group"
                                        >
                                            <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                                <Video size={40} className="text-chocolate" />
                                            </div>
                                            <span className="text-sm font-black uppercase tracking-wider">Importer une Vidéo du Produit</span>
                                            <span className="text-xs text-chocolate/50 font-medium">Format accepté: MP4, MOV (Max: 100MB)</span>
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-chocolate/10 rounded-lg">
                                                    <Video size={24} className="text-chocolate" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-chocolate">{video}</p>
                                                    <p className="text-xs text-chocolate/50">Vidéo importée</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setVideo(null)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* BOUTON PUBLIER */}
                        <div className="pt-6">
                            <button
                                onClick={handlePublish}
                                className="w-full py-6 bg-whatsapp hover:bg-[#1ebc57] text-white rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-green-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                            >
                                <Upload size={24} />
                                PUBLIER CE PRODUIT
                            </button>
                            <p className="text-[9px] font-black text-chocolate/30 text-center mt-4 uppercase tracking-widest">
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
