'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';
import AppContainer from '@/components/AppContainer';
import { Settings, MapPin, DollarSign, Heart, Edit, TrendingUp, Clock, Flame } from 'lucide-react';

// Icône WhatsApp
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
    </svg>
);

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'produits' | 'videos'>('produits');
    const [sortBy, setSortBy] = useState<'recents' | 'anciens' | 'populaires'>('recents');
    const [showFullBio, setShowFullBio] = useState(false);

    // Données du profil (normalement viendraient d'une API)
    const profile = {
        shopName: "Boutique Élégance",
        bio: "Spécialiste en mode et beauté depuis 2020. Nous proposons des produits de qualité premium importés directement. Livraison rapide dans toute la RDC. Garantie satisfaction ou remboursé. Suivez-nous pour ne rien manquer de nos nouvelles collections !",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        country: "RD Congo",
        city: "Kinshasa",
        productsCount: 17,
        subscribersCount: 133456,
        whatsapp: "+243 900 000 000"
    };

    // Produits mockés
    const products = [
        {
            id: "1",
            name: "iPhone 13 Pro Max",
            price: 850000,
            currency: "FCFA",
            image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400",
            location: "Kinshasa, Gombe",
            timeAgo: "2h",
            likes: 45,
            isOwner: true
        },
        {
            id: "2",
            name: "Sac à Main Gucci",
            price: 450000,
            currency: "FCFA",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400",
            location: "Kinshasa, Lemba",
            timeAgo: "1j",
            likes: 89,
            isOwner: true
        }
    ];

    const videos = [
        {
            id: "1",
            productName: "iPhone 13 Pro Max",
            thumbnail: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400",
            likes: 234,
            isOwner: true
        }
    ];

    return (
        <AppContainer className="bg-gray-50">
            {/* Header */}
            <PageHeader
                variant="page"
                title="Mon Profil"
                rightContent={
                    <Link href="/settings" className="p-2 bg-beige/10 rounded-full text-beige hover:bg-beige/20 transition-colors">
                        <Settings className="w-5 h-5" />
                    </Link>
                }
            />

            <main className="max-w-[1280px] mx-auto px-4 py-6">
                {/* Section Profil */}
                <div className="bg-white rounded-3xl shadow-lg border border-chocolate/5 p-6 mb-6">
                    <div className="flex items-start gap-6">
                        {/* Photo de profil */}
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full border-4 border-beige overflow-hidden shadow-lg">
                                <Image
                                    src={profile.avatar}
                                    alt={profile.shopName}
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
                                    {profile.productsCount}
                                </div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Produits
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-chocolate">
                                    {profile.subscribersCount.toLocaleString()}
                                </div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Abonnés
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nom de la boutique */}
                    <h2 className="text-xl font-black text-chocolate mt-4 mb-2">
                        {profile.shopName}
                    </h2>

                    {/* Bio */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {showFullBio
                                ? profile.bio
                                : profile.bio.split('\n').slice(0, 2).join(' ').substring(0, 150) + '...'
                            }
                        </p>
                        {!showFullBio && (
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
                        <span>{profile.country} / {profile.city}</span>
                    </div>

                    {/* Boutons : INVESTIR et WhatsApp */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Bouton INVESTIR */}
                        <Link
                            href="/invest"
                            className="flex items-center justify-center gap-2 p-4 border-2 border-chocolate rounded-2xl bg-white text-chocolate font-bold text-sm uppercase tracking-wider hover:bg-beige/20 transition-all active:scale-95"
                        >
                            <DollarSign className="w-5 h-5" />
                            Investir
                        </Link>

                        {/* Bouton WhatsApp */}
                        <a
                            href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 p-4 border-2 border-whatsapp rounded-2xl bg-whatsapp/10 text-black font-bold text-sm tracking-wide hover:bg-whatsapp/20 transition-all active:scale-95"
                        >
                            <WhatsAppIcon />
                            Mon WhatsApp
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

                    {/* Sous-tabs : Récents / Anciens / Populaires */}
                    <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-100 overflow-x-auto">
                        <button
                            onClick={() => setSortBy('recents')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${sortBy === 'recents'
                                    ? 'bg-chocolate text-beige'
                                    : 'bg-white text-chocolate border border-chocolate/20 hover:border-chocolate/40'
                                }`}
                        >
                            <Clock className="w-4 h-4" />
                            Récents
                        </button>
                        <button
                            onClick={() => setSortBy('anciens')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${sortBy === 'anciens'
                                    ? 'bg-chocolate text-beige'
                                    : 'bg-white text-chocolate border border-chocolate/20 hover:border-chocolate/40'
                                }`}
                        >
                            <TrendingUp className="w-4 h-4" />
                            Anciens
                        </button>
                        <button
                            onClick={() => setSortBy('populaires')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${sortBy === 'populaires'
                                    ? 'bg-chocolate text-beige'
                                    : 'bg-white text-chocolate border border-chocolate/20 hover:border-chocolate/40'
                                }`}
                        >
                            <Flame className="w-4 h-4" />
                            Populaires
                        </button>
                    </div>

                    {/* Grille de contenu */}
                    <div className="p-4">
                        {activeTab === 'produits' ? (
                            <div className="grid grid-cols-2 gap-4">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-beige/10 border-2 border-chocolate/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-square bg-gray-100">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            {/* Crayon de modification (coin supérieur gauche) */}
                                            {product.isOwner && (
                                                <Link
                                                    href={`/product/edit/${product.id}`}
                                                    className="absolute top-2 left-2 bg-whatsapp text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                            )}

                                            {/* Favoris avec compteur (coin supérieur droit) */}
                                            <button className="absolute top-2 right-2 flex flex-col items-center bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-xl shadow-md z-10">
                                                <Heart className="w-4 h-4 text-chocolate" />
                                                <span className="text-[8px] font-black text-chocolate">{product.likes}</span>
                                            </button>

                                            {/* Temps depuis publication */}
                                            <div className="absolute bottom-2 left-2 bg-chocolate/70 backdrop-blur-sm text-beige text-[9px] font-black px-2 py-1 rounded-lg">
                                                Il y a {product.timeAgo}
                                            </div>
                                        </div>

                                        {/* Infos */}
                                        <div className="p-3">
                                            <h3 className="font-bold text-sm text-black line-clamp-2 mb-1">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="font-[900] text-chocolate text-base">
                                                    {product.price.toLocaleString()}
                                                </span>
                                                <span className="text-[10px] font-black text-chocolate/70">
                                                    {product.currency}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold">
                                                <MapPin className="w-3 h-3" />
                                                <span className="truncate">{product.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {videos.map((video) => (
                                    <div
                                        key={video.id}
                                        className="bg-beige/10 border-2 border-chocolate/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative aspect-[4/3] bg-gray-100">
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.productName}
                                                fill
                                                className="object-cover"
                                            />

                                            {/* Crayon de modification (coin supérieur gauche) */}
                                            {video.isOwner && (
                                                <Link
                                                    href={`/video/edit/${video.id}`}
                                                    className="absolute top-2 left-2 bg-whatsapp text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                            )}

                                            {/* Compteur de likes (coin supérieur droit) */}
                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-xl shadow-md flex items-center gap-1">
                                                <Heart className="w-4 h-4 text-red-500 fill-current" />
                                                <span className="text-xs font-black text-chocolate">{video.likes}</span>
                                            </div>

                                            {/* Play button */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                    <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Nom du produit */}
                                        <div className="p-3">
                                            <h3 className="font-bold text-sm text-black line-clamp-2">
                                                {video.productName}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
