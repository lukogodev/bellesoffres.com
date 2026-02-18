'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import { MapPin, Heart, TrendingUp, Clock, Flame, UserPlus, MessageCircle } from 'lucide-react';

// Icône WhatsApp
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
    </svg>
);

export default function ShopPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<'produits' | 'videos'>('produits');
    const [sortBy, setSortBy] = useState<'recents' | 'anciens' | 'populaires'>('recents');
    const [showFullBio, setShowFullBio] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Données de la boutique (normalement viendraient d'une API via params.id)
    const shop = {
        shopName: "Boutique Prestige",
        bio: "Bienvenue dans l'univers du luxe. Nous sélectionnons pour vous les pièces les plus rares et exclusives. Livraison VIP disponible. Notre boutique est située au cœur de la ville.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        country: "RD Congo",
        city: "Lubumbashi",
        productsCount: 42,
        subscribersCount: 89450,
        whatsapp: "+243 810 000 000"
    };

    // Produits mockés
    const products = [
        {
            id: "101",
            name: "Rolex Submariner",
            price: 7500000,
            currency: "FCFA",
            image: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=400",
            location: "Lubumbashi, Centre",
            timeAgo: "1h",
            likes: 1205,
            isOwner: false
        },
        {
            id: "102",
            name: "Sac Louis Vuitton",
            price: 1200000,
            currency: "FCFA",
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400",
            location: "Lubumbashi, Golf",
            timeAgo: "4h",
            likes: 643,
            isOwner: false
        }
    ];

    const videos = [
        {
            id: "201",
            productName: "Review Rolex Submariner",
            thumbnail: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=400",
            likes: 4567,
            isOwner: false
        }
    ];

    return (
        <AppContainer className="bg-gray-50">
            {/* Header avec le nom de la boutique au centre */}
            <PageHeader
                variant="page"
                title={shop.shopName}
            />

            <main className="max-w-[1280px] mx-auto px-4 py-6">
                {/* Section Profil Boutique */}
                <div className="bg-white rounded-3xl shadow-lg border border-chocolate/5 p-6 mb-6">
                    <div className="flex items-start gap-6">
                        {/* Photo de profil */}
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full border-4 border-beige overflow-hidden shadow-lg">
                                <Image
                                    src={shop.avatar}
                                    alt={shop.shopName}
                                    width={112}
                                    height={112}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Stats : Produits et Abonnés */}
                        <div className="flex-1 flex gap-6 items-center">
                            <div className="text-center">
                                <div className="text-2xl font-black text-chocolate">
                                    {shop.productsCount}
                                </div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Produits
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-chocolate">
                                    {shop.subscribersCount.toLocaleString()}
                                </div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Abonnés
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nom de la boutique */}
                    <h2 className="text-xl font-black text-chocolate mt-4 mb-2">
                        {shop.shopName}
                    </h2>

                    {/* Bio */}
                    <div className="mb-4 text-sm text-gray-700 leading-relaxed">
                        <p>
                            {showFullBio
                                ? shop.bio
                                : shop.bio.substring(0, 150) + (shop.bio.length > 150 ? "..." : "")
                            }
                        </p>
                        {!showFullBio && shop.bio.length > 150 && (
                            <button
                                onClick={() => setShowFullBio(true)}
                                className="text-xs font-bold text-blue-600 mt-1 hover:underline"
                            >
                                Voir plus
                            </button>
                        )}
                    </div>

                    {/* Localisation */}
                    <div className="flex items-center gap-2 text-sm text-chocolate/70 font-bold mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{shop.country} / {shop.city}</span>
                    </div>

                    {/* Boutons : S'ABONNER et WhatsApp */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setIsSubscribed(!isSubscribed)}
                            className={`flex items-center justify-center gap-2 p-4 border-2 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all active:scale-95 ${isSubscribed
                                    ? 'bg-beige text-chocolate border-chocolate'
                                    : 'bg-chocolate text-beige border-chocolate hover:bg-black'
                                }`}
                        >
                            <UserPlus className="w-5 h-5" />
                            {isSubscribed ? 'Abonné' : 'S\'abonner'}
                        </button>

                        <a
                            href={`https://wa.me/${shop.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 p-4 border-2 border-whatsapp bg-whatsapp text-white rounded-2xl font-bold text-sm tracking-wide hover:bg-[#1ebc57] transition-all active:scale-95 shadow-lg shadow-green-100"
                        >
                            <WhatsAppIcon />
                            <span>Contacter</span>
                        </a>
                    </div>
                </div>

                {/* Grille Produits / Vidéos */}
                <div className="bg-white rounded-3xl shadow-lg border border-chocolate/5 overflow-hidden">
                    {/* Tabs : Produits / Vidéos */}
                    <div className="flex border-b border-gray-100">
                        <button
                            onClick={() => setActiveTab('produits')}
                            className={`flex-1 py-4 font-black text-sm uppercase tracking-wider transition-all ${activeTab === 'produits'
                                ? 'text-chocolate border-b-4 border-chocolate bg-beige/10'
                                : 'text-gray-400 hover:text-chocolate'
                                }`}
                        >
                            Produits
                        </button>
                        <button
                            onClick={() => setActiveTab('videos')}
                            className={`flex-1 py-4 font-black text-sm uppercase tracking-wider transition-all ${activeTab === 'videos'
                                ? 'text-chocolate border-b-4 border-chocolate bg-beige/10'
                                : 'text-gray-400 hover:text-chocolate'
                                }`}
                        >
                            Vidéos
                        </button>
                    </div>

                    {/* Sous-tabs */}
                    <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-100 overflow-x-auto">
                        <button onClick={() => setSortBy('recents')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${sortBy === 'recents' ? 'bg-chocolate text-beige' : 'bg-white text-chocolate border border-chocolate/20'}`}>
                            <Clock className="w-4 h-4" /> Récents
                        </button>
                        <button onClick={() => setSortBy('anciens')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${sortBy === 'anciens' ? 'bg-chocolate text-beige' : 'bg-white text-chocolate border border-chocolate/20'}`}>
                            <TrendingUp className="w-4 h-4" /> Populaires
                        </button>
                    </div>

                    {/* Grille de contenu */}
                    <div className="p-4">
                        {activeTab === 'produits' ? (
                            <div className="grid grid-cols-2 gap-4">
                                {products.map((product) => (
                                    <Link key={product.id} href={`/product/${product.id}`} className="bg-white border-2 border-beige rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                        <div className="relative aspect-square">
                                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-xl shadow-md flex flex-col items-center">
                                                <Heart className="w-4 h-4 text-chocolate" />
                                                <span className="text-[10px] font-black">{product.likes}</span>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-bold text-[13px] line-clamp-2">{product.name}</h3>
                                            <div className="font-black text-chocolate text-base mt-2">{product.price.toLocaleString()} FCFA</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {videos.map((video) => (
                                    <Link key={video.id} href={`/video/${video.id}`} className="bg-white border-2 border-beige rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                        <div className="relative aspect-[4/3]">
                                            <Image src={video.thumbnail} alt={video.productName} fill className="object-cover" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <MessageCircle className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-bold text-[13px] line-clamp-2">{video.productName}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Inactif sur Boutique visitée comme demandé */}
            <div className="h-20" />
        </AppContainer>
    );
}
