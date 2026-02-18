'use client';

import Image from 'next/image';
import { Product } from '@/types';
import Link from 'next/link';
import { Heart, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const ListingCard = ({ product }: { product: Product }) => {
    // State to handle hydration-safe random values
    const [stats, setStats] = useState({ timeAgo: '', favCount: 0 });

    useEffect(() => {
        // Deterministic "random" based on product ID
        const idNum = parseInt(product.id) || 0;
        const times = ['2h', '5h', '1j', '3j', '1h', '30m'];

        setStats({
            timeAgo: times[idNum % times.length],
            favCount: (idNum * 17) % 50 + 1
        });
    }, [product.id]);

    return (
        <div className="bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full relative group border border-chocolate/5 hover:border-chocolate/10">
            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-50 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Time Badge - Top left */}
                {stats.timeAgo && (
                    <div className="absolute top-3 left-3 bg-chocolate/90 backdrop-blur-md text-beige text-[8px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-xl z-10">
                        {stats.timeAgo}
                    </div>
                )}

                {/* WhatsApp Quick Link - Floating on image */}
                <div className="absolute bottom-3 right-3 z-10">
                    <div className="w-8 h-8 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg border border-white/20 transform hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
                        </svg>
                    </div>
                </div>

                {/* Favorite Badge - Top right */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl border border-white/20 z-10 transition-colors hover:bg-white cursor-pointer">
                    <Heart size={10} className={`${product.isFavorite ? 'text-red-500 fill-current' : 'text-chocolate'}`} />
                    <span className="text-[10px] font-black text-chocolate">{stats.favCount}</span>
                </div>
            </Link>

            {/* Content Container */}
            <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-[13px] leading-snug text-chocolate/70 line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                </h3>

                <div className="flex items-baseline gap-1.5 mt-auto">
                    <span className="font-sans font-[1000] text-chocolate text-[18px] tracking-tighter">
                        {product.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-chocolate/40 uppercase tracking-widest">
                        {product.currency}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                    <MapPin size={12} className="text-gray-300" />
                    <span className="truncate">{product.location.split(',')[0]}</span>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
