'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Camera, X, Upload, ChevronDown, MapPin, Video, CheckCircle, Lock
} from 'lucide-react';
import AppContainer from '@/components/AppContainer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

// ─── Données géographiques ──────────────────────────────────────
const AFRICAN_COUNTRIES = [
    { name: 'RD Congo', cities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kananga', 'Kisangani', 'Bukavu', 'Butembo', 'Goma', 'Tshikapa', 'Kolwezi', 'Likasi', 'Matadi', 'Uvira', 'Beni', 'Bunia', 'Mbandaka', 'Bandundu', 'Kabinda', 'Kamina', 'Kalemie'] },
    { name: "Côte d'Ivoire", cities: ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'Korhogo'] },
    { name: 'Cameroun', cities: ['Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua'] },
    { name: 'Sénégal', cities: ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor'] },
    { name: 'Mali', cities: ['Bamako', 'Sikasso', 'Mopti', 'Gao', 'Tombouctou'] },
    { name: 'Guinée', cities: ["Conakry", "Kankan", "Labé"] },
    { name: 'Burkina Faso', cities: ['Ouagadougou', 'Bobo-Dioulasso'] },
    { name: 'Niger', cities: ['Niamey', 'Zinder', 'Maradi'] },
    { name: 'Tchad', cities: ["N'Djamena", 'Moundou', 'Sarh'] },
    { name: 'Congo-Brazzaville', cities: ['Brazzaville', 'Pointe-Noire', 'Dolisie'] },
    { name: 'Gabon', cities: ['Libreville', 'Port-Gentil', 'Franceville'] },
    { name: 'Togo', cities: ['Lomé', 'Sokodé', 'Kara'] },
    { name: 'Bénin', cities: ['Porto-Novo', 'Cotonou', 'Parakou'] },
    { name: 'Rwanda', cities: ['Kigali', 'Gisenyi', 'Butare'] },
    { name: 'Burundi', cities: ['Bujumbura', 'Gitega'] },
];

const CATEGORIES = [
    '📱 Téléphones & Accessoires',
    '💻 Informatique & Électronique',
    '👗 Mode & Vêtements Femme',
    '👔 Mode & Vêtements Homme',
    '👶 Mode Enfant & Bébé',
    '👠 Chaussures & Sacs',
    '💄 Beauté & Cosmétiques',
    '💅 Soins & Parfums',
    '📿 Bijoux & Accessoires',
    '⌚ Montres & Horlogerie',
    '🏠 Meubles & Décoration',
    '🏋️ Sport & Loisirs',
    '🎮 Jeux & Jouets',
    '⚙️ Pièces & Auto-accessoires',
    '🛒 Autres produits',
];

const QUANTITIES = Array.from({ length: 12 }, (_, i) => (i + 1) * 2); // 2, 4, 6, ..., 24
const WEIGHTS = [1, 5, 10, 25, 50, 100];

// ─── Section label helper ────────────────────────────────────────
function SectionLabel({ number, label, optional }: { number: number; label: string; optional?: boolean }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#5D4037] text-[#D7CCC8] flex items-center justify-center font-black text-xs shrink-0">
                {number}
            </div>
            <span className="text-sm font-black text-[#3E2723] uppercase tracking-wide">
                {label}
                {optional && <span className="text-[10px] font-medium text-[#5D4037]/40 ml-2 normal-case">(optionnel)</span>}
            </span>
        </div>
    );
}

// ─── Page principale ─────────────────────────────────────────────
export default function PublishPage() {
    const router = useRouter();

    // Champs de base
    const [category, setCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [productState, setProductState] = useState<'neuf' | 'occasion'>('neuf');

    // Images (min 3, max 5) — vraies URLs locales via FileReader
    const [images, setImages] = useState<string[]>([]);
    const imgInputRef = useRef<HTMLInputElement>(null);

    // Type de vente
    const [saleType, setSaleType] = useState<'detail' | 'gros'>('detail');

    // Vente en détails
    const [priceDetail, setPriceDetail] = useState('');
    const [currency, setCurrency] = useState('CDF');

    // Vente en gros
    const [wholesaleType, setWholesaleType] = useState<'quantity' | 'weight' | null>(null);
    const [wholesaleQuantity, setWholesaleQuantity] = useState('2');
    const [wholesaleWeight, setWholesaleWeight] = useState('1');
    const [wholesalePrice, setWholesalePrice] = useState('');
    const [wholesaleCurrency, setWholesaleCurrency] = useState('CDF');

    // Adresse
    const [country, setCountry] = useState('RD Congo');
    const [city, setCity] = useState('Kinshasa');
    const [address, setAddress] = useState('');

    // Vidéo marketing
    const [addVideo, setAddVideo] = useState<'oui' | 'non' | null>(null);
    const [videoFile, setVideoFile] = useState<string | null>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);

    // Auth protection
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/auth');
        }
    }, [isAuthenticated, isLoading, router]);

    const cities = AFRICAN_COUNTRIES.find(c => c.name === country)?.cities || [];

    // Afficher un écran de chargement pendant la vérification auth
    if (isLoading || !isAuthenticated) {
        return (
            <AppContainer className="bg-[#FAF9F6] min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#5D4037]/10 flex items-center justify-center mx-auto animate-pulse">
                        <Lock size={24} className="text-[#5D4037]" />
                    </div>
                    <p className="text-sm font-bold text-[#5D4037]/60">Vérification en cours...</p>
                </div>
            </AppContainer>
        );
    }

    const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach(file => {
            if (images.length < 5) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => prev.length < 5 ? [...prev, reader.result as string] : prev);
                };
                reader.readAsDataURL(file);
            }
        });
        if (imgInputRef.current) imgInputRef.current.value = '';
    };

    const handleVideoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoFile(url);
        }
    };

    const handlePublish = () => {
        const errs: string[] = [];
        if (!category) errs.push('Veuillez choisir une catégorie');
        if (!productName.trim()) errs.push('Veuillez entrer le nom du produit');
        if (images.length < 3) errs.push(`Veuillez ajouter au moins 3 photos (actuellement: ${images.length})`);
        if (!description.trim()) errs.push('Veuillez ajouter une description');
        if (saleType === 'detail' && !priceDetail) errs.push('Veuillez entrer le prix du produit');
        if (saleType === 'gros' && !wholesalePrice) errs.push('Veuillez entrer le prix de gros');
        if (saleType === 'gros' && !wholesaleType) errs.push('Veuillez choisir le type de vente en gros');

        setErrors(errs);
        if (errs.length === 0) {
            setSuccess(true);
            setTimeout(() => router.push('/'), 2000);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const fieldClass = "w-full px-4 py-3.5 bg-white border-2 border-[#D7CCC8]/50 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all placeholder:text-[#5D4037]/25 text-sm";
    const selectClass = fieldClass + " appearance-none cursor-pointer";

    return (
        <AppContainer className="bg-[#FAF9F6] min-h-screen">

            {/* ── Succès banner ── */}
            {success && (
                <div className="fixed top-0 left-0 right-0 z-[999] bg-[#25D366] text-white py-4 px-6 flex items-center justify-center gap-3">
                    <CheckCircle size={22} className="fill-white text-white" />
                    <span className="font-bold">Produit publié avec succès !</span>
                </div>
            )}

            {/* ── Header ── */}
            <header className="sticky top-0 z-50 bg-[#5D4037] text-[#D7CCC8]">
                <div className="flex items-center px-4 py-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-[#D7CCC8]/10 rounded-full transition-all shrink-0">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="flex-1 text-center text-sm font-black uppercase tracking-widest">
                        Publier un Produit
                    </h1>
                    <div className="w-10" /> {/* Spacer pour centrer le titre */}
                </div>
            </header>

            {/* ── Erreurs ── */}
            {errors.length > 0 && (
                <div className="mx-4 mt-4 bg-red-50 border-2 border-red-200 rounded-2xl p-4 space-y-1">
                    {errors.map((e, i) => (
                        <p key={i} className="text-xs font-bold text-red-600">• {e}</p>
                    ))}
                </div>
            )}

            <main className="px-4 py-6 pb-24 space-y-8 max-w-2xl mx-auto">

                {/* ── 1. CATÉGORIE ── */}
                <section>
                    <SectionLabel number={1} label="Choisir une Catégorie" />
                    <div className="relative">
                        <select value={category} onChange={e => setCategory(e.target.value)} className={selectClass}>
                            <option value="">-- Sélectionner une catégorie --</option>
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5D4037]/40 pointer-events-none" />
                    </div>
                </section>

                {/* ── 2. NOM DU PRODUIT ── */}
                <section>
                    <SectionLabel number={2} label="Nom du Produit" />
                    <input
                        type="text"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        placeholder="Ex: iPhone 15 Pro Max 256Go — Noir"
                        className={fieldClass}
                    />
                </section>

                {/* ── 3. IMAGES ── */}
                <section>
                    <SectionLabel number={3} label="Photos du Produit" />
                    <p className="text-[10px] font-bold text-[#5D4037]/50 mb-3 -mt-2">Minimum 3 photos • Maximum 5 • Format 4:3</p>
                    <div className="flex gap-3 flex-wrap">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative w-[calc(50%-6px)] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#D7CCC8]/40 group">
                                <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                    className="absolute top-2 right-2 w-7 h-7 bg-[#5D4037] text-[#D7CCC8] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                    <X size={12} />
                                </button>
                                <div className="absolute bottom-2 left-2 bg-[#5D4037]/70 text-[#D7CCC8] text-[9px] font-black px-2 py-0.5 rounded-full">
                                    Photo {idx + 1}
                                </div>
                            </div>
                        ))}

                        {images.length < 5 && (
                            <label className={`flex flex-col items-center justify-center gap-2 cursor-pointer rounded-2xl border-2 border-dashed transition-all ${images.length < 3 ? 'border-[#5D4037]/50 bg-[#5D4037]/5 hover:bg-[#5D4037]/10' : 'border-[#D7CCC8] bg-white hover:bg-[#FAF9F6]'} w-[calc(50%-6px)] aspect-[4/3]`}>
                                <Camera size={28} className={images.length < 3 ? 'text-[#5D4037]/60' : 'text-[#D7CCC8]'} />
                                <span className="text-[10px] font-black uppercase tracking-wider text-center text-[#5D4037]/50">
                                    {images.length < 3 ? `${3 - images.length} photo${3 - images.length > 1 ? 's' : ''} requise${3 - images.length > 1 ? 's' : ''}` : 'Ajouter une photo'}
                                </span>
                                <span className="text-[9px] text-[#5D4037]/30 font-medium">{images.length}/5</span>
                                <input ref={imgInputRef} type="file" accept="image/*" multiple onChange={handleImageAdd} className="hidden" />
                            </label>
                        )}
                    </div>
                </section>

                {/* ── 4. DESCRIPTION ── */}
                <section>
                    <SectionLabel number={4} label="Description complète" />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={6}
                        placeholder={"Exemple : Vends iPhone 15 Pro Max 256Go en excellent état. Acheté il y a 3 mois, jamais tombé, batterie à 98%. Couleur Titane Naturel. Livraison disponible à Kinshasa, Gombe et Lemba. Paiement Mobile Money ou espèces. Sérieux uniquement."}
                        className={`${fieldClass} resize-none`}
                    />
                </section>

                {/* ── 5. ÉTAT DU PRODUIT ── */}
                <section>
                    <SectionLabel number={5} label="État du Produit" />
                    <div className="flex gap-4">
                        {(['neuf', 'occasion'] as const).map(state => (
                            <label key={state} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${productState === state ? 'border-[#5D4037] bg-[#5D4037]/5' : 'border-[#D7CCC8]/40 bg-white hover:border-[#5D4037]/30'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${productState === state ? 'border-[#5D4037]' : 'border-[#D7CCC8]'}`}>
                                    {productState === state && <div className="w-3 h-3 rounded-full bg-[#5D4037]" />}
                                </div>
                                <input type="radio" name="state" value={state} checked={productState === state} onChange={() => setProductState(state)} className="hidden" />
                                <span className="font-black text-sm text-[#3E2723] uppercase tracking-wide">{state}</span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* ── 6. TYPE DE VENTE ── */}
                <section>
                    <SectionLabel number={6} label="Mode de Vente" />
                    <div className="flex gap-4">
                        {([
                            { value: 'detail', label: 'Vente en Détail' },
                            { value: 'gros', label: 'Vente en Gros' }
                        ] as const).map(({ value, label }) => (
                            <label key={value} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${saleType === value ? 'border-[#5D4037] bg-[#5D4037]/5' : 'border-[#D7CCC8]/40 bg-white hover:border-[#5D4037]/30'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${saleType === value ? 'border-[#5D4037]' : 'border-[#D7CCC8]'}`}>
                                    {saleType === value && <div className="w-3 h-3 rounded-full bg-[#5D4037]" />}
                                </div>
                                <input type="radio" name="saleType" value={value} checked={saleType === value} onChange={() => setSaleType(value)} className="hidden" />
                                <span className="font-black text-xs text-[#3E2723] uppercase tracking-wide leading-tight">{label}</span>
                            </label>
                        ))}
                    </div>

                    {/* ── 7. VENTE EN DÉTAIL ── */}
                    {saleType === 'detail' && (
                        <div className="mt-4 p-4 bg-white border-2 border-[#5D4037]/10 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest">Prix du produit</p>
                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    value={priceDetail}
                                    onChange={e => setPriceDetail(e.target.value)}
                                    placeholder="0"
                                    className="flex-1 px-4 py-3.5 bg-[#FAF9F6] border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-black text-lg focus:border-[#5D4037] outline-none"
                                />
                                <div className="relative">
                                    <select value={currency} onChange={e => setCurrency(e.target.value)}
                                        className="h-full px-4 pr-8 bg-[#5D4037] text-[#D7CCC8] font-black rounded-xl appearance-none cursor-pointer outline-none">
                                        <option value="CDF">CDF</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#D7CCC8]/60 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── 8. VENTE EN GROS ── */}
                    {saleType === 'gros' && (
                        <div className="mt-4 p-4 bg-white border-2 border-[#5D4037]/10 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest">Choisir le type de vente en gros</p>

                            {/* Option : Par quantité */}
                            <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${wholesaleType === 'quantity' ? 'border-[#5D4037] bg-[#5D4037]/5' : 'border-[#D7CCC8]/40 hover:border-[#5D4037]/30'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${wholesaleType === 'quantity' ? 'border-[#5D4037]' : 'border-[#D7CCC8]'}`}>
                                    {wholesaleType === 'quantity' && <div className="w-3 h-3 rounded-full bg-[#5D4037]" />}
                                </div>
                                <input type="radio" name="wholesale" value="quantity" checked={wholesaleType === 'quantity'} onChange={() => setWholesaleType('quantity')} className="hidden" />
                                <div className="flex-1">
                                    <p className="font-black text-xs text-[#3E2723] uppercase tracking-wide">Nombre de produits</p>
                                    {wholesaleType === 'quantity' && (
                                        <div className="mt-3 grid grid-cols-2 gap-3">
                                            <div className="relative">
                                                <select value={wholesaleQuantity} onChange={e => setWholesaleQuantity(e.target.value)}
                                                    className="w-full px-3 py-2.5 pr-7 bg-[#FAF9F6] border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-black text-sm appearance-none outline-none cursor-pointer">
                                                    {QUANTITIES.map(q => <option key={q} value={q}>{q} produits</option>)}
                                                </select>
                                                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5D4037]/40 pointer-events-none" />
                                            </div>
                                            <div className="flex gap-2">
                                                <input type="number" value={wholesalePrice} onChange={e => setWholesalePrice(e.target.value)}
                                                    placeholder="Prix total" className="flex-1 px-3 py-2.5 bg-[#FAF9F6] border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-black text-sm outline-none" />
                                                <div className="relative">
                                                    <select value={wholesaleCurrency} onChange={e => setWholesaleCurrency(e.target.value)}
                                                        className="h-full px-2 pr-6 bg-[#5D4037] text-[#D7CCC8] font-black text-xs rounded-xl appearance-none cursor-pointer outline-none">
                                                        <option value="CDF">CDF</option>
                                                        <option value="USD">USD</option>
                                                        <option value="EUR">EUR</option>
                                                    </select>
                                                    <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 text-[#D7CCC8]/60 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </label>

                            {/* Option : Par kilogramme */}
                            <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${wholesaleType === 'weight' ? 'border-[#5D4037] bg-[#5D4037]/5' : 'border-[#D7CCC8]/40 hover:border-[#5D4037]/30'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${wholesaleType === 'weight' ? 'border-[#5D4037]' : 'border-[#D7CCC8]'}`}>
                                    {wholesaleType === 'weight' && <div className="w-3 h-3 rounded-full bg-[#5D4037]" />}
                                </div>
                                <input type="radio" name="wholesale" value="weight" checked={wholesaleType === 'weight'} onChange={() => setWholesaleType('weight')} className="hidden" />
                                <div className="flex-1">
                                    <p className="font-black text-xs text-[#3E2723] uppercase tracking-wide">Vente au Kilogramme</p>
                                    {wholesaleType === 'weight' && (
                                        <div className="mt-3 grid grid-cols-2 gap-3">
                                            <div className="relative">
                                                <select value={wholesaleWeight} onChange={e => setWholesaleWeight(e.target.value)}
                                                    className="w-full px-3 py-2.5 pr-7 bg-[#FAF9F6] border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-black text-sm appearance-none outline-none cursor-pointer">
                                                    {WEIGHTS.map(w => <option key={w} value={w}>{w} kg</option>)}
                                                </select>
                                                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5D4037]/40 pointer-events-none" />
                                            </div>
                                            <div className="flex gap-2">
                                                <input type="number" value={wholesalePrice} onChange={e => setWholesalePrice(e.target.value)}
                                                    placeholder="Prix total" className="flex-1 px-3 py-2.5 bg-[#FAF9F6] border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-black text-sm outline-none" />
                                                <div className="relative">
                                                    <select value={wholesaleCurrency} onChange={e => setWholesaleCurrency(e.target.value)}
                                                        className="h-full px-2 pr-6 bg-[#5D4037] text-[#D7CCC8] font-black text-xs rounded-xl appearance-none cursor-pointer outline-none">
                                                        <option value="CDF">CDF</option>
                                                        <option value="USD">USD</option>
                                                        <option value="EUR">EUR</option>
                                                    </select>
                                                    <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 text-[#D7CCC8]/60 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </label>
                        </div>
                    )}
                </section>

                {/* ── 9. ADRESSE ── */}
                <section>
                    <SectionLabel number={9} label="Adresse de livraison" />
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        {/* Pays */}
                        <div className="relative">
                            <label className="block text-[9px] font-black text-[#5D4037]/40 uppercase tracking-widest mb-1">Pays</label>
                            <select value={country} onChange={e => { setCountry(e.target.value); setCity(''); }}
                                className={selectClass + " pr-8"}>
                                {AFRICAN_COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                            </select>
                            <ChevronDown size={13} className="absolute right-3 bottom-4 text-[#5D4037]/40 pointer-events-none" />
                        </div>
                        {/* Ville */}
                        <div className="relative">
                            <label className="block text-[9px] font-black text-[#5D4037]/40 uppercase tracking-widest mb-1">Ville</label>
                            <select value={city} onChange={e => setCity(e.target.value)}
                                className={selectClass + " pr-8"}>
                                <option value="">Sélectionner</option>
                                {cities.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown size={13} className="absolute right-3 bottom-4 text-[#5D4037]/40 pointer-events-none" />
                        </div>
                    </div>

                    {/* ── 10. ADRESSE DÉTAILLÉE ── */}
                    <SectionLabel number={10} label="Adresse détaillée" optional />
                    <textarea
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        rows={3}
                        placeholder="Ex : Commune Kimemi, Q. Biondi / Av. Beni, Rue d'Embiance — en face de la pharmacie"
                        className={`${fieldClass} resize-none`}
                    />
                </section>

                {/* ── 11. VIDÉO MARKETING ── */}
                <section>
                    <SectionLabel number={11} label="Ajouter une Vidéo Marketing" optional />
                    <p className="text-xs text-[#5D4037]/50 font-medium -mt-2 mb-4">Une vidéo booste vos ventes de 3x 🚀</p>
                    <div className="flex gap-4 mb-4">
                        {(['oui', 'non'] as const).map(val => (
                            <label key={val} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${addVideo === val ? 'border-[#5D4037] bg-[#5D4037]/5' : 'border-[#D7CCC8]/40 bg-white hover:border-[#5D4037]/30'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${addVideo === val ? 'border-[#5D4037]' : 'border-[#D7CCC8]'}`}>
                                    {addVideo === val && <div className="w-3 h-3 rounded-full bg-[#5D4037]" />}
                                </div>
                                <input type="radio" checked={addVideo === val} onChange={() => setAddVideo(val)} className="hidden" />
                                <span className="font-black text-sm text-[#3E2723] uppercase">{val}</span>
                            </label>
                        ))}
                    </div>

                    {addVideo === 'oui' && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            {!videoFile ? (
                                <label className="flex flex-col items-center gap-3 p-8 bg-white border-2 border-dashed border-[#5D4037]/30 rounded-2xl cursor-pointer hover:bg-[#5D4037]/5 transition-all">
                                    <div className="w-16 h-16 rounded-full bg-[#5D4037]/10 flex items-center justify-center">
                                        <Video size={28} className="text-[#5D4037]/60" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-sm text-[#5D4037] uppercase tracking-wide">Importer une Vidéo du Produit</p>
                                        <p className="text-[10px] text-[#5D4037]/40 mt-1">MP4, MOV — max 100Mo</p>
                                    </div>
                                    <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoAdd} className="hidden" />
                                </label>
                            ) : (
                                <div className="bg-[#5D4037]/5 border-2 border-[#5D4037]/20 rounded-2xl p-4 flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#5D4037] rounded-xl flex items-center justify-center">
                                        <Video size={20} className="text-[#D7CCC8]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-sm text-[#3E2723]">Vidéo importée ✓</p>
                                        <p className="text-[10px] text-[#5D4037]/50">Prête pour publication</p>
                                    </div>
                                    <button onClick={() => setVideoFile(null)} className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* ── BOUTON PUBLIER ── */}
                <div className="pt-4">
                    <button
                        onClick={handlePublish}
                        className="w-full bg-[#5D4037] hover:bg-[#3E2723] text-[#D7CCC8] font-black py-5 rounded-2xl text-base uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-[#5D4037]/20"
                    >
                        <Upload size={20} />
                        Publier ce Produit
                    </button>
                    <p className="text-center text-[10px] text-[#5D4037]/40 font-medium mt-3">
                        En publiant, vous acceptez nos conditions générales d'utilisation
                    </p>
                </div>
            </main>
        </AppContainer>
    );
}
