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
    <AppContainer className="bg-white pb-24">
      {/* Header Shell */}
      <PageHeader variant="home" />

      {/* Hero / Barre de Recherche */}
      <div className="bg-chocolate pb-8 pt-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/30 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-[13px] font-bold text-chocolate placeholder:text-chocolate/20 focus:outline-none focus:ring-4 focus:ring-beige/10 transition-all border-none"
              />
            </div>
            <button className="bg-beige/10 p-3 rounded-xl border border-beige/20 text-beige hover:bg-beige/20 transition-all">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Banner Catégories Shell */}
      <CategoryBar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Titre et Action Proximité */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black text-chocolate uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-5 h-5 fill-chocolate" />
              Nouveautés
            </h2>
            <button
              onClick={() => setIsLocationOpen(true)}
              className="px-3 py-1 bg-beige/50 text-chocolate text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-beige transition-all border border-chocolate/5 flex items-center gap-1"
            >
              <MapPin size={10} />
              À proximité
            </button>
          </div>
          <div className="text-chocolate/20 text-[10px] font-black tracking-widest uppercase">
            {products.length} ARTICLES
          </div>
        </div>

        {/* Grille Flex / Vidéo hybride */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-8">
          {products.map((product, index) => {
            // Afficher la section vidéo après la 8ème carte (4ème ligne sur mobile, 2ème sur desktop)
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
                  <div className="col-span-2 md:col-span-4 lg:col-span-4 py-12 my-4 bg-chocolate rounded-[3rem] -mx-2 px-6">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
                        <span className="w-10 h-px bg-white/20"></span>
                        🎥 Les Offres en Vidéo
                      </h3>
                      <Link href="/feed" className="text-[10px] font-black text-beige/50 uppercase tracking-widest hover:text-white transition-colors">
                        Voir tout
                      </Link>
                    </div>

                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2 snap-x">
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
                          className="min-w-[150px] md:min-w-[200px] aspect-[9/16] bg-black/20 rounded-[2rem] overflow-hidden relative snap-start group cursor-pointer border border-white/10"
                        >
                          <Image
                            src={v.img}
                            alt={v.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                            <p className="text-white text-[10px] font-black uppercase tracking-wider mb-1 opacity-80">{v.title}</p>
                            <p className="text-beige text-sm font-black font-sans">{v.price} FCFA</p>
                          </div>

                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                              <Play size={20} className="text-chocolate fill-chocolate ml-1" />
                            </div>
                          </div>

                          <div className="absolute top-4 right-4 h-6 w-10 bg-red-600 rounded-lg flex items-center justify-center animate-pulse">
                            <span className="text-[8px] font-black text-white uppercase">Live</span>
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
