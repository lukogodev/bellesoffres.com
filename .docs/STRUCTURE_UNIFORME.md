# 🏗️ Structure Uniforme de l'Application - Belles Offres

## 📐 Vue d'Ensemble

Toutes les pages de l'application utilisent maintenant une structure uniforme et centrée pour garantir un alignement parfait sur tous les écrans, notamment en vue dézoomée sur grand écran.

## 🎯 Principes Fondamentaux

### 1. Conteneur Global Unifié
**Largeur maximale** : `1280px` (max-w-[1280px])
**Centrage** : `mx-auto` (margin left/right auto)
**Application** : Tous les éléments (Header, Main, BottomNav)

### 2. Alignement Chirurgical
- Le Header, le contenu principal et la BottomNav sont alignés sur les mêmes bordures verticales
- Le padding-x (marges latérales) est identique : `px-4`
- En dézoom, l'application reste centrée comme un bloc uni

## 🧩 Composants du Système

### **AppContainer**
Wrapper principal pour toutes les pages

```tsx
import AppContainer from "@/components/AppContainer";

<AppContainer className="bg-white">
  {/* Contenu de la page */}
</AppContainer>
```

**Props** :
- `children`: Contenu de la page (ReactNode)
- `className`: Classes CSS supplémentaires (optionnel)

**Caractéristiques** :
- `min-h-screen` : Hauteur minimale plein écran
- `pb-32` : Padding bottom pour éviter la BottomNav
- Fond blanc par défaut (peut être overridé)

---

### **PageHeader**
Header dynamique avec deux variants

#### Variant "home" (Page d'Accueil)
```tsx
<PageHeader variant="home" />
```

**Affichage** :
- Logo "Belles Offres" à gauche
- Icône cœur (favoris) et menu à droite
- Fond Chocolat, texte Beige

#### Variant "page" (Toutes les autres pages)
```tsx
<PageHeader
  variant="page"
  title="Nom de la Page"
  icon={<MonIcone />}  {/* Optionnel */}
  rightContent={<MonBouton />}  {/* Optionnel */}
  backUrl="/"  {/* Optionnel, "/" par défaut */}
/>
```

**Affichage** :
- Flèche de retour (ArrowLeft) à gauche
- Titre centré avec icône optionnelle
- Contenu personnalisé à droite
- Fond Chocolat, texte Beige

**Props** :
- `variant`: "home" | "page"
- `title`: Titre de la page (string)
- `icon`: Icône React (optionnel)
- `rightContent`: Contenu React pour la partie droite (optionnel)
- `backUrl`: URL de retour, "/" par défaut

---

### **BottomNav**
Navigation en bas d'écran

**Caractéristiques** :
- Fixed en bas de l'écran
- Utilise le même conteneur `max-w-[1280px]`
- Fond Chocolat, icônes Beige
- Icône active entourée d'un cercle Beige

## 📝 Structure Type d'une Page

```tsx
'use client';

import AppContainer from "@/components/AppContainer";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { MonIcone } from 'lucide-react';

export default function MaPage() {
    return (
        <AppContainer className="bg-gray-50">
            {/* Header */}
            <PageHeader
                variant="page"
                title="Ma Page"
                icon={<MonIcone size={20} />}
                rightContent={
                    <button className="text-beige">
                        {/* Mon bouton */}
                    </button>
                }
            />

            {/* Contenu Principal */}
            <main className="max-w-[1280px] mx-auto px-4 py-8">
                {/* Votre contenu ici */}
            </main>

            {/* Navigation Bottom */}
            <BottomNav />
        </AppContainer>
    );
}
```

## ✅ Pages Mise à Jour

Les pages suivantes utilisent le nouveau système :

- ✅ **Page d'Accueil** (`/`) - Variant "home"
- ✅ **Favoris** (`/favorites`) - Variant "page"
- ✅ **Page Produit** (`/product/[id]`) - Variant "page"
- ✅ **Profil** (`/profile`) - Variant "page"
- ✅ **BottomNav** - Conteneur unifié

## 🎨 Spécifications Techniques

### Conteneurs
```css
max-w-[1280px]  /* Largeur maximale */
mx-auto         /* Centrage horizontal */
px-4            /* Padding horizontal uniforme */
```

### Headers
```css
sticky          /* Position sticky */
top-0           /* Collé en haut */
z-50            /* Au-dessus du contenu */
bg-chocolate    /* Fond chocolat #2B1700 */
shadow-xl       /* Ombre prononcée */
```

### Heights
```css
Header: py-4                    /* Padding vertical */
BottomNav: h-[75px]            /* Hauteur fixe */
AppContainer: pb-32            /* Padding bottom pour BottomNav */
```

## 🔄 Migration d'une Page Existante

1. **Importer les composants** :
```tsx
import AppContainer from "@/components/AppContainer";
import PageHeader from "@/components/PageHeader";
```

2. **Remplacer le wrapper** :
```tsx
// Avant
<div className="min-h-screen pb-24">
  {/* ... */}
</div>

// Après
<AppContainer className="bg-gray-50">
  {/* ... */}
</AppContainer>
```

3. **Remplacer le header** :
```tsx
// Avant
<header className="sticky top-0 z-50 bg-chocolate">
  <div className="max-w-6xl mx-auto px-4 py-4">
    <h1>Ma Page</h1>
  </div>
</header>

// Après
<PageHeader variant="page" title="Ma Page" />
```

4. **Uniformiser le main** :
```tsx
// Avant
<main className="max-w-6xl mx-auto px-4 py-8">

// Après
<main className="max-w-[1280px] mx-auto px-4 py-8">
```

## 🌟 Avantages du Système

1. **Alignement Parfait** : Tous les éléments sont alignés verticalement
2. **Responsive Cohérent** : Comportement uniforme sur tous les écrans
3. **Maintenabilité** : Changements centralisés dans les composants
4. **DRY (Don't Repeat Yourself)** : Pas de duplication de code
5. **Consistance Visuelle** : Expérience utilisateur homogène
6. **Zoom Out Friendly** : En dézoomant, l'app reste un bloc centré

## 📊 Comportement Responsive

### Mobile (< 768px)
- Container : 100% avec padding-x de 16px
- Grid produits : 2 colonnes

### Tablet (768px - 1024px)
- Container : 100% jusqu'à 1280px
- Grid produits : 4 colonnes

### Desktop (> 1024px)
- Container : Max 1280px centré
- Grid produits : 5 colonnes
- Marges latérales automatiques quand écran > 1280px

## 🔍 Débogage

Si l'alignement n'est pas parfait :

1. Vérifier que tous les conteneurs utilisent `max-w-[1280px]`
2. Vérifier le padding-x uniforme : `px-4`
3. S'assurer que le PageHeader utilise la structure correcte
4. Confirmer que BottomNav a été mis à jour

---

**Date de création** : 17 Février 2026  
**Version** : 2.0.0  
**Statut** : ✅ Implémenté et Testé
