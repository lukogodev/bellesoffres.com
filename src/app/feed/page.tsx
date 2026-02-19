'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Heart, Share2, Home, Volume2, VolumeX, MapPin } from 'lucide-react';

// Icône WhatsApp
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
    </svg>
);

interface Video {
    id: string;
    videoUrl: string;
    thumbnail: string;
    productName: string;
    price: number;
    currency: string;
    description: string;
    seller: {
        name: string;
        avatar: string;
        shopId: string;
    };
    likes: number;
    location: string;
}

export default function VideoFeedPage() {
    const router = useRouter();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Vidéos mockées pour la démo
    const videos: Video[] = [
        {
            id: "1",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            thumbnail: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400",
            productName: "iPhone 13 Pro Max",
            price: 850000,
            currency: "FCFA",
            description: "Neuf, scellé. 256GB.",
            seller: {
                name: "TechStore",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
                shopId: "shop-1"
            },
            likes: 234,
            location: "Gombe, Kinshasa"
        },
        {
            id: "2",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400",
            productName: "Sac Gucci Original",
            price: 450000,
            currency: "FCFA",
            description: "Authentique, certificat fourni.",
            seller: {
                name: "LuxuryShop",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
                shopId: "shop-2"
            },
            likes: 567,
            location: "Lemba, Kinshasa"
        }
    ];

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollPosition = container.scrollTop;
        const videoHeight = window.innerHeight;
        const newIndex = Math.round(scrollPosition / videoHeight);

        if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
            setCurrentVideoIndex(newIndex);
        }
    };

    useEffect(() => {
        const currentVideoRef = videoRefs.current[currentVideoIndex];
        if (currentVideoRef) {
            videoRefs.current.forEach((ref, index) => {
                if (ref && index !== currentVideoIndex) ref.pause();
            });
            currentVideoRef.play().catch(() => { });
        }
    }, [currentVideoIndex]);

    const toggleLike = (videoId: string) => {
        const newLiked = new Set(likedVideos);
        if (newLiked.has(videoId)) newLiked.delete(videoId);
        else newLiked.add(videoId);
        setLikedVideos(newLiked);
    };

    return (
        <div className="fixed inset-0 bg-black overflow-hidden">
            {/* Minimal Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50">
                <button
                    onClick={() => router.push('/')}
                    className="w-12 h-12 bg-chocolate/20 backdrop-blur-xl rounded-full flex items-center justify-center text-beige active:scale-90 transition-all border border-white/10"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="px-4 py-2 bg-chocolate/20 backdrop-blur-xl rounded-full border border-white/10">
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">EN DIRECT</span>
                </div>
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-12 h-12 bg-chocolate/20 backdrop-blur-xl rounded-full flex items-center justify-center text-beige active:scale-90 transition-all border border-white/10"
                >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
            </div>

            {/* Vertical Video Container */}
            <div
                ref={containerRef}
                className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
                onScroll={handleScroll}
            >
                {videos.map((video, index) => (
                    <div
                        key={video.id}
                        className="w-full h-full snap-start relative flex items-center justify-center bg-black"
                    >
                        <video
                            ref={(el) => { videoRefs.current[index] = el; }}
                            src={video.videoUrl}
                            className="w-full h-full object-cover"
                            playsInline
                            loop
                            muted={isMuted}
                        />

                        {/* Shadows for UI readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                        {/* Side Actions (Floating) */}
                        <div className="absolute right-6 bottom-40 flex flex-col gap-8 z-30">
                            <button
                                onClick={() => toggleLike(video.id)}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${likedVideos.has(video.id) ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-white/10 backdrop-blur-md group-hover:bg-white/20'}`}>
                                    <Heart
                                        size={28}
                                        className={`${likedVideos.has(video.id) ? 'fill-white text-white' : 'text-white'}`}
                                    />
                                </div>
                                <span className="text-white text-[10px] font-black tracking-widest uppercase">
                                    {(video.likes + (likedVideos.has(video.id) ? 1 : 0))}
                                </span>
                            </button>

                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
                                    <Share2 size={28} className="text-white" />
                                </div>
                                <span className="text-white text-[10px] font-black tracking-widest uppercase">Partager</span>
                            </button>

                            <a
                                href={`https://wa.me/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 bg-whatsapp shadow-lg shadow-green-500/50 rounded-full flex items-center justify-center active:scale-95 transition-all animate-bounce"
                            >
                                <WhatsAppIcon />
                            </a>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="absolute bottom-10 left-6 right-24 z-30 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border-2 border-beige overflow-hidden">
                                    <img src={video.seller.avatar} alt="" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-white font-black text-sm tracking-wide">@{video.seller.name.toLowerCase()}</h3>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-beige font-black text-2xl tracking-tighter uppercase leading-none">{video.productName}</h2>
                                <p className="text-white/80 text-xs font-medium line-clamp-2">{video.description}</p>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-white font-sans tracking-tight">
                                    {video.price.toLocaleString()}
                                </span>
                                <span className="text-xs font-black text-beige/80 uppercase tracking-widest">
                                    {video.currency}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] font-black text-white/60 uppercase tracking-widest">
                                <MapPin size={12} className="text-beige" />
                                {video.location}
                            </div>

                            <button
                                onClick={() => router.push(`/product/${video.id}`)}
                                className="w-full py-4 px-6 bg-white text-chocolate rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-beige transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                Voir l'annonce complète
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
