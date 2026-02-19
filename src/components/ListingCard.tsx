'use client';

import Image from 'next/image';
import { Product } from '@/types';
import Link from 'next/link';
import { Heart, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const ListingCard = ({ product }: { product: Product }) => {
    const [stats, setStats] = useState({ timeAgo: '', favCount: 0 });
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const idNum = parseInt(product.id) || 0;
        const times = ['Il ya 45 min', 'Il ya 2h', 'Il ya 1j', 'Il ya 3j', 'Il ya 30 min', 'Il ya 5h'];
        setStats({
            timeAgo: times[idNum % times.length],
            favCount: (idNum * 17) % 50 + 1
        });
        setIsFav(product.isFavorite || false);
    }, [product.id, product.isFavorite]);

    return (
        <div className="bg-white rounded-2xl overflow-hidden flex flex-col border border-[#D7CCC8]/30 hover:shadow-md transition-all duration-300 group">
            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-[#FAF9F6] overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Favorite Button - top right */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsFav(prev => !prev);
                        setStats(prev => ({
                            ...prev,
                            favCount: isFav ? prev.favCount - 1 : prev.favCount + 1
                        }));
                    }}
                    className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform active:scale-95"
                >
                    <Heart
                        size={13}
                        className={isFav ? 'fill-red-500 text-red-500' : 'text-[#5D4037]'}
                    />
                </button>

                {/* Count badge */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 z-10 shadow-sm">
                    <Heart size={9} className={isFav ? 'fill-red-500 text-red-500' : 'text-[#5D4037]/60'} />
                    <span className="text-[9px] font-black text-[#5D4037]">{stats.favCount}</span>
                </div>
            </Link>

            {/* Content */}
            <Link href={`/product/${product.id}`} className="p-3 flex flex-col gap-1.5 flex-1">
                <h3 className="font-bold text-[13px] leading-snug text-[#3E2723] line-clamp-2">
                    {product.title}
                </h3>

                <div className="flex items-baseline gap-1 mt-auto">
                    <span className="font-black text-[#5D4037] text-[15px] tracking-tight">
                        {product.price.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-bold text-[#5D4037]/40 uppercase">
                        {product.currency}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#D7CCC8]/20">
                    <div className="flex items-center gap-1 text-[9px] text-[#5D4037]/50 font-medium">
                        <MapPin size={9} className="text-[#5D4037]/40 shrink-0" />
                        <span className="truncate">{product.location.split(',')[0]}</span>
                    </div>
                    <span className="text-[9px] text-[#5D4037]/40 font-medium whitespace-nowrap shrink-0">{stats.timeAgo}</span>
                </div>

                {/* WhatsApp quick link */}
                <a
                    href={`https://wa.me/${product.seller?.whatsapp?.replace(/\D/g, '') || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-[9px] font-bold text-[#25D366] hover:text-[#1ebc57] transition-colors mt-0.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                    Contacter
                </a>
            </Link>
        </div>
    );
};

export default ListingCard;
