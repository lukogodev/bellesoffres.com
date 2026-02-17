# 📹 Système de Vidéos Format 9:16 - Belles Offres

## 🎯 Vue d'Ensemble

Le système de vidéos utilise le **format vertical 9:16** (format TikTok/Instagram Reels/YouTube Shorts) pour une expérience mobile optimale en plein écran.

## 📱 Pages Vidéo

### 1. Page Vidéo Unique (`/video/[id]`)
✅ **Statut** : Implémentée

**Caractéristiques** :
- Format **9:16 plein écran** sur mobile
- **Auto-play** au chargement
- Lecture en boucle désactivée (pause à la fin)
- Fond noir pour immersion totale

#### Layout & Contrôles

**Header (Top)** :
- Flèche retour (coin supérieur gauche)
- Menu options (coin supérieur droit)
- Fond semi-transparent avec backdrop-blur

**Centre** :
- Vidéo plein écran (object-cover)
- Gradient overlay (noir 40% top, transparent centre, noir 60% bottom)
- **Play/Pause** : Apparaît 2 secondes après interaction, puis fade-out

**Boutons d'Action (Droite)** :
Position : Côté droit, alignés verticalement

1. **Photo de profil** (cliquable → boutique vendeur)
   - Cercle 56px, border blanc 2px
   - Image du vendeur

2. **Like** (cœur)
   - Icône 32px
   - Compteur de likes en dessous
   - Rouge plein si liké, blanc outline sinon
   - Animation scale au clic

3. **WhatsApp**
   - Cercle vert (#25D366)
   - Icône WhatsApp blanc
   - Ouvre conversation avec vendeur

4. **Partager**
   - Icône Share2 blanc 32px
   - Partage lien de la vidéo/produit

5. **Volume**
   - Icône Volume2 ou VolumeX
   - Toggle mute/unmute
   - État persistant

**Informations (Bas Gauche)** :
- **Nom boutique** : @NomBoutique (cliquable)
- **Description** : 
  - 80 caractères visibles
  - Bouton "Voir plus" (beige souligné)
  - Expansion complète au clic
- **Prix** : 
  - Taille XL (2xl), gras (900)
  - Couleur beige
  - Devise à côté (sm)
- **Localisation** : 
  - Emoji 📍 + Ville, Quartier
  - Texte xs, blanc/90

**Bouton Principal (Bas Centre)** :
- **"VOIR L'ANNONCE"**
- Pleine largeur (moins marges)
- Couleur WhatsApp Green
- Redirige vers `/product/[id]`
- Font black, uppercase, tracking-widest

---

### 2. Feed de Vidéos (`/feed`)
✅ **Statut** : Implémentée

**Caractéristiques** :
- **Scroll vertical infini** (comme TikTok)
- **Snap scroll** : Une vidéo à la fois en plein écran
- **Auto-play** : Vidéo visible se lance automatiquement
- Pause des vidéos hors écran
- Gestion du son global (bouton header)

#### Navigation

**Scroll Vertical** :
- Snap obligatoire (snap-mandatory)
- Smooth scroll
- Détection automatique de la vidéo visible
- Hauteur = 100vh par vidéo

**Header Global** :
- Bouton Home (retour accueil)
- Titre "Vidéos"
- Bouton Volume global (mute/unmute toutes les vidéos)

#### Architecture du Feed

```typescript
interface Video {
    id: string;
    videoUrl: string;
    thumbnail: string;
    productName: string;
    price: number;
    currency: string;
    description: string;
    seller: {
        name: string;
        avatar: string;
        shopId: string;
    };
    likes: number;
    location: string;
}
```

**Exemple de données** :
```typescript
const videos: Video[] = [
    {
        id: "1",
        videoUrl: "https://cdn.example.com/video1.mp4",
        productName: "iPhone 13 Pro Max 256GB",
        price: 850000,
        currency: "FCFA",
        // ... autres champs
    },
    // ... plus de vidéos
];
```

---

## 🎨 Design Specifications

### Format Vidéo
- **Ratio** : 9:16 (vertical)
- **Résolution recommandée** : 1080x1920 (Full HD)
- **Durée** : 15 secondes à 3 minutes
- **Format** : MP4, WebM
- **Codec** : H.264 (vidéo), AAC (audio)

### Dimensions Écran
```css
.video-container {
    width: 100vw;
    height: 100vh;
    aspect-ratio: 9/16;
}
```

### Gradient Overlay
```css
background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0, 0, 0, 0.6) 100%
);
```

### Positionnement des Éléments

**Boutons Droite** :
- Position : `right: 16px; bottom: 128px;`
- Espacement vertical : `gap: 24px;`
- Z-index : 30

**Infos Bas** :
- Position : `bottom: 16px; left: 16px; right: 80px;`
- Z-index : 30

**Header** :
- Position : `top: 0; left: 0; right: 0;`
- Z-index : 50

---

## 🔄 Logique & Interactions

### Auto-Play & Pause

**Page Vidéo Unique** :
```typescript
useEffect(() => {
    if (videoRef.current) {
        videoRef.current.play().catch(() => {
            setIsPlaying(false);
        });
    }
}, []);
```

**Feed de Vidéos** :
```typescript
useEffect(() => {
    const currentVideoRef = videoRefs.current[currentVideoIndex];
    if (currentVideoRef) {
        // Pause toutes les autres
        videoRefs.current.forEach((ref, index) => {
            if (ref && index !== currentVideoIndex) {
                ref.pause();
            }
        });
        // Play vidéo courante
        currentVideoRef.play().catch(() => {});
    }
}, [currentVideoIndex]);
```

### Détection de Scroll (Feed)

```typescript
const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const videoHeight = window.innerHeight;
    const newIndex = Math.round(scrollPosition / videoHeight);
    
    if (newIndex !== currentVideoIndex) {
        setCurrentVideoIndex(newIndex);
    }
};
```

### Gestion des Likes

```typescript
const toggleLike = (videoId: string) => {
    const newLiked = new Set(likedVideos);
    if (newLiked.has(videoId)) {
        newLiked.delete(videoId);
    } else {
        newLiked.add(videoId);
    }
    setLikedVideos(newLiked);
};
```

---

## 📐 Responsive Design

### Mobile (< 768px)
- Vidéo : 100vw × 100vh
- Plein écran natif
- Contrôles optimisés tactile
- Boutons : min 44px (accessibilité)

### Tablet (768px - 1024px)
- Vidéo centrée avec max-width
- Lettres noires sur les côtés
- Contrôles identiques

### Desktop (> 1024px)
- Vidéo centrée, max-width 500px
- Fond noir ou flou du contenu
- Contrôles adaptés au hover

---

## 🎬 Features de Vidéo

### Contrôles Natives Désactivés
```tsx
<video
    controls={false}
    playsInline
    loop={false}
    onClick={handleVideoClick}
/>
```

### Attributs Importants
- `playsInline` : Lecture inline sur iOS (pas plein écran forcé)
- `loop={false}` : Pause à la fin
- `muted={isMuted}` : Contrôle du son
- `preload="metadata"` : Charge thumbnail rapidement

### Fin de Vidéo
```typescript
const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowControls(true);
    // Affiche play button au centre
};
```

---

## 🌟 Fonctionnalités Avancées

### 1. Préchargement Vidéos (Feed)
```typescript
// Précharger vidéo suivante
useEffect(() => {
    if (currentVideoIndex < videos.length - 1) {
        const nextVideo = videoRefs.current[currentVideoIndex + 1];
        if (nextVideo) {
            nextVideo.load(); // Précharge
        }
    }
}, [currentVideoIndex]);
```

### 2. Analytics
Tracker :
- Vues complètes (> 95% visionnée)
- Temps de visionnage
- Interactions (likes, clics WhatsApp, partages)
- Taux de conversion (vues → voir annonce)

### 3. Optimisation Vidéo

**Compression** :
```bash
# FFmpeg pour compression optimale
ffmpeg -i input.mp4 \
  -vf "scale=1080:1920" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  output.mp4
```

**Formats multiples** :
- MP4 (H.264) : Compatibilité maximale
- WebM (VP9) : Meilleure compression pour web

### 4. CDN & Streaming

**DASH/HLS** pour adaptive streaming :
```html
<video>
    <source src="video-720p.m3u8" type="application/x-mpegURL">
    <source src="video-480p.m3u8" type="application/x-mpegURL">
</video>
```

---

## 🔗 Intégration avec Produits

### Lien Vidéo ↔ Produit
```typescript
interface VideoProduct {
    videoId: string;
    productId: string;
    // Relation 1:1 ou 1:N
}
```

### Navigation
- **Vidéo → Produit** : Bouton "VOIR L'ANNONCE"
- **Produit → Vidéo** : Play button sur thumbnail 4:3
- **Profil → Vidéos** : Tab "Vidéos" dans grille

---

## ✅ Checklist Qualité Vidéo

### Upload
- [ ] Format 9:16 (1080x1920)
- [ ] Durée 15s - 3min
- [ ] Taille < 100MB
- [ ] Audio optimisé (128kbps AAC)
- [ ] Thumbnail généré automatiquement

### Performance
- [ ] Vidéo compressée (CRF 23)
- [ ] Préchargement vidéo suivante
- [ ] Lazy loading hors viewport
- [ ] CDN pour delivery rapide

### UX
- [ ] Auto-play fluide
- [ ] Contrôles intuitifs
- [ ] Transitions smooth
- [ ] États visuels clairs (like, mute)

---

## 📂 Structure des Fichiers

```
src/app/
├── video/
│   └── [id]/
│       └── page.tsx ✅ (Vidéo unique)
├── feed/
│   └── page.tsx ✅ (Feed scroll infini)
```

---

## 🚀 Prochaines Améliorations

1. **Swipe gestures** : Swipe horizontal pour actions (like, share)
2. **Double-tap like** : Double tap vidéo = like (comme Instagram)
3. **Commentaires** : Section commentaires sous la vidéo
4. **Playlists** : Créer des collections de vidéos
5. **Live** : Streaming live pour vendeurs
6. **Stories** : Vidéos 24h éphémères
7. **Filtres/Stickers** : Outils de création vidéo intégrés
8. **Picture-in-Picture** : Continuer à regarder en naviguant

---

**Date de création** : 17 Février 2026  
**Version** : 2.0.0  
**Statut** : ✅ Implémenté (Format 9:16 Plein Écran)
