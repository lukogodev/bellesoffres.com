'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  Heart,
  Search,
  Send,
  SlidersHorizontal,
  MapPin,
  Zap,
  Play
} from 'lucide-react';

import ListingCard from "@/components/ListingCard";
import BottomNav from "@/components/BottomNav";
import CategoryBar from "@/components/CategoryBar";
import LocationFilter from "@/components/LocationFilter";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import data from "@/mock/data.json";
import { Product } from "@/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const sorted = [...(data.products as Product[])].sort((a, b) =>
      parseInt(b.id) - parseInt(a.id)
    );
    setProducts(sorted);
  }, []);

  return (
    <AppContainer className="bg-white pb-32">
      {/* Header Shell */}
      <PageHeader variant="home" />

      {/* Hero / Barre de Recherche */}
      <div className="bg-chocolate pb-10 pt-4 px-4">
        <div className="flex items-center gap-3">
          <Link href="/search" className="relative flex-1 block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/30 w-4 h-4" />
            <div className="w-full pl-11 pr-4 py-4 bg-white rounded-2xl text-[14px] font-bold text-chocolate/20 shadow-inner border-none cursor-text">
              Rechercher sur Belles Offres...
            </div>
          </Link>
          <Link href="/search" className="bg-white/10 p-4 rounded-2xl border border-white/10 text-beige hover:bg-white/20 transition-all">
            <SlidersHorizontal className="w-5 h-5 font-bold" />
          </Link>
        </div>
      </div>

      {/* Banner Catégories Shell */}
      <CategoryBar />

      <main className="px-4 py-8 pb-32">
        {/* Titre et Action Proximité */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-[1000] text-chocolate uppercase tracking-tighter flex items-center gap-2">
              Nouveautés
            </h2>
            <button
              onClick={() => setIsLocationOpen(true)}
              className="px-5 py-2 bg-chocolate text-beige text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-black transition-all shadow-lg flex items-center gap-2"
            >
              <MapPin size={12} className="text-beige" />
              À proximité
            </button>
          </div>
          <div className="text-chocolate/20 text-[10px] font-black tracking-widest uppercase md:block hidden">
            {products.length} ARTICLES DISPONIBLES
          </div>
        </div>

        {/* Grille Flex / Vidéo hybride */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-12">
          {products.map((product, index) => {
            // Afficher la section vidéo après la 8ème carte
            const showVideoAfter = index === 7;

            return (
              <div key={`${product.id}-${index}`} className="contents">
                <div
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ListingCard product={product} />
                </div>

                {showVideoAfter && (
                  <div className="col-span-2 md:col-span-4 lg:col-span-4 py-16 my-10 bg-chocolate rounded-[3.5rem] -mx-4 px-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
                        <span className="w-12 h-px bg-white/20"></span>
                        🎥 Les Offres en Vidéo
                      </h3>
                      <Link href="/feed" className="text-[10px] font-black text-beige/50 uppercase tracking-widest hover:text-white transition-colors">
                        Tout voir
                      </Link>
                    </div>

                    <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2 snap-x">
                      {/* Video Thumbnails */}
                      {[
                        { id: '1', title: 'iPhone 13 Pro', price: '450.000', img: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400' },
                        { id: '2', title: 'Sac de Luxe', price: '125.000', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400' },
                        { id: '3', title: 'Nike Air Max', price: '85.000', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400' },
                        { id: '4', title: 'Montre Rolex', price: '2.500.000', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=400' },
                        { id: '5', title: 'Macbook Pro M2', price: '1.200.000', img: 'https://images.unsplash.com/photo-1517336714460-d15024229188?q=80&w=400' }
                      ].map((v, i) => (
                        <Link
                          href={`/feed?id=${v.id}`}
                          key={v.id}
                          className="min-w-[160px] md:min-w-[220px] aspect-[9/16] bg-black/20 rounded-[2.5rem] overflow-hidden relative snap-start group cursor-pointer border border-white/10"
                        >
                          <Image
                            src={v.img}
                            alt={v.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                            <p className="text-white text-[10px] font-black uppercase tracking-wider mb-2 opacity-80">{v.title}</p>
                            <p className="text-beige text-lg font-black font-sans tracking-tight">{v.price} FCFA</p>
                          </div>

                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-2xl">
                              <Play size={20} className="text-chocolate fill-chocolate ml-1" />
                            </div>
                          </div>

                          <div className="absolute top-5 right-5 h-6 w-12 bg-red-600 rounded-lg flex items-center justify-center animate-pulse border border-white/20 shadow-xl">
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Live</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>

      <LocationFilter isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} onApply={setLocationFilter} />

      <BottomNav />
    </AppContainer>
  );
}
