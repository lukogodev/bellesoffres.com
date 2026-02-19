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
    ChevronRight,
    Play,
    Star,
    CheckCircle2,
    Clock,
    Tag,
    Zap,
    ChevronLeft,
    Eye
} from 'lucide-react';
import ListingCard from "@/components/ListingCard";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import data from "@/mock/data.json";
import { Product } from "@/types";

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118 1.571-.026 1.758-.337 2.006-1.031s.248-1.288.173-1.412c-.074-.124-.272-.198-.57-.347z" />
    </svg>
);

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [gallery, setGallery] = useState<string[]>([]);

    useEffect(() => {
        if (params.id) {
            const found = (data.products as Product[]).find((p) => p.id === params.id);
            if (found) {
                setProduct(found);
                setIsFavorite(found.isFavorite || false);
                setGallery([
                    found.image,
                    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800"
                ]);
            }
        }
    }, [params]);

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
            <div className="text-[#5D4037] font-semibold">Chargement...</div>
        </div>
    );

    const similarProducts = (data.products as Product[])
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 6);

    const handleFavorite = () => setIsFavorite(prev => !prev);

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: product.title, url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <AppContainer className="bg-[#FAF9F6]">
            {/* Header */}
            <PageHeader
                variant="page"
                title="Détails de l'annonce"
                rightContent={
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleFavorite}
                            className={`p-2 rounded-full transition-all active:scale-90 ${isFavorite ? 'text-red-500' : 'text-[#D7CCC8]'}`}
                            aria-label="Favori"
                        >
                            <Heart size={20} className={isFavorite ? 'fill-red-500' : ''} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2 text-[#D7CCC8] hover:text-white rounded-full transition-all"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                }
            />

            <main className="pb-36">
                {/* ─── GALERIE ─── */}
                <div className="bg-white border-b border-[#D7CCC8]/20">
                    {/* Image principale */}
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[500px] bg-[#F5F0EB] overflow-hidden">
                        <Image
                            src={gallery[activeImage] || product.image}
                            alt={product.title}
                            fill
                            className="object-contain transition-all duration-500"
                            priority
                        />

                        {/* Navigation arrows */}
                        {gallery.length > 1 && (
                            <>
                                <button
                                    onClick={() => setActiveImage(prev => Math.max(0, prev - 1))}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-[#D7CCC8]/30 hover:bg-white transition-all disabled:opacity-30"
                                    disabled={activeImage === 0}
                                >
                                    <ChevronLeft size={18} className="text-[#5D4037]" />
                                </button>
                                <button
                                    onClick={() => setActiveImage(prev => Math.min(gallery.length - 1, prev + 1))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-[#D7CCC8]/30 hover:bg-white transition-all disabled:opacity-30"
                                    disabled={activeImage === gallery.length - 1}
                                >
                                    <ChevronRight size={18} className="text-[#5D4037]" />
                                </button>
                            </>
                        )}

                        {/* Play overlay on video thumb */}
                        {activeImage === 2 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </div>
                            </div>
                        )}

                        {/* Counter */}
                        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            {activeImage + 1} / {gallery.length}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar bg-white">
                        {gallery.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx
                                        ? 'border-[#5D4037] shadow-md'
                                        : 'border-[#D7CCC8]/40 opacity-60 hover:opacity-90'
                                    }`}
                            >
                                <Image src={img} alt={`Vue ${idx + 1}`} fill className="object-cover" />
                            </button>
                        ))}
                        <button className="w-16 h-16 flex-shrink-0 rounded-xl border-2 border-dashed border-[#D7CCC8] flex flex-col items-center justify-center gap-1 text-[#5D4037]/40 hover:text-[#5D4037] transition-all">
                            <Eye size={14} />
                            <span className="text-[8px] font-bold uppercase">Tout</span>
                        </button>
                    </div>
                </div>

                {/* ─── CONTENU EN 2 COLONNES (desktop) ─── */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 lg:px-8 lg:pt-8">

                    {/* ── COLONNE GAUCHE ── */}
                    <div className="lg:col-span-2 space-y-0">

                        {/* TITRE & PRIX */}
                        <div className="bg-white px-4 py-6 border-b border-[#D7CCC8]/20">
                            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-2xl md:text-3xl font-bold text-[#3E2723] leading-tight mb-3">
                                {product.title}
                            </h1>

                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl md:text-4xl font-black text-[#5D4037]">
                                            {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-base font-bold text-[#5D4037]/50 uppercase tracking-widest">
                                            {product.currency}
                                        </span>
                                    </div>
                                </div>

                                {/* Boutons Favoris + Partage */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleFavorite}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${isFavorite
                                                ? 'bg-red-50 border-red-400 text-red-500'
                                                : 'bg-white border-[#D7CCC8] text-[#5D4037] hover:border-[#5D4037]'
                                            }`}
                                    >
                                        <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                                        <span>{isFavorite ? 'Enregistré' : 'Enregistrer'}</span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#D7CCC8] text-[#5D4037] font-bold text-sm hover:border-[#5D4037] transition-all active:scale-95 bg-white"
                                    >
                                        <Share2 size={16} />
                                        <span className="hidden sm:inline">Partager</span>
                                    </button>
                                </div>
                            </div>

                            {/* Méta-infos : date + localisation */}
                            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-[#D7CCC8]/20">
                                <div className="flex items-center gap-1.5 text-xs text-[#5D4037]/60 font-medium">
                                    <Clock size={13} />
                                    <span>Publié il y a 2 heures</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[#5D4037]/60 font-medium">
                                    <MapPin size={13} />
                                    <span>{product.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[#5D4037]/60 font-medium">
                                    <Eye size={13} />
                                    <span>142 vues</span>
                                </div>
                            </div>
                        </div>

                        {/* INFORMATIONS CLÉS */}
                        <div className="bg-white px-4 py-5 border-b border-[#D7CCC8]/20">
                            <h2 className="text-xs font-black text-[#5D4037]/40 uppercase tracking-[0.3em] mb-4">Informations clés</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'État', value: 'Très bon état', icon: <CheckCircle2 size={14} className="text-green-500" /> },
                                    { label: 'Disponibilité', value: 'En stock', icon: <Tag size={14} className="text-[#5D4037]" /> },
                                    { label: 'Catégorie', value: product.category || 'Général', icon: <Zap size={14} className="text-[#5D4037]" /> },
                                ].map((item, i) => (
                                    <div key={i} className="bg-[#FAF9F6] rounded-xl p-3 border border-[#D7CCC8]/30 flex flex-col gap-2">
                                        <div className="flex items-center gap-1.5">
                                            {item.icon}
                                            <span className="text-[9px] font-black text-[#5D4037]/50 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <span className="text-[11px] font-bold text-[#3E2723]">{item.value}</span>
                                    </div>
                                ))}
                                {product.specs?.map((spec, i) => (
                                    <div key={`spec-${i}`} className="bg-[#FAF9F6] rounded-xl p-3 border border-[#D7CCC8]/30 flex flex-col gap-2">
                                        <span className="text-[9px] font-black text-[#5D4037]/50 uppercase tracking-widest">{spec.label}</span>
                                        <span className="text-[11px] font-bold text-[#3E2723]">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="bg-white px-4 py-5 border-b border-[#D7CCC8]/20">
                            <h2 className="text-xs font-black text-[#5D4037]/40 uppercase tracking-[0.3em] mb-4">Description</h2>
                            <div className={`relative ${!showFullDesc ? 'max-h-32 overflow-hidden' : ''}`}>
                                <p className="text-sm text-[#3E2723]/80 leading-relaxed font-medium whitespace-pre-line">
                                    {product.title} en parfait état. Idéal pour ceux qui recherchent la qualité au meilleur prix à {product.location}.{'\n\n'}
                                    Détails supplémentaires :{'\n'}
                                    - Testé et approuvé par nos experts{'\n'}
                                    - Garantie incluse{'\n'}
                                    - Livraison rapide possible dans tout le pays{'\n'}
                                    - Possibilité de négociation raisonnable{'\n\n'}
                                    N&apos;hésitez pas à me contacter via WhatsApp pour plus d&apos;informations ou pour organiser une rencontre.
                                </p>
                                {!showFullDesc && (
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                )}
                            </div>
                            <button
                                onClick={() => setShowFullDesc(!showFullDesc)}
                                className="mt-3 text-[#5D4037] font-bold text-sm underline underline-offset-4 hover:text-[#3E2723] transition-colors"
                            >
                                {showFullDesc ? 'Voir moins' : 'Voir plus'}
                            </button>
                        </div>

                        {/* LOCALISATION */}
                        <div className="bg-white px-4 py-5 border-b border-[#D7CCC8]/20">
                            <h2 className="text-xs font-black text-[#5D4037]/40 uppercase tracking-[0.3em] mb-4">Localisation</h2>
                            <div className="flex items-start gap-3 p-4 bg-[#FAF9F6] rounded-xl border border-[#D7CCC8]/30">
                                <div className="w-9 h-9 rounded-xl bg-[#5D4037]/10 flex items-center justify-center shrink-0">
                                    <MapPin size={18} className="text-[#5D4037]" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#3E2723] text-sm">{product.location}</p>
                                    <p className="text-xs text-[#5D4037]/50 mt-0.5">République Démocratique du Congo</p>
                                    <p className="text-xs text-[#5D4037]/40 mt-1">Commune de la Gombe, Quartier Royal</p>
                                </div>
                            </div>
                        </div>

                        {/* VENDEUR (mobile uniquement) */}
                        <div className="lg:hidden bg-white px-4 py-5 border-b border-[#D7CCC8]/20">
                            <h2 className="text-xs font-black text-[#5D4037]/40 uppercase tracking-[0.3em] mb-4">Le vendeur</h2>
                            <Link href="/shop/prestige" className="flex items-center gap-4 p-4 bg-[#FAF9F6] rounded-xl border border-[#D7CCC8]/30 hover:border-[#5D4037]/30 transition-all">
                                <div className="w-14 h-14 rounded-full bg-[#5D4037] flex items-center justify-center text-[#D7CCC8] text-xl font-black shrink-0">
                                    {product.seller.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[#3E2723] text-base">{product.seller.name}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />)}
                                        <span className="text-xs text-[#5D4037]/50 ml-1">(4.8)</span>
                                    </div>
                                    <p className="text-xs text-green-600 font-semibold mt-0.5 flex items-center gap-1">
                                        <CheckCircle2 size={11} />
                                        Très réactif
                                    </p>
                                </div>
                                <ChevronRight size={18} className="text-[#D7CCC8] shrink-0" />
                            </Link>

                            {/* CTA WhatsApp mobile */}
                            <a
                                href={`https://wa.me/${product.seller.whatsapp?.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 w-full bg-[#25D366] hover:bg-[#1ebc57] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
                            >
                                <WhatsAppIcon size={22} />
                                <span className="text-base">Contacter sur WhatsApp</span>
                            </a>
                        </div>

                        {/* SÉCURITÉ */}
                        <div className="bg-[#FFF8E1] px-4 py-5 border-b border-[#D7CCC8]/20">
                            <div className="flex gap-3">
                                <ShieldCheck size={20} className="text-[#5D4037] shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-[#3E2723] mb-2">Avec la Transaction sécurisée, achetez en toute confiance !</p>
                                    <ul className="space-y-1.5">
                                        {[
                                            'Ne payez jamais avant d\'avoir examiné le produit',
                                            'Privilégiez les lieux publics pour vos rencontres',
                                            'Vérifiez l\'identité du vendeur avant tout paiement',
                                        ].map((tip, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-[#5D4037]/70">
                                                <CheckCircle2 size={11} className="text-green-500 mt-0.5 shrink-0" />
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── COLONNE DROITE (desktop) ─── */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            {/* Prix desktop */}
                            <div className="bg-white rounded-2xl border border-[#D7CCC8]/40 p-5 shadow-sm">
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-3xl font-black text-[#5D4037]">
                                        {product.price.toLocaleString()}
                                    </span>
                                    <span className="text-sm font-bold text-[#5D4037]/40 uppercase">{product.currency}</span>
                                </div>

                                {/* Bouton Acheter / Contacter */}
                                <a
                                    href={`https://wa.me/${product.seller.whatsapp?.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] hover:bg-[#1ebc57] text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 mb-2"
                                >
                                    <WhatsAppIcon size={18} />
                                    Contacter sur WhatsApp
                                </a>

                                {/* Bouton Faire une offre */}
                                <button className="w-full border-2 border-[#5D4037] text-[#5D4037] font-bold py-3.5 px-5 rounded-xl hover:bg-[#5D4037]/5 transition-all active:scale-95 mb-3">
                                    Faire une offre
                                </button>

                                {/* Favoris desktop */}
                                <button
                                    onClick={handleFavorite}
                                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${isFavorite
                                            ? 'bg-red-50 border-red-300 text-red-500'
                                            : 'bg-white border-[#D7CCC8] text-[#5D4037] hover:border-[#5D4037]'
                                        }`}
                                >
                                    <Heart size={15} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                                    {isFavorite ? 'Annonce enregistrée' : 'Enregistrer l\'annonce'}
                                </button>
                            </div>

                            {/* Vendeur desktop */}
                            <div className="bg-white rounded-2xl border border-[#D7CCC8]/40 p-5 shadow-sm">
                                <p className="text-[10px] font-black text-[#5D4037]/40 uppercase tracking-[0.3em] mb-4">Le vendeur</p>
                                <Link href="/shop/prestige" className="flex items-center gap-3 group">
                                    <div className="w-12 h-12 rounded-full bg-[#5D4037] flex items-center justify-center text-[#D7CCC8] text-lg font-black shrink-0">
                                        {product.seller.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[#3E2723] text-sm group-hover:text-[#5D4037] transition-colors">{product.seller.name}</p>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={9} className="fill-yellow-400 text-yellow-400" />)}
                                            <span className="text-[10px] text-[#5D4037]/50 ml-1">4.8 · 12 avis</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-[#D7CCC8]" />
                                </Link>
                                <div className="mt-3 pt-3 border-t border-[#D7CCC8]/20 flex items-center gap-2 text-xs text-green-600 font-semibold">
                                    <CheckCircle2 size={12} />
                                    Très réactif · Dernière activité il y a 2h
                                </div>
                                <p className="mt-2 text-[10px] text-[#5D4037]/40 font-medium">Membre depuis 2 ans · 6 annonces actives</p>
                            </div>

                            {/* Sécurité desktop */}
                            <div className="bg-[#FFF8E1] rounded-2xl border border-[#FFE082]/50 p-4">
                                <div className="flex gap-2 mb-2">
                                    <ShieldCheck size={16} className="text-[#5D4037] shrink-0" />
                                    <p className="text-xs font-bold text-[#3E2723]">Conseils sécurité</p>
                                </div>
                                <ul className="space-y-1.5">
                                    {['Ne payez pas à l\'avance', 'Rencontrez-vous en lieu public', 'Vérifiez le produit avant paiement'].map((t, i) => (
                                        <li key={i} className="text-[10px] text-[#5D4037]/70 flex items-start gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-[#5D4037]/30 mt-1.5 shrink-0" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── OFFRES SIMILAIRES ─── */}
                {similarProducts.length > 0 && (
                    <div className="mt-8 border-t border-[#D7CCC8]/20 bg-white">
                        <div className="max-w-6xl mx-auto px-4 py-8">
                            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[#3E2723] mb-6 flex items-center gap-3">
                                <Zap className="w-6 h-6 fill-[#5D4037] text-[#5D4037]" />
                                Annonces similaires
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {similarProducts.map((p) => (
                                    <ListingCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <BottomNav />
        </AppContainer>
    );
}
