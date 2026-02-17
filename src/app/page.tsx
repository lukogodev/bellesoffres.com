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
  Zap
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sorted = [...(data.products as Product[])].sort((a, b) =>
      parseInt(b.id) - parseInt(a.id)
    );
    setProducts(sorted);
  }, []);

  return (
    <AppContainer>
      {/* Header de l'accueil */}
      <PageHeader variant="home" />

      {/* Barre de Recherche Premium */}
      <div className="bg-chocolate pb-10 shadow-lg rounded-b-[3rem] -mt-1 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-4 text-chocolate/30 w-5 h-5 group-focus-within:text-chocolate transition-colors" />
              <input
                type="text"
                placeholder="Rechercher un Produit"
                className="w-full pl-12 pr-14 py-4 bg-white rounded-2xl text-[14px] font-bold text-chocolate placeholder:text-chocolate/20 focus:outline-none focus:ring-4 focus:ring-beige/30 transition-all shadow-inner"
              />
              <button className="absolute right-2 top-2 p-2.5 bg-chocolate text-beige rounded-xl hover:bg-black transition-all active:scale-90">
                <Send className="w-5 h-5 transform rotate-45" />
              </button>
            </div>

            <button className="bg-beige/10 p-4 rounded-2xl border border-beige/20 backdrop-blur-md text-beige hover:bg-beige/20 active:scale-90 transition-all">
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Section Catégories */}
      <div className="max-w-[1280px] mx-auto mt-6 px-2">
        <CategoryBar />
      </div>

      {/* Grille de Produits */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-[900] text-chocolate uppercase tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 fill-chocolate" />
            Nouveautés
          </h2>
          <div className="bg-beige text-chocolate px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm">
            {products.length} ARTICLES
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ListingCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating 'Nearby' Button */}
      <div className="fixed bottom-28 inset-x-0 z-40 pointer-events-none">
        <div className="max-w-[1280px] mx-auto px-4 flex justify-end">
          <button
            onClick={() => setIsLocationOpen(true)}
            className="pointer-events-auto flex items-center gap-2 bg-chocolate text-beige font-black px-6 py-4 rounded-full shadow-2xl border-2 border-beige/10 transform hover:-translate-y-1 transition-all active:scale-95 group"
          >
            <MapPin className="w-5 h-5 animate-bounce group-hover:animate-none" />
            <span className="text-sm uppercase tracking-widest">À proximité</span>
          </button>
        </div>
      </div>

      <LocationFilter isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} onApply={setLocationFilter} />

      <BottomNav />
    </AppContainer>
  );
}
