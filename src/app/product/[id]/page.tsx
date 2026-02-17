'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    Heart,
    Share2,
    MapPin,
    Calendar,
    ShieldCheck,
    ChevronDown,
    ChevronUp,
    Play,
    Info,
    ChevronLeft,
    Zap
} from 'lucide-react';
import ListingCard from "@/components/ListingCard";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import data from "@/mock/data.json";
import { Product } from "@/types";

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [gallery, setGallery] = useState<string[]>([]);

    useEffect(() => {
        if (params.id) {
            const found = (data.products as Product[]).find((p) => p.id === params.id);
            if (found) {
                setProduct(found);
                setGallery([
                    found.image,
                    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600",
                    "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&q=80&w=600",
                    "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=600"
                ]);
            }
        }
    }, [params]);

    if (!product) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

    const similarProducts = (data.products as Product[])
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 5);

    const WhatsAppIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
        </svg>
    );

    function SellerCard({ seller }: { seller: Product['seller'] }) {
        return (
            <div className="bg-white border-[0.5px] border-chocolate/20 rounded-[2.5rem] p-8 shadow-xl">
                <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-full bg-white border-[4px] border-beige overflow-hidden shadow-md shrink-0">
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-2xl font-black text-chocolate">
                            {seller.name.charAt(0)}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-black text-xl text-black tracking-tight">{seller.name}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Vendeur Vérifié</p>

                        <a
                            href={`https://wa.me/${seller.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-whatsapp hover:bg-[#1ebc57] text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-200 transition-all active:scale-95 mb-4"
                        >
                            <WhatsAppIcon />
                            <span className="text-sm uppercase tracking-wider">Discuter sur WhatsApp</span>
                        </a>

                        <div className="flex items-center gap-1 text-yellow-500 text-xs font-black">
                            ★★★★★
                            <span className="text-gray-400 font-bold ml-1 text-[10px]">(12 avis)</span>
                        </div>
                    </div>
                </div>
                <p className="text-[10px] text-center text-gray-400 mt-4 px-4 border-t border-gray-50 pt-4 font-bold">
                    Répond généralement en moins de 15 minutes.
                </p>
            </div>
        );
    }

    function FeatureItem({ label, value }: { label: string, value: string }) {
        return (
            <div className="flex flex-col gap-1 items-start p-4 bg-beige rounded-2xl border border-chocolate/20 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <span className="text-[9px] font-[900] text-chocolate uppercase tracking-widest">{label}</span>
                <span className="text-[13px] font-black text-black leading-tight">{value}</span>
            </div>
        );
    }

    return (
        <AppContainer>
            {/* Header Product Page */}
            <PageHeader
                variant="page"
                title="Détails"
                rightContent={
                    <button className="text-beige p-1 transition-transform active:scale-75">
                        <Share2 size={24} />
                    </button>
                }
            />

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2 space-y-10">
                        {/* 1. Galerie Média */}
                        <div className="space-y-4">
                            <div className="relative aspect-video w-full bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-inner">
                                <Image
                                    src={gallery[activeImage] || product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-4 transition-all duration-700"
                                />
                                {activeImage === 2 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                        <div className="w-20 h-20 bg-white/40 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl">
                                            <Play className="w-10 h-10 text-white fill-current ml-1" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-2">
                                {gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-[3px] transition-all shadow-md transform hover:scale-105 ${activeImage === idx ? 'border-chocolate ring-4 ring-chocolate/10' : 'border-white hover:border-chocolate/40'
                                            }`}
                                    >
                                        <Image src={img} alt={`View ${idx}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Bloc d'Informations Capitales */}
                        <div className="space-y-1 border-b border-gray-100 pb-8">
                            <h1 className="text-3xl md:text-4xl font-[900] text-black tracking-tighter leading-none mb-4">
                                {product.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-[900] text-chocolate tracking-tighter">
                                        {product.price.toLocaleString()}
                                    </span>
                                    <span className="text-xl font-black text-chocolate/40">
                                        {product.currency}
                                    </span>
                                </div>

                                <div className="flex bg-beige/20 rounded-[2rem] p-1.5 border border-chocolate/5 shadow-sm">
                                    <button className="p-4 hover:bg-white rounded-full transition-all text-gray-500 hover:text-red-500 active:scale-75">
                                        <Heart className="w-7 h-7" />
                                    </button>
                                    <div className="w-px bg-chocolate/10 my-3 mx-1"></div>
                                    <button className="p-4 hover:bg-white rounded-full transition-all text-gray-500">
                                        <Share2 className="w-7 h-7" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-400 font-black uppercase tracking-widest pt-4">
                                <Calendar className="w-4 h-4" />
                                <span>Publié il y a 2 Heures</span>
                            </div>
                        </div>

                        {/* Mobile Seller Card */}
                        <div className="lg:hidden">
                            <SellerCard seller={product.seller} />
                        </div>

                        {/* 4. Caractéristiques */}
                        <div className="space-y-6">
                            <h3 className="font-[900] text-xl text-chocolate uppercase tracking-tight flex items-center gap-3">
                                <Info className="w-6 h-6" />
                                Caractéristiques
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.specs?.map((spec, i) => (
                                    <FeatureItem key={i} label={spec.label} value={spec.value} />
                                ))}
                                {!product.specs && (
                                    <>
                                        <FeatureItem label="État" value="Très bon" />
                                        <FeatureItem label="Authenticité" value="Original" />
                                        <FeatureItem label="Disponibilité" value="En Stock" />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="font-[900] text-xl text-chocolate uppercase tracking-tight">Description</h3>
                            <div className={`relative ${!showFullDesc && 'max-h-40 overflow-hidden'}`}>
                                <p className="text-gray-600 text-[15px] font-medium leading-relaxed whitespace-pre-line">
                                    Incroyable opportunité ! {product.title} en parfait état. Idéal pour ceux qui recherchent la qualité au meilleur prix.

                                    Détails supplémentaires :
                                    - Testé et approuvé par nos experts
                                    - Garantie constructeur incluse
                                    - Livraison rapide possible dans tout le pays
                                </p>
                                {!showFullDesc && (
                                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                                )}
                            </div>
                            <button
                                onClick={() => setShowFullDesc(!showFullDesc)}
                                className="flex items-center gap-2 text-chocolate font-[900] text-sm uppercase tracking-widest hover:underline decoration-2"
                            >
                                {showFullDesc ? 'Masquer' : 'Lire la suite'}
                                {showFullDesc ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Localisation */}
                        <div className="space-y-6">
                            <h3 className="font-[900] text-xl text-chocolate uppercase tracking-tight">Localisation</h3>
                            <div className="relative h-64 w-full bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-inner group">
                                <Image
                                    src="https://placehold.co/1000x500/F5F5DC/2B1700.png?text=🗺️+Plan+Direct"
                                    alt="Map"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/5">
                                    <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 mb-6 transform hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6 text-chocolate" />
                                        <span className="font-black text-black uppercase tracking-tight">{product.location}</span>
                                    </div>
                                    <button className="bg-chocolate text-beige text-xs font-[900] px-8 py-4 rounded-full shadow-2xl tracking-[0.2em] uppercase active:scale-95 transition-all">
                                        Itinéraire Google Maps
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <SellerCard seller={product.seller} />

                            <div className="bg-chocolate/5 rounded-[2rem] p-8 border border-chocolate/5">
                                <h4 className="font-[900] text-sm flex items-center gap-2 mb-6 text-chocolate uppercase tracking-wider">
                                    <ShieldCheck className="w-6 h-6 text-chocolate" />
                                    Sécurité BO
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-xs font-bold text-chocolate/70 leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-chocolate mt-1.5 shrink-0" />
                                        Ne payez jamais avant d'avoir examiné le produit.
                                    </li>
                                    <li className="flex gap-3 text-xs font-bold text-chocolate/70 leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-chocolate mt-1.5 shrink-0" />
                                        Privilégiez les lieux publics pour vos rencontres.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommandations */}
                <div className="mt-24 border-t border-gray-100 pt-16 pb-20">
                    <h2 className="text-3xl font-[900] text-black tracking-tighter uppercase mb-10 flex items-center gap-4">
                        <Zap className="w-10 h-10 fill-chocolate text-chocolate" />
                        Offres similaires
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {similarProducts.map((p) => (
                            <ListingCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
