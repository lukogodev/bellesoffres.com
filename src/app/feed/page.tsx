'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Heart, Share2, Home, Volume2, VolumeX } from 'lucide-react';

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
    const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Vidéos mockées
    const videos: Video[] = [
        {
            id: "1",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            thumbnail: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400",
            productName: "iPhone 13 Pro Max 256GB",
            price: 850000,
            currency: "FCFA",
            description: "iPhone 13 Pro Max neuf, jamais utilisé. Capacité 256GB, couleur Sierra Blue. Boîte scellée avec tous les accessoires d'origine.",
            seller: {
                name: "TechStore",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
                shopId: "shop-1"
            },
            likes: 234,
            location: "Kinshasa, Gombe"
        },
        {
            id: "2",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400",
            productName: "Sac Gucci Original",
            price: 450000,
            currency: "FCFA",
            description: "Sac à main Gucci authentique, état neuf. Livré avec certificat d'authenticité et boîte d'origine.",
            seller: {
                name: "LuxuryShop",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
                shopId: "shop-2"
            },
            likes: 567,
            location: "Kinshasa, Lemba"
        }
    ];

    const currentVideo = videos[currentVideoIndex];

    // Gestion du scroll pour changer de vidéo
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollPosition = container.scrollTop;
        const videoHeight = window.innerHeight;
        const newIndex = Math.round(scrollPosition / videoHeight);

        if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
            setCurrentVideoIndex(newIndex);
        }
    };

    // Auto-play de la vidéo courante
    useEffect(() => {
        const currentVideoRef = videoRefs.current[currentVideoIndex];
        if (currentVideoRef) {
            // Pause toutes les autres vidéos
            videoRefs.current.forEach((ref, index) => {
                if (ref && index !== currentVideoIndex) {
                    ref.pause();
                }
            });
            // Play vidéo courante
            currentVideoRef.play().catch(() => { });
        }
    }, [currentVideoIndex]);

    const toggleLike = (videoId: string) => {
        const newLiked = new Set(likedVideos);
        if (newLiked.has(videoId)) {
            newLiked.delete(videoId);
        } else {
            newLiked.add(videoId);
        }
        setLikedVideos(newLiked);
    };

    const toggleDescription = (videoId: string) => {
        const newExpanded = new Set(expandedDescriptions);
        if (newExpanded.has(videoId)) {
            newExpanded.delete(videoId);
        } else {
            newExpanded.add(videoId);
        }
        setExpandedDescriptions(newExpanded);
    };

    return (
        <div className="fixed inset-0 bg-black">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-50 bg-gradient-to-b from-black/60 to-transparent">
                <button
                    onClick={() => router.push('/')}
                    className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white active:scale-90 transition-transform"
                >
                    <Home size={24} />
                </button>
                <h1 className="text-white font-black text-lg drop-shadow-lg">Vidéos</h1>
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white active:scale-90 transition-transform"
                >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
            </div>

            {/* Container de scroll vertical */}
            <div
                ref={containerRef}
                className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
                onScroll={handleScroll}
                style={{ scrollBehavior: 'smooth' }}
            >
                {videos.map((video, index) => (
                    <div
                        key={video.id}
                        className="w-full h-screen snap-start snap-always relative flex items-center justify-center bg-black"
                    >
                        {/* Vidéo */}
                        <video
                            ref={(el) => { videoRefs.current[index] = el; }}
                            src={video.videoUrl}
                            className="w-full h-full object-cover"
                            playsInline
                            loop
                            muted={isMuted}
                            style={{ aspectRatio: '9/16' }}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

                        {/* Boutons d'action à droite */}
                        <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-30">
                            {/* Photo de profil */}
                            <button
                                onClick={() => router.push(`/shop/${video.seller.shopId}`)}
                                className="relative w-14 h-14 rounded-full border-2 border-white overflow-hidden active:scale-90 transition-transform"
                            >
                                <Image
                                    src={video.seller.avatar}
                                    alt={video.seller.name}
                                    fill
                                    className="object-cover"
                                />
                            </button>

                            {/* Like */}
                            <button
                                onClick={() => toggleLike(video.id)}
                                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                            >
                                <Heart
                                    size={32}
                                    className={`${likedVideos.has(video.id) ? 'fill-red-500 text-red-500' : 'text-white'} drop-shadow-lg`}
                                />
                                <span className="text-white text-xs font-bold drop-shadow-lg">
                                    {(video.likes + (likedVideos.has(video.id) ? 1 : 0)).toLocaleString()}
                                </span>
                            </button>

                            {/* WhatsApp */}
                            <button
                                onClick={() => window.open(`https://wa.me/`, '_blank')}
                                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                            >
                                <div className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center shadow-lg">
                                    <WhatsAppIcon />
                                </div>
                            </button>

                            {/* Partager */}
                            <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                                <Share2 size={32} className="text-white drop-shadow-lg" />
                            </button>
                        </div>

                        {/* Informations en bas */}
                        <div className="absolute bottom-4 left-4 right-20 z-30 text-white space-y-3">
                            {/* Nom boutique */}
                            <button
                                onClick={() => router.push(`/shop/${video.seller.shopId}`)}
                                className="flex items-center gap-2 active:scale-95 transition-transform"
                            >
                                <h3 className="font-black text-base drop-shadow-lg">
                                    @{video.seller.name}
                                </h3>
                            </button>

                            {/* Description */}
                            <div className="space-y-1">
                                <p className="text-sm font-medium drop-shadow-lg leading-relaxed">
                                    {expandedDescriptions.has(video.id)
                                        ? video.description
                                        : video.description.substring(0, 80) + '...'
                                    }
                                </p>
                                {!expandedDescriptions.has(video.id) && (
                                    <button
                                        onClick={() => toggleDescription(video.id)}
                                        className="text-sm font-bold text-beige underline drop-shadow-lg"
                                    >
                                        Voir plus
                                    </button>
                                )}
                            </div>

                            {/* Prix */}
                            <div className="flex items-baseline gap-2 drop-shadow-lg">
                                <span className="text-2xl font-black text-beige">
                                    {video.price.toLocaleString()}
                                </span>
                                <span className="text-sm font-bold text-beige/90">
                                    {video.currency}
                                </span>
                            </div>

                            {/* Localisation */}
                            <div className="text-xs font-bold text-white/90 drop-shadow-lg">
                                📍 {video.location}
                            </div>

                            {/* Bouton VOIR L'ANNONCE */}
                            <button
                                onClick={() => router.push(`/product/${video.id}`)}
                                className="w-full py-3 bg-whatsapp hover:bg-[#1ebc57] text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all mt-2"
                            >
                                VOIR L'ANNONCE
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
