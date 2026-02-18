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
        <div className="bg-[#FAF9F6] border border-chocolate/5 rounded-2xl overflow-hidden shadow-none hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group">
            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] w-full bg-beige/10 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Time Badge - Top left */}
                {stats.timeAgo && (
                    <div className="absolute top-2 left-2 bg-chocolate text-beige text-[8px] font-black px-2 py-1 rounded-md tracking-widest uppercase">
                        {stats.timeAgo}
                    </div>
                )}

                {/* Favorite Badge - Top right */}
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Heart size={10} className={`${product.isFavorite ? 'text-red-500 fill-current' : 'text-chocolate'}`} />
                    <span className="text-[8px] font-black">{stats.favCount}</span>
                </div>
            </Link>

            {/* Content Container */}
            <div className="p-3 flex flex-col gap-1">
                <h3 className="font-bold text-[12px] leading-tight text-chocolate/80 line-clamp-1">
                    {product.title}
                </h3>

                <div className="flex items-baseline gap-1">
                    <span className="font-sans font-black text-chocolate text-[15px] tracking-tight">
                        {product.price.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-black text-chocolate/40 uppercase">
                        {product.currency}
                    </span>
                </div>

                <div className="flex items-center gap-1 text-[8px] text-gray-400 font-bold mt-1">
                    <MapPin size={10} />
                    <span className="truncate uppercase">{product.location.split(',')[0]}</span>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
