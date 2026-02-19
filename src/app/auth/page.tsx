'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, Camera, CheckCircle, ChevronDown, User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AppContainer from '@/components/AppContainer';

// ─── Données géographiques ───────────────────────────────────────
const AFRICAN_COUNTRIES: { name: string; cities: string[] }[] = [
    { name: 'RD Congo', cities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kananga', 'Kisangani', 'Bukavu', 'Butembo', 'Goma', 'Tshikapa', 'Kolwezi', 'Likasi', 'Matadi', 'Uvira', 'Beni', 'Bunia', 'Mbandaka', 'Bandundu', 'Kabinda', 'Kamina', 'Kalemie'] },
    { name: 'Côte d\'Ivoire', cities: ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'Korhogo'] },
    { name: 'Cameroun', cities: ['Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua'] },
    { name: 'Sénégal', cities: ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor'] },
    { name: 'Mali', cities: ['Bamako', 'Sikasso', 'Mopti', 'Gao', 'Tombouctou'] },
    { name: 'Guinée', cities: ['Conakry', 'Kankan', 'Labé', 'N\'Zérékoré', 'Kindia'] },
    { name: 'Burkina Faso', cities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Banfora', 'Ouahigouya'] },
    { name: 'Niger', cities: ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Dosso'] },
    { name: 'Tchad', cities: ['N\'Djamena', 'Moundou', 'Sarh', 'Abéché', 'Kélo'] },
    { name: 'Congo-Brazzaville', cities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Impfondo'] },
    { name: 'Gabon', cities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'] },
    { name: 'Togo', cities: ['Lomé', 'Sokodé', 'Kara', 'Palimé', 'Atakpamé'] },
    { name: 'Bénin', cities: ['Porto-Novo', 'Cotonou', 'Parakou', 'Abomey', 'Bohicon'] },
    { name: 'Madagascar', cities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Fianarantsoa'] },
    { name: 'Rwanda', cities: ['Kigali', 'Gisenyi', 'Butare', 'Gitarama', 'Ruhengeri'] },
    { name: 'Burundi', cities: ['Bujumbura', 'Gitega', 'Muyinga', 'Ruyigi', 'Ngozi'] },
];

// ─── Confettis ───────────────────────────────────────────────────
function Confetti({ active }: { active: boolean }) {
    const colors = ['#5D4037', '#D7CCC8', '#25D366', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
    const confettiCount = 80;

    if (!active) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
            {Array.from({ length: confettiCount }).map((_, i) => {
                const color = colors[i % colors.length];
                const left = Math.random() * 100;
                const delay = Math.random() * 2;
                const duration = 2.5 + Math.random() * 2;
                const size = 6 + Math.random() * 10;
                const rotation = Math.random() * 360;
                return (
                    <div
                        key={i}
                        className="absolute top-0 rounded-sm"
                        style={{
                            left: `${left}%`,
                            width: `${size}px`,
                            height: `${size * 0.6}px`,
                            backgroundColor: color,
                            transform: `rotate(${rotation}deg)`,
                            animation: `confetti-fall ${duration}s ${delay}s ease-in forwards`,
                        }}
                    />
                );
            })}
            <style>{`
                @keyframes confetti-fall {
                    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
            `}</style>
        </div>
    );
}

// ─── Composant principal ──────────────────────────────────────────
export default function AuthPage() {
    const router = useRouter();
    const { login, register, isAuthenticated } = useAuth();
    const [mode, setMode] = useState<'login' | 'register'>('login');

    // --- Login state ---
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPwd, setShowLoginPwd] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // --- Register state ---
    const [firstName, setFirstName] = useState('');
    const [shopName, setShopName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [avatar, setAvatar] = useState<string>('');
    const [whatsapp, setWhatsapp] = useState('');
    const [country, setCountry] = useState('RD Congo');
    const [city, setCity] = useState('Kinshasa');
    const [bio, setBio] = useState('');
    const [regError, setRegError] = useState('');
    const [regLoading, setRegLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const cities = AFRICAN_COUNTRIES.find(c => c.name === country)?.cities || [];

    useEffect(() => {
        if (isAuthenticated) router.push('/');
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setLoginLoading(true);
        const ok = await login(loginEmail, loginPassword);
        if (!ok) setLoginError('Email ou mot de passe incorrect');
        setLoginLoading(false);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegError('');

        if (!firstName || !shopName || !email || !password || !whatsapp || !bio) {
            setRegError('Veuillez remplir tous les champs obligatoires'); return;
        }
        if (password.length < 8) {
            setRegError('Le mot de passe doit faire au moins 8 caractères'); return;
        }
        if (password !== confirmPwd) {
            setRegError('Les mots de passe ne correspondent pas'); return;
        }
        if (bio.length < 150 || bio.length > 250) {
            setRegError('La bio doit faire entre 150 et 250 caractères'); return;
        }
        if (shopName.length > 11) {
            setRegError('Le nom de boutique ne peut pas dépasser 11 caractères'); return;
        }

        setRegLoading(true);
        const ok = await register({ firstName, shopName, email, password, avatar, whatsapp, country, city, bio });
        if (ok) {
            setShowConfetti(true);
            setSuccessMessage(true);
            setTimeout(() => {
                setShowConfetti(false);
                router.push('/profile');
            }, 3500);
        } else {
            setRegError('Une erreur est survenue, veuillez réessayer');
        }
        setRegLoading(false);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppContainer className="bg-[#FAF9F6] min-h-screen">
            <Confetti active={showConfetti} />

            {/* Success Banner */}
            {successMessage && (
                <div className="fixed top-0 left-0 right-0 z-[998] bg-[#25D366] text-white py-4 px-6 flex items-center justify-center gap-3 shadow-xl animate-in slide-in-from-top">
                    <CheckCircle size={24} className="fill-white text-white" />
                    <span className="font-bold text-base">Votre compte a été créé avec succès !</span>
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#5D4037] text-[#D7CCC8]">
                <div className="flex items-center px-4 py-4 gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-[#D7CCC8]/10 rounded-full transition-all">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="flex-1 text-center text-sm font-black uppercase tracking-widest pr-8">
                        Connexion / Inscription
                    </h1>
                </div>
            </header>

            <div className="max-w-md mx-auto px-4 py-8 pb-20">
                {/* Tabs Connexion / Inscription */}
                <div className="flex rounded-2xl border-2 border-[#D7CCC8]/40 overflow-hidden mb-8 bg-white">
                    <button
                        onClick={() => setMode('login')}
                        className={`flex-1 py-3.5 font-black text-sm uppercase tracking-wider transition-all ${mode === 'login' ? 'bg-[#5D4037] text-[#D7CCC8]' : 'text-[#5D4037]/50 hover:text-[#5D4037]'}`}
                    >
                        Connectez-vous
                    </button>
                    <button
                        onClick={() => setMode('register')}
                        className={`flex-1 py-3.5 font-black text-sm uppercase tracking-wider transition-all ${mode === 'register' ? 'bg-[#5D4037] text-[#D7CCC8]' : 'text-[#5D4037]/50 hover:text-[#5D4037]'}`}
                    >
                        Inscrivez-vous
                    </button>
                </div>

                {/* ─── CONNEXION ─── */}
                {mode === 'login' && (
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Votre Adresse mail</label>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={e => setLoginEmail(e.target.value)}
                                placeholder="exemple@email.com"
                                required
                                className="w-full px-4 py-3.5 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all placeholder:text-[#5D4037]/25"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Votre mot de passe</label>
                            <input
                                type={showLoginPwd ? 'text' : 'password'}
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3.5 pr-12 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all"
                            />
                            <button type="button" onClick={() => setShowLoginPwd(!showLoginPwd)} className="absolute right-4 top-[calc(50%+12px)] -translate-y-1/2 text-[#5D4037]/40">
                                {showLoginPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {loginError && (
                            <p className="text-red-500 text-xs font-bold bg-red-50 px-4 py-3 rounded-xl border border-red-100">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full bg-[#5D4037] hover:bg-[#3E2723] text-[#D7CCC8] font-black py-4 rounded-xl uppercase tracking-widest text-sm transition-all active:scale-95 disabled:opacity-50 mt-4"
                        >
                            {loginLoading ? 'Connexion...' : 'Se connecter'}
                        </button>

                        <p className="text-center text-xs text-[#5D4037]/50 font-medium">
                            Pas encore de compte ?{' '}
                            <button type="button" onClick={() => setMode('register')} className="font-bold text-[#5D4037] underline underline-offset-2">
                                Inscrivez-vous
                            </button>
                        </p>
                    </form>
                )}

                {/* ─── INSCRIPTION ─── */}
                {mode === 'register' && (
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Prénom */}
                        <div>
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Prénom *</label>
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                                placeholder="Votre prénom"
                                className="w-full px-4 py-3.5 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all placeholder:text-[#5D4037]/25" />
                        </div>

                        {/* Nom de boutique */}
                        <div>
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">
                                Nom de la Boutique * <span className="text-[#5D4037]/30">(11 car. max)</span>
                            </label>
                            <input type="text" value={shopName} onChange={e => setShopName(e.target.value.slice(0, 11))}
                                placeholder="Ex: Belle Mode"
                                maxLength={11}
                                className="w-full px-4 py-3.5 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all placeholder:text-[#5D4037]/25" />
                            <p className="text-right text-[9px] text-[#5D4037]/30 mt-1 font-bold">{shopName.length}/11</p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Adresse E-mail *</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="votre@email.com"
                                className="w-full px-4 py-3.5 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all placeholder:text-[#5D4037]/25" />
                        </div>

                        {/* Mot de passe */}
                        <div className="relative">
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Mot de passe * <span className="text-[#5D4037]/30">(8 car. min)</span></label>
                            <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                placeholder="Minimum 8 caractères"
                                className="w-full px-4 py-3.5 pr-12 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all" />
                            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-[calc(50%+12px)] -translate-y-1/2 text-[#5D4037]/40">
                                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Confirmer mot de passe */}
                        <div className="relative">
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Confirmer le mot de passe *</label>
                            <input type={showConfirm ? 'text' : 'password'} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
                                placeholder="Répéter votre mot de passe"
                                className={`w-full px-4 py-3.5 pr-12 bg-white border-2 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all ${confirmPwd && confirmPwd !== password ? 'border-red-400' : 'border-[#D7CCC8]/40'}`} />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-[calc(50%+12px)] -translate-y-1/2 text-[#5D4037]/40">
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {confirmPwd && confirmPwd !== password && (
                                <p className="text-red-500 text-[10px] font-bold mt-1">Les mots de passe ne correspondent pas</p>
                            )}
                        </div>

                        {/* Photo de profil */}
                        <div>
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Photo de profil <span className="text-[#5D4037]/30">(optionnel)</span></label>
                            <label className="flex items-center gap-4 p-4 bg-white border-2 border-dashed border-[#D7CCC8]/40 rounded-xl cursor-pointer hover:border-[#5D4037]/50 transition-all">
                                <div className="w-14 h-14 rounded-full bg-[#5D4037]/10 flex items-center justify-center overflow-hidden shrink-0 border-2 border-[#D7CCC8]">
                                    {avatar ? (
                                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={24} className="text-[#5D4037]/40" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#5D4037]">
                                        <Camera size={12} className="inline mr-1" />
                                        {avatar ? 'Changer la photo' : 'Ajouter une photo'}
                                    </p>
                                    <p className="text-[9px] text-[#5D4037]/40 mt-0.5">JPG, PNG — optionnel</p>
                                </div>
                                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                            </label>
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Numéro WhatsApp valide * <span className="text-[#5D4037]/30">(sans indicatif)</span></label>
                            <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
                                placeholder="Ex: 0900000000"
                                className="w-full px-4 py-3.5 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none transition-all placeholder:text-[#5D4037]/25" />
                        </div>

                        {/* Pays + Ville côte à côte */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Pays *</label>
                                <div className="relative">
                                    <select value={country} onChange={e => { setCountry(e.target.value); setCity(''); }}
                                        className="w-full px-4 py-3.5 pr-8 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none appearance-none cursor-pointer text-sm">
                                        {AFRICAN_COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D4037]/40 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">Ville *</label>
                                <div className="relative">
                                    <select value={city} onChange={e => setCity(e.target.value)}
                                        className="w-full px-4 py-3.5 pr-8 bg-white border-2 border-[#D7CCC8]/40 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none appearance-none cursor-pointer text-sm">
                                        <option value="">Sélectionner</option>
                                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D4037]/40 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-2">
                                Bio / Description * <span className="text-[#5D4037]/30">(150–250 car.)</span>
                            </label>
                            <textarea
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                rows={4}
                                maxLength={250}
                                placeholder="Décrivez votre boutique, vos produits, votre zone de livraison... (150 à 250 caractères)"
                                className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-[#3E2723] font-medium focus:border-[#5D4037] outline-none resize-none transition-all text-sm leading-relaxed placeholder:text-[#5D4037]/20 ${bio.length > 0 && (bio.length < 150 || bio.length > 250) ? 'border-red-400' : 'border-[#D7CCC8]/40'}`}
                            />
                            <p className={`text-right text-[9px] font-bold mt-1 ${bio.length >= 150 && bio.length <= 250 ? 'text-green-500' : 'text-[#5D4037]/30'}`}>{bio.length}/250</p>
                        </div>

                        {regError && (
                            <p className="text-red-500 text-xs font-bold bg-red-50 px-4 py-3 rounded-xl border border-red-100">{regError}</p>
                        )}

                        {/* Bouton Créer mon Compte */}
                        <button
                            type="submit"
                            disabled={regLoading}
                            className="w-full bg-[#5D4037] hover:bg-[#3E2723] text-[#D7CCC8] font-black py-4 rounded-xl uppercase tracking-widest text-sm transition-all active:scale-95 disabled:opacity-50 mt-2"
                        >
                            {regLoading ? 'Création en cours...' : 'Créer mon Compte'}
                        </button>
                    </form>
                )}
            </div>
        </AppContainer>
    );
}
