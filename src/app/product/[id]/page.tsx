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
    ChevronRight,
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
            <Link href={`/shop/prestige`} className="block bg-[#FAF9F6] border border-chocolate/5 rounded-[2.5rem] p-8 shadow-sm hover:bg-beige/10 transition-all active:scale-[0.98]">
                <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-full bg-white border-[4px] border-beige overflow-hidden shadow-md shrink-0">
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-2xl font-black text-chocolate font-sans">
                            {seller.name.charAt(0)}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-black text-xl text-chocolate tracking-tight font-sans italic">{seller.name}</h3>

                        {/* Système d'avis étoilés */}
                        <div className="flex items-center gap-1.5 mt-1 mb-1">
                            <div className="flex text-yellow-500 scale-90 -ml-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-lg">★</span>
                                ))}
                            </div>
                            <span className="text-[11px] font-black text-chocolate/40 uppercase tracking-widest">(4.8 • 12 avis)</span>
                        </div>
                        <p className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em]">Membre depuis 2 ans</p>
                    </div>
                    <ChevronRight className="text-chocolate/20" size={20} />
                </div>
            </Link>
        );
    }

    function WhatsAppButton({ seller }: { seller: Product['seller'] }) {
        return (
            <a
                href={`https://wa.me/${seller.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-whatsapp hover:bg-[#1ebc57] text-white font-black py-5 px-6 rounded-3xl flex items-center justify-center gap-4 shadow-xl shadow-green-100/50 transition-all active:scale-95 group"
            >
                <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                    <WhatsAppIcon />
                </div>
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] opacity-80 uppercase tracking-widest font-black mb-1">Discuter sur</span>
                    <span className="text-lg uppercase">WhatsApp</span>
                </div>
            </a>
        );
    }

    function FeatureItem({ label, value }: { label: string, value: string }) {
        return (
            <div className="flex flex-col gap-1 items-start p-5 bg-beige/30 rounded-3xl border border-chocolate/5 group hover:bg-beige/50 transition-all">
                <span className="text-[9px] font-black text-chocolate/50 uppercase tracking-[0.3em]">{label}</span>
                <span className="text-[14px] font-black text-chocolate leading-tight">{value}</span>
            </div>
        );
    }

    return (
        <AppContainer className="bg-white">
            {/* Header Product Page */}
            <PageHeader
                variant="page"
                title="Détails de l'offre"
                rightContent={
                    <button className="text-beige p-2 hover:bg-beige/10 rounded-full transition-all">
                        <Share2 size={20} />
                    </button>
                }
            />

            <main className="pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2 space-y-12">
                        {/* 1. Galerie Média - Full Width on Mobile */}
                        <div className="space-y-4">
                            <div className="relative aspect-square w-full bg-[#FAF9F6] lg:rounded-[2.5rem] overflow-hidden border-b border-chocolate/5 shadow-inner">
                                <Image
                                    src={gallery[activeImage] || product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-all duration-700"
                                />
                                {activeImage === 2 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full border-2 border-white/30 flex items-center justify-center shadow-2xl">
                                            <Play className="w-10 h-10 text-white fill-white ml-1" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-2">
                                {gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-22 h-22 flex-shrink-0 rounded-[2rem] overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-chocolate shadow-xl scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <Image src={img} alt={`View ${idx}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="px-4 space-y-12">
                            {/* 2. Infos Capitales */}
                            <div className="space-y-6 border-b border-chocolate/5 pb-10">
                                <h1 className="text-3xl md:text-5xl font-black text-chocolate tracking-tighter leading-none font-sans italic">
                                    {product.title}
                                </h1>

                                <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl md:text-5xl font-black text-black tracking-tighter font-sans">
                                            {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-xl font-black text-chocolate/30 uppercase tracking-widest font-sans">
                                            {product.currency}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="w-16 h-16 flex items-center justify-center bg-white border border-chocolate/5 rounded-3xl text-chocolate hover:text-red-500 transition-all shadow-sm active:scale-90 overflow-hidden">
                                            <Heart className="w-6 h-6" />
                                        </button>
                                        <button className="w-16 h-16 flex items-center justify-center bg-white border border-chocolate/5 rounded-3xl text-chocolate transition-all shadow-sm active:scale-90">
                                            <Share2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] font-black text-chocolate/40 uppercase tracking-[.4em] font-sans pt-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Publié il y a 2 Heures</span>
                                </div>
                            </div>

                            {/* Mobile Seller Section */}
                            <div className="lg:hidden space-y-4">
                                <SellerCard seller={product.seller} />
                                <WhatsAppButton seller={product.seller} />
                            </div>

                            {/* 4. Caractéristiques */}
                            <div className="space-y-8">
                                <h3 className="font-black text-xs text-chocolate/30 uppercase tracking-[0.5em] flex items-center gap-4">
                                    <span className="w-10 h-px bg-chocolate/10"></span>
                                    Caractéristiques
                                </h3>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <div className="space-y-8">
                                <h3 className="font-black text-xs text-chocolate/30 uppercase tracking-[0.5em] flex items-center gap-4">
                                    <span className="w-10 h-px bg-chocolate/10"></span>
                                    Description
                                </h3>
                                <div className={`relative ${!showFullDesc && 'max-h-60 overflow-hidden'}`}>
                                    <p className="text-chocolate/70 text-[16px] font-medium leading-[2] whitespace-pre-line font-sans">
                                        {product.title} en parfait état. Idéal pour ceux qui recherchent la qualité au meilleur prix.

                                        Détails supplémentaires :
                                        - Testé et approuvé par nos experts
                                        - Garantie constructeur incluse
                                        - Livraison rapide possible dans tout le pays
                                    </p>
                                    {!showFullDesc && (
                                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowFullDesc(!showFullDesc)}
                                    className="text-chocolate/40 font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-chocolate/5 pb-2 hover:border-chocolate/20 transition-all"
                                >
                                    {showFullDesc ? 'Masquer' : 'Lire la suite'}
                                </button>
                            </div>

                            {/* Localisation */}
                            <div className="space-y-8">
                                <h3 className="font-black text-xs text-chocolate/30 uppercase tracking-[0.5em] flex items-center gap-4">
                                    <span className="w-10 h-px bg-chocolate/10"></span>
                                    Localisation
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#FAF9F6] p-8 rounded-[2.5rem] border border-chocolate/5 space-y-6 shadow-inner">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-chocolate/30 uppercase tracking-widest">Pays</p>
                                            <p className="text-lg font-black text-chocolate italic tracking-tight">RD Congo</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-chocolate/30 uppercase tracking-widest">Ville / Province</p>
                                            <p className="text-lg font-black text-chocolate italic tracking-tight">{product.location}</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#FAF9F6] p-8 rounded-[2.5rem] border border-chocolate/5 flex flex-col justify-center shadow-inner">
                                        <p className="text-[10px] font-black text-chocolate/30 uppercase tracking-widest mb-4">Adresse détaillée</p>
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-chocolate/5 rounded-2xl">
                                                <MapPin className="text-chocolate" size={20} />
                                            </div>
                                            <p className="text-sm font-bold text-chocolate/80 leading-relaxed font-sans">
                                                Commune de la Gombe, Avenue de la Justice, Quartier Royal.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block lg:col-span-1 px-4">
                        <div className="sticky top-28 space-y-8">
                            <div className="space-y-4">
                                <SellerCard seller={product.seller} />
                                <WhatsAppButton seller={product.seller} />
                            </div>

                            <div className="bg-chocolate/5 rounded-[2.5rem] p-10 border border-chocolate/5 space-y-6">
                                <h4 className="font-black text-[10px] flex items-center gap-3 text-chocolate/40 uppercase tracking-[0.3em]">
                                    <ShieldCheck className="w-6 h-6 text-chocolate/30" />
                                    Conseils Sécurité
                                </h4>
                                <ul className="space-y-6">
                                    <li className="flex gap-4 text-xs font-bold text-chocolate/70 leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-chocolate/20 mt-1.5 shrink-0" />
                                        Ne payez jamais avant d'avoir examiné le produit.
                                    </li>
                                    <li className="flex gap-4 text-xs font-bold text-chocolate/70 leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-chocolate/20 mt-1.5 shrink-0" />
                                        Privilégiez les lieux publics pour vos rencontres.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommandations */}
                <div className="mt-24 border-t border-gray-100 pt-16 pb-20 px-4">
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
