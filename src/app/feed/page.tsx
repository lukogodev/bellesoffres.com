'use client';

import { useState } from 'react';
import { Heart, MapPin, ChevronLeft, Play, User, Share2, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import data from '@/mock/data.json';
import { Product } from '@/types';

export default function FeedPage() {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [liked, setLiked] = useState<Record<string, boolean>>({});

    const videos = data.products.map(p => ({
        ...p,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-off-her-clothes-34533-large.mp4", // Mock video
        likes: Math.floor(Math.random() * 500) + 100
    }));

    const handleLike = (id: string) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const product = videos[currentVideo] as any;

    return (
        <div className="h-screen w-full bg-black overflow-hidden relative">

            {/* 1. Header Vidéos */}
            <header className="absolute top-0 left-0 right-0 z-50 bg-chocolate/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-beige p-1">
                        <ChevronLeft size={28} />
                    </Link>
                    <h1 className="text-2xl font-black text-beige tracking-widest uppercase italic" style={{ fontFamily: 'sans-serif' }}>
                        Vidéos
                    </h1>
                    <div className="w-10"></div> {/* Spacer */}
                </div>

                {/* Switcher Buttons */}
                <div className="max-w-6xl mx-auto px-4 pb-4 flex gap-4">
                    <button className="flex-1 py-2.5 bg-beige text-chocolate rounded-xl font-black text-xs uppercase tracking-wider shadow-lg">
                        Nouveautés
                    </button>
                    <button className="flex-1 py-2.5 bg-beige/10 text-beige border border-beige/30 rounded-xl font-black text-xs uppercase tracking-wider">
                        À proximité
                    </button>
                </div>
            </header>

            {/* 2. Video Player Shell (Vertical) */}
            <div className="h-full w-full flex items-center justify-center bg-gray-900">
                <div className="relative h-full w-full max-w-[500px] overflow-hidden">
                    {/* Mock Video Container */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />

                    <video
                        className="h-full w-full object-cover"
                        src={product.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />

                    {/* 3. Interaction Overlay (Right Side) */}
                    <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-30">
                        {/* Profile Shop */}
                        <Link href={`/profile/${product.seller.id}`} className="relative group">
                            <div className="w-14 h-14 rounded-full border-[3px] border-beige overflow-hidden shadow-2xl transition-transform active:scale-90">
                                <img src={`https://placehold.co/100x100/chocolate/beige.png?text=${product.seller.name.charAt(0)}`} className="w-full h-full object-cover" alt="Shop" />
                            </div>
                            <div className="absolute -bottom-2 bg-chocolate text-beige rounded-full p-1 border-2 border-beige group-hover:bg-beige group-hover:text-chocolate transition-colors">
                                <ChevronRightSmall />
                            </div>
                        </Link>

                        {/* Heart / Like */}
                        <div className="flex flex-col items-center gap-1">
                            <button
                                onClick={() => handleLike(product.id)}
                                className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl border border-white/20 active:scale-75 transition-all"
                            >
                                <Heart className={`w-7 h-7 ${liked[product.id] ? 'text-red-500 fill-current' : 'text-white'}`} />
                            </button>
                            <span className="text-white text-xs font-black drop-shadow-md">
                                {liked[product.id] ? product.likes + 1 : product.likes}
                            </span>
                        </div>

                        {/* WhatsApp Icon */}
                        <a
                            href={`https://wa.me/${product.seller.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            className="w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shadow-2xl border-2 border-white/50 active:scale-125 transition-transform"
                        >
                            <WhatsAppIcon />
                        </a>

                        {/* Share */}
                        <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
                            <Share2 size={24} />
                        </button>
                    </div>

                    {/* 4. Bottom Info Overlay */}
                    <div className="absolute bottom-24 left-4 right-20 z-30 space-y-4">
                        {/* Nom du Profil / Shop */}
                        <div className="flex items-center gap-2">
                            <span className="bg-chocolate text-beige px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tight shadow-md">
                                @{product.seller.name.replace(/\s/g, '').toLowerCase()}
                            </span>
                        </div>

                        {/* CTA: Voir l'Annonce */}
                        <Link
                            href={`/product/${product.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-2xl transition-all hover:bg-white/20 active:scale-95"
                        >
                            Voir l&apos;annonce
                            <ChevronRightSmall />
                        </Link>

                        {/* Description */}
                        <div className="space-y-1">
                            <div className={`relative transition-all duration-300 ${showFullDesc ? 'bg-black/40 backdrop-blur-sm p-4 rounded-2xl -mx-2' : ''}`}>
                                <p className={`text-white text-sm font-medium drop-shadow-md leading-relaxed ${!showFullDesc && 'line-clamp-1'}`}>
                                    {product.title} - Best price in Ivory Coast! Available at {product.location}. Limited stock.
                                </p>
                                <button
                                    onClick={() => setShowFullDesc(!showFullDesc)}
                                    className="text-beige font-black text-xs mt-1 underline decoration-2 underline-offset-4 flex items-center gap-1"
                                >
                                    {showFullDesc ? 'Voir moins' : 'Voir plus'}
                                    {showFullDesc ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Basse */}
            <BottomNav />

            {/* Scroll Indicator */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                {videos.map((_, i) => (
                    <div key={i} className={`w-1 h-3 rounded-full transition-all ${currentVideo === i ? 'bg-beige h-8' : 'bg-beige/20'}`} />
                ))}
            </div>
        </div>
    );
}

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
    </svg>
);

const ChevronRightSmall = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);
