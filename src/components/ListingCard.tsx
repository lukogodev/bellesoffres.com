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
        <div className="bg-white border border-chocolate/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative group">
            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-50 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Time Badge - Top left with semi-transparent background */}
                {stats.timeAgo && (
                    <div className="absolute top-2 left-2 bg-chocolate/70 backdrop-blur-sm text-beige text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase">
                        Il y a {stats.timeAgo}
                    </div>
                )}

                {/* Favorite Button - Top right */}
                <button className="absolute top-2 right-2 flex flex-col items-center justify-center w-9 h-11 bg-white/90 backdrop-blur-md rounded-xl shadow-md border border-chocolate/10 hover:bg-white transition-all transform active:scale-90 z-20">
                    <Heart className={`w-4 h-4 ${product.isFavorite ? 'text-favorite fill-current' : 'text-chocolate'}`} />
                    <span className="text-[8px] font-black text-chocolate mt-0.5 leading-none">
                        {stats.favCount}
                    </span>
                </button>
            </Link>

            {/* Content Container */}
            <div className="p-3 flex flex-col flex-grow justify-between gap-1.5">
                <div>
                    {/* Product Title - Noir, Gras */}
                    <h3 className="font-bold text-[13px] leading-tight text-black line-clamp-2 min-h-[2rem]">
                        {product.title}
                    </h3>

                    {/* Price - Chocolat, Extra-Bold (800), espace réduit */}
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="font-[900] text-chocolate text-[16px] tracking-tighter leading-none">
                            {product.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-black text-chocolate/70 uppercase">
                            {product.currency}
                        </span>
                    </div>
                </div>

                {/* Location Bar */}
                <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold pt-1.5 mt-auto border-t border-chocolate/5">
                    <MapPin className="w-3 h-3 text-chocolate/40" />
                    <span className="truncate uppercase tracking-tighter">{product.location}</span>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
