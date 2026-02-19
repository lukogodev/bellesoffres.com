'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import AppContainer from '@/components/AppContainer';
import {
    Settings, MapPin, Banknote, Heart, Edit, Clock, Flame, Play, TrendingUp, ArrowLeft
} from 'lucide-react';

// ─── Icône WhatsApp SVG ──────────────────────────────────────────
const WaIcon = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
    </svg>
);

// ─── Mock data ───────────────────────────────────────────────────
const PROFILE = {
    shopName: 'Belle Mode',
    firstName: 'Marie',
    bio: 'Spécialiste en mode et beauté depuis 2020. Nous proposons des produits de qualité premium importés directement. Livraison rapide dans toute la RDC. Garantie satisfaction. Suivez-nous pour ne rien manquer de nos nouvelles collections exclusives !',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=300',
    country: 'RD Congo',
    city: 'Kinshasa',
    productsCount: 17,
    subscribersCount: 133456,
    whatsapp: '243900000000',
};

const PRODUCTS = [
    { id: '1', name: 'iPhone 13 Pro Max', price: 850000, currency: 'CDF', image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400', location: 'Kinshasa, Gombe', timeAgo: '2h', likes: 45 },
    { id: '2', name: 'Sac à Main Gucci', price: 450000, currency: 'CDF', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400', location: 'Kinshasa, Lemba', timeAgo: '1j', likes: 89 },
    { id: '3', name: 'Nike Air Max 270', price: 125000, currency: 'CDF', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', location: 'Kinshasa, Kintambo', timeAgo: '3j', likes: 34 },
    { id: '4', name: 'Montre Rolex Submariner', price: 2500000, currency: 'CDF', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=400', location: 'Kinshasa, Gombe', timeAgo: '5j', likes: 178 },
    { id: '5', name: 'MacBook Pro M2', price: 1200000, currency: 'CDF', image: 'https://images.unsplash.com/photo-1517336714460-d15024229188?auto=format&fit=crop&q=80&w=400', location: 'Kinshasa, Limete', timeAgo: '1sem', likes: 92 },
    { id: '6', name: 'Parfum Chanel N°5', price: 85000, currency: 'CDF', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&q=80&w=400', location: 'Kinshasa, Ngaliema', timeAgo: '2sem', likes: 201 },
];

const VIDEOS = [
    { id: '1', productName: 'iPhone 13 Pro Max', thumbnail: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400', likes: 234 },
    { id: '2', productName: 'Sac à Main Gucci', thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400', likes: 187 },
    { id: '3', productName: 'Nike Air Max 270', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', likes: 456 },
];

type SortType = 'recents' | 'anciens' | 'populaires';

// ─── Page Profil ─────────────────────────────────────────────────
export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'produits' | 'videos'>('produits');
    const [sortBy, setSortBy] = useState<SortType>('recents');
    const [showFullBio, setShowFullBio] = useState(false);
    const router = useRouter();

    const sortedProducts = [...PRODUCTS].sort((a, b) => {
        if (sortBy === 'populaires') return b.likes - a.likes;
        if (sortBy === 'anciens') return parseInt(a.id) - parseInt(b.id);
        return parseInt(b.id) - parseInt(a.id); // recents
    });

    const sortedVideos = [...VIDEOS].sort((a, b) => {
        if (sortBy === 'populaires') return b.likes - a.likes;
        return parseInt(b.id) - parseInt(a.id);
    });

    const bioPreview = PROFILE.bio.slice(0, 120) + (PROFILE.bio.length > 120 ? '...' : '');

    return (
        <AppContainer className="bg-[#FAF9F6] pb-28">

            {/* ── Header ── */}
            <header className="sticky top-0 z-50 bg-[#5D4037] text-[#D7CCC8]">
                <div className="flex items-center px-4 py-4 gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-[#D7CCC8]/10 rounded-full transition-all">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="flex-1 text-center text-sm font-black uppercase tracking-widest">
                        Mon Profil
                    </h1>
                    <Link href="/settings" className="p-2 hover:bg-[#D7CCC8]/10 rounded-full transition-all">
                        <Settings size={20} />
                    </Link>
                </div>
            </header>

            <main className="max-w-lg mx-auto px-4 py-6 space-y-5">

                {/* ── Carte Profil ── */}
                <div className="bg-white rounded-3xl border border-[#D7CCC8]/30 p-5 shadow-sm">

                    {/* Ligne : Photo + Stats */}
                    <div className="flex items-center gap-5 mb-4">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 rounded-full border-[3px] border-[#D7CCC8] overflow-hidden shadow-md">
                                <Image
                                    src={PROFILE.avatar}
                                    alt={PROFILE.shopName}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Stats : Produits + Abonnés */}
                        <div className="flex gap-6 flex-1 justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-black text-[#5D4037] leading-none">{PROFILE.productsCount}</div>
                                <div className="text-[10px] font-bold text-[#5D4037]/50 uppercase tracking-wider mt-1">Produits</div>
                            </div>
                            <div className="w-px bg-[#D7CCC8]/40" />
                            <div className="text-center">
                                <div className="text-2xl font-black text-[#5D4037] leading-none">{PROFILE.subscribersCount.toLocaleString()}</div>
                                <div className="text-[10px] font-bold text-[#5D4037]/50 uppercase tracking-wider mt-1">Abonnés</div>
                            </div>
                        </div>
                    </div>

                    {/* Nom de boutique */}
                    <h2 className="text-lg font-black text-[#3E2723] mb-1 leading-tight">{PROFILE.shopName}</h2>

                    {/* Bio */}
                    <div className="mb-3">
                        <p className="text-sm text-[#5D4037]/80 leading-relaxed font-medium">
                            {showFullBio ? PROFILE.bio : bioPreview}
                        </p>
                        {!showFullBio && (
                            <button onClick={() => setShowFullBio(true)} className="text-xs font-black text-[#5D4037] underline underline-offset-2 mt-1 hover:text-[#3E2723] transition-colors">
                                Voir plus
                            </button>
                        )}
                    </div>

                    {/* Localisation */}
                    <div className="flex items-center gap-1.5 text-xs text-[#5D4037]/60 font-bold mb-4">
                        <MapPin size={13} className="text-[#5D4037]/40 shrink-0" />
                        <span>{PROFILE.city}, {PROFILE.country}</span>
                    </div>

                    {/* Boutons : Investir + WhatsApp */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href="/invest"
                            className="flex items-center justify-center gap-2 py-3 px-3 border-2 border-[#5D4037] rounded-xl bg-white text-[#5D4037] font-bold text-xs uppercase tracking-wide hover:bg-[#5D4037]/5 transition-all active:scale-95"
                        >
                            <Banknote size={16} />
                            Investir
                        </Link>
                        <a
                            href={`https://wa.me/${PROFILE.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3 px-3 border-2 border-[#25D366] rounded-xl bg-[#25D366]/10 text-[#25D366] font-bold text-xs uppercase tracking-wide hover:bg-[#25D366]/20 transition-all active:scale-95"
                        >
                            <WaIcon size={15} />
                            Mon WhatsApp
                        </a>
                    </div>
                </div>

                {/* ── Grille contenu ── */}
                <div className="bg-white rounded-3xl border border-[#D7CCC8]/30 overflow-hidden shadow-sm">

                    {/* Tabs Produits / Vidéos */}
                    <div className="flex border-b border-[#D7CCC8]/30">
                        {(['produits', 'videos'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#5D4037] border-b-[3px] border-[#5D4037] bg-[#5D4037]/5' : 'text-[#5D4037]/40 hover:text-[#5D4037]/70'}`}
                            >
                                {tab === 'produits' ? `Produits (${PRODUCTS.length})` : `Vidéos (${VIDEOS.length})`}
                            </button>
                        ))}
                    </div>

                    {/* Sous-tabs : Récents / Anciens / Populaires */}
                    <div className="flex gap-2 px-4 py-3 border-b border-[#D7CCC8]/20 bg-[#FAF9F6] overflow-x-auto no-scrollbar">
                        {([
                            { key: 'recents', label: 'Récents', Icon: Clock },
                            { key: 'anciens', label: 'Anciens', Icon: TrendingUp },
                            { key: 'populaires', label: 'Populaires', Icon: Flame },
                        ] as const).map(({ key, label, Icon }) => (
                            <button
                                key={key}
                                onClick={() => setSortBy(key)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${sortBy === key ? 'bg-[#5D4037] text-[#D7CCC8] shadow-md' : 'bg-white text-[#5D4037]/50 border border-[#D7CCC8]/40 hover:border-[#5D4037]/40'}`}
                            >
                                <Icon size={11} />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* ── Grille Produits ── */}
                    {activeTab === 'produits' && (
                        <div className="grid grid-cols-2 gap-3 p-4">
                            {sortedProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-[#D7CCC8]/30 shadow-sm group">
                                    <div className="relative aspect-square bg-[#FAF9F6]">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Crayon modification — coin gauche */}
                                        <Link
                                            href={`/product/edit/${product.id}`}
                                            onClick={e => e.stopPropagation()}
                                            className="absolute top-2 left-2 w-8 h-8 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebc57] hover:scale-110 transition-all z-10"
                                        >
                                            <Edit size={13} />
                                        </Link>
                                        {/* Favoris compteur — coin droit */}
                                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm flex flex-col items-center px-2 py-1.5 rounded-xl shadow-md z-10">
                                            <Heart size={11} className="text-[#5D4037]" />
                                            <span className="text-[8px] font-black text-[#5D4037]">{product.likes}</span>
                                        </div>
                                        {/* Temps — coin bas gauche */}
                                        <div className="absolute bottom-2 left-2 bg-[#5D4037]/70 backdrop-blur-sm text-[#D7CCC8] text-[9px] font-black px-2 py-0.5 rounded-lg z-10">
                                            Il y a {product.timeAgo}
                                        </div>
                                    </div>
                                    <Link href={`/product/${product.id}`} className="block p-2.5">
                                        <h3 className="font-bold text-xs text-[#3E2723] line-clamp-2 mb-1 leading-snug">{product.name}</h3>
                                        <div className="flex items-baseline gap-0.5">
                                            <span className="font-black text-[#5D4037] text-sm">{product.price.toLocaleString()}</span>
                                            <span className="text-[9px] font-bold text-[#5D4037]/40">{product.currency}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1 text-[9px] text-[#5D4037]/40 font-medium">
                                            <MapPin size={8} />
                                            <span className="truncate">{product.location}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Grille Vidéos ── */}
                    {activeTab === 'videos' && (
                        <div className="grid grid-cols-2 gap-3 p-4">
                            {sortedVideos.map((video) => (
                                <div key={video.id} className="bg-white rounded-2xl overflow-hidden border border-[#D7CCC8]/30 shadow-sm group">
                                    <div className="relative aspect-[4/3] bg-[#FAF9F6]">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.productName}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Crayon — coin gauche */}
                                        <Link
                                            href={`/video/edit/${video.id}`}
                                            className="absolute top-2 left-2 w-8 h-8 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebc57] hover:scale-110 transition-all z-10"
                                        >
                                            <Edit size={13} />
                                        </Link>
                                        {/* Likes — coin droit */}
                                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm flex items-center gap-1 px-2 py-1 rounded-xl shadow-md z-10">
                                            <Heart size={11} className="text-red-500 fill-red-500" />
                                            <span className="text-[8px] font-black text-[#5D4037]">{video.likes}</span>
                                        </div>
                                        {/* Bouton play au centre */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                                <Play size={18} className="text-white fill-white ml-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={`/feed?id=${video.id}`} className="block p-2.5">
                                        <h3 className="font-bold text-xs text-[#3E2723] line-clamp-2 leading-snug">{video.productName}</h3>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
