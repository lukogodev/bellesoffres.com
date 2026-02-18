'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import { Camera, MapPin, Video as VideoIcon, Upload, X, Check, Save } from "lucide-react";
import Link from 'next/link';
import data from "@/mock/data.json";
import { Product } from "@/types";

export default function UpdateProductPage() {
    const params = useParams();
    const router = useRouter();

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

    // Chargement des données existantes
    useEffect(() => {
        if (params.id) {
            const product = (data.products as Product[]).find(p => p.id === params.id);
            if (product) {
                setProductName(product.title);
                setCategory(product.category);
                setPriceDetail(product.price.toString());
                setCurrency(product.currency);
                setImages([product.image, product.image, product.image]); // Simulé
                setDescription("iPhone 13 Pro Max en excellent état, acheté il y a 6 mois. Toujours sous garantie Apple. Capacité de 256GB, couleur Sierra Blue. Livré avec boîte d'origine, chargeur et écouteurs.");
                setCity(product.location.split(',')[0].trim());
            }
        }
    }, [params]);

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

    const handleSave = () => {
        if (images.length < 1) {
            alert('Veuillez ajouter au moins 1 photo');
            return;
        }
        console.log('Mise à jour du produit...');
        alert('Modifications enregistrées avec succès !');
        router.push(`/profile`);
    };

    return (
        <AppContainer>
            <PageHeader
                variant="page"
                title="MODIFIER LES INFOS"
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
                                className="w-full p-5 bg-beige/20 rounded-2xl border-2 border-chocolate/10 focus:border-chocolate focus:ring-4 focus:ring-chocolate/10 transition-all font-bold text-black outline-none"
                            />
                        </div>

                        {/* 3. IMAGES */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                    3. Images (Max: 5)
                                </label>
                                <span className="text-xs font-bold text-chocolate/50">{images.length}/5</span>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4">
                                {images.length < 5 && (
                                    <button onClick={handleImageUpload} className="w-36 h-28 flex-shrink-0 border-[3px] border-dashed border-chocolate/20 rounded-2xl flex flex-col items-center justify-center gap-2 text-chocolate/40 bg-beige/10 hover:bg-beige/30 transition-all">
                                        <Camera size={28} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">Ajouter</span>
                                    </button>
                                )}
                                {images.map((img, idx) => (
                                    <div key={idx} className="w-36 h-28 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-lg group border-2 border-chocolate/10">
                                        <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                                        <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 bg-chocolate text-beige rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. DESCRIPTION */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                4. Description *
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                className="w-full p-5 bg-beige/20 rounded-2xl border-2 border-chocolate/10 focus:border-chocolate transition-all font-medium text-black resize-none outline-none"
                            />
                        </div>

                        {/* 5. ÉTAT */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                5. État du Produit *
                            </label>
                            <div className="flex gap-4">
                                <button onClick={() => setProductState('neuf')} className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase transition-all ${productState === 'neuf' ? 'bg-chocolate text-beige border-chocolate shadow-lg' : 'bg-beige/20 text-chocolate border-chocolate/20'}`}>
                                    Neuf
                                </button>
                                <button onClick={() => setProductState('occasion')} className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase transition-all ${productState === 'occasion' ? 'bg-chocolate text-beige border-chocolate shadow-lg' : 'bg-beige/20 text-chocolate border-chocolate/20'}`}>
                                    Occasion
                                </button>
                            </div>
                        </div>

                        {/* 6. TYPE VENTE */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                6. Type de Vente *
                            </label>
                            <div className="flex gap-4">
                                <button onClick={() => setSaleType('detail')} className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase transition-all ${saleType === 'detail' ? 'bg-chocolate text-beige border-chocolate shadow-lg' : 'bg-beige/20 text-chocolate border-chocolate/20'}`}>
                                    Vendre en Détails
                                </button>
                                <button onClick={() => setSaleType('gros')} className={`flex-1 p-5 rounded-2xl border-2 font-bold text-sm uppercase transition-all ${saleType === 'gros' ? 'bg-chocolate text-beige border-chocolate shadow-lg' : 'bg-beige/20 text-chocolate border-chocolate/20'}`}>
                                    Vendre en Gros
                                </button>
                            </div>
                        </div>

                        {/* PRIX (Simplement affiché pour détails ici) */}
                        {saleType === 'detail' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-chocolate/70 uppercase">Prix</label>
                                    <input type="number" value={priceDetail} onChange={(e) => setPriceDetail(e.target.value)} className="w-full p-4 bg-white rounded-xl border-2 border-chocolate/10 font-bold text-lg text-chocolate outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-chocolate/70 uppercase">Devise</label>
                                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-4 bg-white rounded-xl border-2 border-chocolate/10 font-bold text-lg text-chocolate outline-none">
                                        <option value="FCFA">FCFA</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* ADRESSE */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                9. Localisation
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-4 bg-beige/20 rounded-xl border-2 border-chocolate/10 font-bold text-chocolate outline-none" />
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-4 bg-beige/20 rounded-xl border-2 border-chocolate/10 font-bold text-chocolate outline-none" />
                            </div>
                        </div>

                        {/* BOUTON ENREGISTRER */}
                        <div className="pt-6">
                            <button
                                onClick={handleSave}
                                className="w-full py-6 bg-chocolate hover:bg-black text-beige rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-4"
                            >
                                <Save size={24} />
                                ENREGISTRER LES MODIFICATIONS
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
