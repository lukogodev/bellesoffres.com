# 🎨 Charte Graphique - Belles Offres

## 📋 Palette de Couleurs (Codes Hexadécimaux)

| Couleur | Hex Code | Usage |
|---------|----------|-------|
| **Chocolat** | `#2B1700` | Fond Header, Bottom Nav, Contours importants, Titres de sections |
| **Beige** | `#F5F5DC` | Texte sur fond Chocolat, Fond des cartes caractéristiques, Détails UI |
| **Blanc** | `#FFFFFF` | Fond principal des pages, Fond des cartes produits |
| **WhatsApp** | `#25D366` | Bouton de discussion WhatsApp uniquement |
| **Rouge Favori** | `#FF0000` | Icône cœur (quand actif) |

## 🔤 Typographie & Polices

### Police Principale
- **Nom** : Inter
- **Usage** : Corps de texte, descriptions, labels
- **Poids disponibles** : 400, 500, 600, 700, 800, 900

### Police Display (Titres)
- **Nom** : Inter (utilisé comme Geist alternative)
- **Usage** : Logo "Belles Offres", Titres (h1-h6), Prix
- **Poids spécial** : **Extra-Bold (800)** pour le logo et les prix

### Hiérarchie Typographique

#### Logo "Belles Offres"
- Poids : **900** (Black)
- Couleur : Beige (`#F5F5DC`)
- Style : Uppercase, tracking serré
- Police : Geist/Inter

#### Nom du Produit
- Couleur : **Noir** (`#000000`)
- Poids : **Gras** (700)
- Taille : 13px (cartes), 3xl-4xl (page produit)

#### Prix
- Couleur : **Chocolat** (`#2B1700`)
- Poids : **Extra-Bold (900)**
- Position : Juste en dessous du nom avec espace réduit
- Taille : 16px (cartes), 4xl (page produit)
- Style : Tracking serré (`tracking-tighter`)

#### Titres de Sections
- Couleur : **Chocolat** (`#2B1700`)
- Poids : **900**
- Style : Uppercase, tracking serré

## 🧩 Composants UI

### Header & Bottom Nav
```
- Fond : Chocolat (#2B1700)
- Texte & Icônes : Beige (#F5F5DC)
- Icône Active : Entourée d'un cercle Beige
- Shadow : Ombre prononcée pour effet de profondeur
```

### Cartes Produits (ListingCard)
```
Conteneur :
- Fond : Blanc (#FFFFFF)
- Bordure : Fine, Chocolat (#2B1700) avec opacité 15%
- Coins arrondis : 2xl (rounded-2xl)
- Ombre : Légère, augmente au hover
- Transition : Douce (duration-500)

Badge de Temps :
- Position : Top-left de l'image
- Fond : Chocolat semi-transparent (bg-chocolate/70)
- Texte : Beige, Extra-Bold, 9px, Uppercase

Bouton Favori :
- Position : Top-right de l'image
- Fond : Blanc semi-transparent (bg-white/90)
- Icône : Rouge (#FF0000) si actif, Chocolat sinon
- Bordure : Chocolat/10
```

### Section Caractéristiques
```
Blocs individuels :
- Fond : Beige (#F5F5DC)
- Bordure : Fine, Chocolat (#2B1700) avec opacité 20%
- Coins : Arrondis (rounded-2xl)
- Padding : Généreux (p-4)

Titre du champ :
- Taille : 9px
- Couleur : Chocolat (#2B1700)
- Poids : 900
- Style : Uppercase, tracking large

Valeur :
- Taille : 13px
- Couleur : Noir (#000000)
- Poids : Black (900)
```

### Barre de Catégories
```
Icône sélectionnée :
- Fond : Chocolat (#2B1700)
- Icône : Beige (#F5F5DC)
- Effet : Scale (110%)

Icône non-sélectionnée :
- Fond : Beige (#F5F5DC)
- Icône : Chocolat (#2B1700)
- Hover : Fond Chocolat/10
```

### Bouton WhatsApp
```
- Fond : #25D366 (Vert WhatsApp)
- Texte : Blanc
- Poids : Black (900)
- Ombre : Verte (shadow-green-200)
- Hover : Teinte plus sombre (#1ebc57)
```

## 📐 Espacements & Layouts

### Grilles de Produits
```
- Mobile : 2 colonnes (grid-cols-2)
- Tablet : 4 colonnes (md:grid-cols-4)
- Desktop : 5 colonnes (lg:grid-cols-5)
- Gap : 4 (mobile), 6 (desktop)
```

### Conteneur Principal
```
- Max-width : 6xl (1536px)
- Padding horizontal : 4 (px-4)
- Padding bottom : 32 (pb-32) pour éviter Bottom Nav
```

## 🎯 Effets & Animations

### Transitions
- Durée standard : `duration-300` ou `duration-500`
- Easing : `ease-out` ou défaut
- Transforms : `hover:-translate-y-1` pour les cartes

### Hover States
```
Cartes Produits :
- Ombre : Augmente à shadow-2xl
- Image : Scale 110% (zoom doux)

Boutons :
- Scale : 95% ou 90% au click (active:scale-95)
- Ombre : Augmente légèrement
```

### Animations d'entrée
```
- Cartes : fade-in + slide-in-from-bottom
- Délai progressif : 100ms par item
- Style : fill-mode-backwards
```

## 🔧 Configuration Technique

### Tailwind Config
```typescript
colors: {
  chocolate: "#2B1700",
  beige: "#F5F5DC",
  whatsapp: "#25D366",
  favorite: "#FF0000",
}

fontFamily: {
  sans: ['var(--font-inter)', 'Inter', 'system-ui'],
  display: ['var(--font-geist)', 'Geist', 'Inter'],
}

fontWeight: {
  'extra-bold': '800',
}
```

### Global CSS
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

--font-inter: 'Inter', system-ui, sans-serif;
--color-chocolate: #2B1700;
--color-beige: #F5F5DC;
--color-whatsapp: #25D366;
--color-favorite: #FF0000;
```

## ✅ Checklist d'Application

- [x] Palette de couleurs définie dans Tailwind
- [x] Polices Inter importées via Google Fonts
- [x] Header avec fond Chocolat et texte Beige
- [x] Bottom Nav avec fond Chocolat et cercle Beige pour icône active
- [x] Cartes produits avec bordure Chocolat fine
- [x] Badge de temps repositionné top-left
- [x] Prix en Extra-Bold Chocolat
- [x] Section caractéristiques avec fond Beige
- [x] Bouton WhatsApp avec couleur #25D366
- [x] Icône cœur Rouge quand active
- [x] Typographie hiérarchique appliquée

---

**Date de création** : 17 Février 2026  
**Version** : 1.0.0  
**Statut** : ✅ Appliqué
