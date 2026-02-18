'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import AppContainer from "@/components/AppContainer";
import { Video as VideoIcon, Upload, X, Save, AlertCircle } from "lucide-react";
import Link from 'next/link';

export default function UpdateVideoPage() {
    const params = useParams();
    const router = useRouter();

    const [videoName, setVideoName] = useState('');
    const [video, setVideo] = useState<string | null>(null);

    useEffect(() => {
        if (params.id) {
            // Mocking dynamic data
            setVideoName("Promotion iPhone 13 Pro Max");
            setVideo("demo-video.mp4");
        }
    }, [params]);

    const handleSave = () => {
        console.log('Mise à jour de la vidéo...');
        alert('Vidéo mise à jour avec succès !');
        router.push(`/profile`);
    };

    return (
        <AppContainer>
            <PageHeader
                variant="page"
                title="MODIFIER LA VIDÉO"
            />

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-chocolate/5 p-6 md:p-12">
                    <div className="space-y-10">

                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 flex gap-4">
                            <AlertCircle className="w-8 h-8 text-blue-500 shrink-0" />
                            <p className="text-sm font-bold text-blue-700 leading-relaxed">
                                Les vidéos marketing sont un excellent moyen d'augmenter vos ventes de 80%.
                                Assurez-vous que votre vidéo est de format vertical (9:16) pour un affichage optimal dans le feed.
                            </p>
                        </div>

                        {/* NOM DE LA VIDÉO */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                Nom ou Titre de la Vidéo *
                            </label>
                            <input
                                type="text"
                                value={videoName}
                                onChange={(e) => setVideoName(e.target.value)}
                                placeholder="Donnez un titre accrocheur"
                                className="w-full p-5 bg-beige/20 rounded-2xl border-2 border-chocolate/10 focus:border-chocolate transition-all font-bold text-black outline-none"
                            />
                        </div>

                        {/* IMPORT VIDÉO */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-chocolate uppercase tracking-widest">
                                Remplacer la Vidéo
                            </label>

                            <div className="p-8 bg-beige/10 rounded-[2rem] border-2 border-dashed border-chocolate/20 text-center">
                                {video ? (
                                    <div className="space-y-6">
                                        <div className="w-24 h-24 bg-chocolate text-beige rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                                            <VideoIcon size={40} />
                                        </div>
                                        <div>
                                            <p className="font-black text-chocolate">{video}</p>
                                            <p className="text-xs text-chocolate/50 font-bold mt-1">Format 9:16 Détecté</p>
                                        </div>
                                        <button
                                            onClick={() => setVideo(null)}
                                            className="text-red-500 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                                        >
                                            <X size={16} /> Supprimer et Remplacer
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setVideo("nouvelle-video.mp4")}
                                        className="flex flex-col items-center gap-4 group"
                                    >
                                        <div className="bg-white p-6 rounded-3xl shadow-md group-hover:scale-110 transition-transform">
                                            <Upload size={48} className="text-chocolate" />
                                        </div>
                                        <span className="font-black text-chocolate uppercase tracking-widest text-sm">Cliquer pour importer</span>
                                        <span className="text-[10px] text-gray-400 font-bold">MP4, MOV (MAX 100MB)</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* BOUTON ENREGISTRER */}
                        <div className="pt-6">
                            <button
                                onClick={handleSave}
                                className="w-full py-6 bg-chocolate hover:bg-black text-beige rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-4"
                            >
                                <Save size={24} />
                                METTRE À JOUR LA VIDÉO
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </AppContainer>
    );
}
