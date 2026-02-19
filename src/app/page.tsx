'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Play,
  Send
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
  const [activeTab, setActiveTab] = useState<'new' | 'nearby'>('new');

  useEffect(() => {
    const sorted = [...(data.products as Product[])].sort((a, b) =>
      parseInt(b.id) - parseInt(a.id)
    );
    setProducts(sorted);
  }, []);

  return (
    <AppContainer className="bg-white pb-36">
      {/* Header chocolat avec titre centré */}
      <PageHeader variant="home" />

      {/* Zone de recherche — fond chocolat */}
      <div className="bg-[#5D4037] pb-6 pt-3 px-4">
        <div className="flex items-center gap-3">
          {/* Input factice -> vers /search */}
          <Link href="/search" className="relative flex-1 block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D4037]/50 w-4 h-4 z-10" />
            <div className="w-full pl-11 pr-12 py-3.5 bg-[#FAF9F6] rounded-2xl text-[13px] font-medium text-[#5D4037]/40 shadow-inner border-2 border-[#D7CCC8]/40 cursor-text select-none">
              Rechercher un Produit
            </div>
            {/* Icône envoyer */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#5D4037] rounded-xl flex items-center justify-center">
              <Send size={12} className="text-[#D7CCC8]" />
            </div>
          </Link>

          {/* Filtrer */}
          <Link
            href="/search"
            className="bg-[#D7CCC8] px-4 py-3.5 rounded-2xl text-[13px] font-bold text-[#5D4037] flex items-center gap-2 hover:bg-[#BCAAA4] transition-all whitespace-nowrap"
          >
            <SlidersHorizontal size={14} strokeWidth={2.5} />
            Filtrer
          </Link>
        </div>
      </div>

      {/* Catégories */}
      <CategoryBar />

      {/* Onglets Nouveautés / À proximité */}
      <div className="px-4 pt-5 pb-3 flex items-center gap-3">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm border-2 transition-all ${activeTab === 'new'
              ? 'bg-[#5D4037] border-[#5D4037] text-[#D7CCC8]'
              : 'bg-white border-[#D7CCC8] text-[#5D4037] hover:border-[#5D4037]/40'
            }`}
        >
          Nouveautés
        </button>
        <button
          onClick={() => {
            setActiveTab('nearby');
            setIsLocationOpen(true);
          }}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm border-2 transition-all flex items-center justify-center gap-2 ${activeTab === 'nearby'
              ? 'bg-[#5D4037] border-[#5D4037] text-[#D7CCC8]'
              : 'bg-white border-[#D7CCC8] text-[#5D4037] hover:border-[#5D4037]/40'
            }`}
        >
          <MapPin size={13} />
          A proximité
        </button>
      </div>

      {/* Grille produits */}
      <main className="px-4 pb-36">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, index) => {
            const showVideoAfter = index === 7;

            return (
              <div key={`${product.id}-${index}`} className="contents">
                <div
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <ListingCard product={product} />
                </div>

                {showVideoAfter && (
                  <div className="col-span-2 md:col-span-4 py-10 my-6 bg-[#5D4037] rounded-3xl -mx-0 px-6 shadow-xl border border-[#D7CCC8]/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                        🎥 Les Offres en Vidéo
                      </h3>
                      <Link href="/feed" className="text-[10px] font-black text-[#D7CCC8]/60 uppercase tracking-widest hover:text-white transition-colors">
                        Tout voir
                      </Link>
                    </div>

                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x">
                      {[
                        { id: '1', title: 'iPhone 13 Pro', price: '450.000', img: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400' },
                        { id: '2', title: 'Sac de Luxe', price: '125.000', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400' },
                        { id: '3', title: 'Nike Air Max', price: '85.000', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400' },
                        { id: '4', title: 'Montre Premium', price: '2.500.000', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=400' },
                        { id: '5', title: 'Macbook Pro M2', price: '1.200.000', img: 'https://images.unsplash.com/photo-1517336714460-d15024229188?q=80&w=400' }
                      ].map((v) => (
                        <Link
                          href={`/feed?id=${v.id}`}
                          key={v.id}
                          className="min-w-[140px] md:min-w-[200px] aspect-[9/16] bg-black/20 rounded-2xl overflow-hidden relative snap-start group cursor-pointer border border-white/10 flex-shrink-0"
                        >
                          <Image
                            src={v.img}
                            alt={v.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                            <p className="text-white text-[9px] font-black uppercase tracking-wider mb-1 opacity-80">{v.title}</p>
                            <p className="text-[#D7CCC8] text-sm font-black tracking-tight">{v.price} CDF</p>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <Play size={18} className="text-white fill-white ml-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <LocationFilter isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} onApply={setLocationFilter} />
      <BottomNav />
    </AppContainer>
  );
}
