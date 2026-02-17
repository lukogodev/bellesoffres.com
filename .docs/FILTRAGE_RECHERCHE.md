# 🔍 Système de Filtrage de Recherche - Belles Offres

## 📋 Vue d'Ensemble

Le panneau de filtrage permet aux utilisateurs d'affiner leurs recherches de produits avec des critères précis. Il apparaît en **superposition sur le côté droit** de l'écran après avoir cliqué sur le bouton de filtrage à côté de la barre de recherche.

## 🎨 Design

### Format
- **Type** : Demi-page en overlay (pas une page entière)
- **Position** : Côté droit de l'écran
- **Largeur** : 450px sur desktop, pleine largeur sur mobile
- **Fond** : Overlay sombre (50% noir) + panneau blanc
- **Fermeture** : Clic sur overlay ou bouton X

### Header
- **Fond** : Chocolat (#2B1700)
- **Texte** : Beige (#F5F5DC)
- **Titre** : "FILTRER LA RECHERCHE" (icône Tag)
- **Bouton fermeture** : Icône X (coin supérieur droit)

## 📝 Champs de Filtrage

### 1. Catégorie de Produit
**Type** : Select (liste déroulante)
**Options** : 14 catégories + "Toutes les catégories"

#### Les 14 Catégories de Produits Physiques :

| N° | Catégorie | Exemples de Produits |
|----|-----------|---------------------|
| 1 | Véhicules | Voitures, motos, vélos |
| 2 | Téléphones | Smartphones, tablettes, accessoires |
| 3 | Mode Homme | Vêtements, costumes, chemises |
| 4 | Mode Femme | Robes, sacs, bijoux |
| 5 | Chaussures | Baskets, talons, souliers |
| 6 | Informatique | Ordinateurs, imprimantes, écrans |
| 7 | Électroménager | Frigos, mixeurs, fers à repasser |
| 8 | Beauté & Soins | Parfums, maquillage, produits de peau |
| 9 | Maison & Déco | Meubles, rideaux, tapis |
| 10 | Électronique | Télévisions, sonos, caméras |
| 11 | Bébé & Enfant | Jouets, vêtements enfants, poussettes |
| 12 | Sport & Loisirs | Ballons, haltères, articles de sport |
| 13 | Alimentation | Paniers de vivres, boissons, épicerie |
| 14 | Divers | Tout ce qui ne rentre pas ailleurs |

---

### 2. Prix (FCFA)
**Type** : Deux inputs number (Min et Max)

**Champs** :
- **Prix Minimum** : Input number (placeholder: "0")
- **Prix Maximum** : Input number (placeholder: "999999")

**Validation** :
- Prix Min doit être ≤ Prix Max
- Valeurs positives uniquement
- Si vide : pas de limite

---

### 3. Localisation (Pays / Ville)

#### A. Pays
**Type** : Select
**Par défaut** : RD Congo

#### 14 Pays Francophones d'Afrique :

| Pays | Code | Villes Principales |
|------|------|-------------------|
| **RD Congo** | CD | 40+ villes (voir détails ci-dessous) |
| Sénégal | SN | Dakar, Thiès, Saint-Louis |
| Côte d'Ivoire | CI | Abidjan, Yamoussoukro, Bouaké |
| Cameroun | CM | Douala, Yaoundé, Garoua |
| Gabon | GA | Libreville, Port-Gentil, Franceville |
| Congo-Brazzaville | CG | Brazzaville, Pointe-Noire, Dolisie |
| Bénin | BJ | Cotonou, Porto-Novo, Parakou |
| Togo | TG | Lomé, Kara, Atakpamé |
| Guinée | GN | Conakry, Nzérékoré, Kankan |
| Mali | ML | Bamako, Sikasso, Mopti |
| Burkina Faso | BF | Ouagadougou, Bobo-Dioulasso, Koudougou |
| Rwanda | RW | Kigali, Gisenyi, Butare |
| Burundi | BI | Bujumbura, Gitega, Ngozi |
| Madagascar | MG | Antananarivo, Toamasina, Antsirabe |

---

#### B. Villes de RD Congo (40+ villes des 14 provinces)

| Province/Région | Villes |
|----------------|--------|
| **Kinshasa** | Kinshasa, Masina, N'Sele |
| **Nord-Kivu** | Butembo, Goma, Beni |
| **Sud-Kivu** | Bukavu, Uvira, Baraka |
| **Haut-Katanga** | Lubumbashi, Likasi, Kasumbalesa |
| **Lualaba** | Kolwezi, Kasaji, Mutshatsha |
| **Tshopo** | Kisangani, Isangi, Yangambi |
| **Kongo-Central** | Matadi, Boma, Muanda |
| **Ituri** | Bunia, Mahagi, Aru |
| **Haut-Uele** | Isiro, Watsa, Dungu |
| **Kasai-Oriental** | Mbuji-Mayi, Miabi, Tshilenge |
| **Kasai-Central** | Kananga, Demba, Dibaya |
| **Equateur** | Mbandaka, Bikoro, Lukolela |
| **Tanganyika** | Kalemie, Kongolo, Moba |

**Total** : 40 villes principales de RDC

---

#### Ville
**Type** : Select (dépend du pays sélectionné)
**Options** : "Toutes les villes" + villes du pays sélectionné
**Comportement** : La liste change dynamiquement selon le pays

---

### 4. État du Produit
**Type** : Boutons toggle (radio buttons stylisés)

**Options** :
- ⭕ **Neuf**
- ⭕ **Occasion**

**Comportement** :
- Une seule option peut être sélectionnée
- Clic sur l'option active = désélection
- Radio button visuel avec cercle intérieur
- Fond chocolat quand actif, beige/20 quand inactif

---

### 5. Résumé des Filtres Actifs

**Section** : Cadre beige/20 avec border chocolat/10

**Affiche** :
- Catégorie sélectionnée
- Plage de prix (Min - Max FCFA)
- Localisation (Ville, Pays)
- État du produit (Neuf/Occasion)

**Si aucun filtre** :
- Message : "Aucun filtre actif" (italique, gris)

---

## 🎯 Boutons d'Action

### Bouton "Appliquer les Filtres"
- **Position** : Sticky en bas du panneau
- **Couleur** : WhatsApp Green (#25D366)
- **Texte** : "APPLIQUER LES FILTRES"
- **Action** : 
  - Envoie les filtres sélectionnés
  - Ferme le panneau
  - Lance la recherche avec les critères combinés

### Bouton "Réinitialiser"
- **Position** : Sous le bouton "Appliquer"
- **Couleur** : Blanc, border chocolat/20
- **Texte** : "RÉINITIALISER"
- **Action** : Vide tous les champs et réinitialise les valeurs

---

## 🔄 Logique de Recherche

### Combinaison des Critères

La recherche finale combine :
1. **Requête de recherche** (barre de recherche)
2. **Catégorie** (filtre)
3. **Prix** (filtre)
4. **Localisation** (filtre)
5. **État** (filtre)

### Requête SQL/Database Exemple

```sql
SELECT * FROM products 
WHERE 
  (name LIKE '%query%' OR description LIKE '%query%')
  AND (category = 'selected_category' OR 'selected_category' IS NULL)
  AND (price BETWEEN min_price AND max_price)
  AND (country = 'selected_country' OR 'selected_country' IS NULL)
  AND (city = 'selected_city' OR 'selected_city' IS NULL)
  AND (state = 'neuf' OR state = 'occasion' OR 'state_filter' IS NULL)
ORDER BY created_at DESC
```

---

## 💾 Interface TypeScript

```typescript
interface FilterValues {
    category: string;          // '' = toutes
    priceMin: string;         // '' = pas de min
    priceMax: string;         // '' = pas de max
    country: string;          // Défaut: 'RD Congo'
    city: string;             // '' = toutes
    state: 'neuf' | 'occasion' | ''; // '' = tous
}

interface SearchFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterValues) => void;
}
```

---

## 📱 Responsive Design

### Desktop (> 768px)
- Largeur fixe : 450px
- Position : Côté droit de l'écran
- Overlay sombre sur le reste

### Mobile (< 768px)
- Pleine largeur (100vw)
- Slide depuis la droite
- Overlay couvre tout l'écran

---

## 🎨 États et Interactions

### Ouverture
- Animation : Slide-in depuis la droite
- Overlay : Fade-in opacity
- Body : scroll-lock (empêche le scroll de la page)

### Fermeture
- Clic sur overlay
- Clic sur bouton X
- Clic sur "Appliquer les filtres"
- Touche Escape (clavier)

### Focus
- Border chocolat sur focus
- Ring chocolat/10 (4px)
- Transitions fluides

---

## 🌟 Fonctionnalités Avancées

### Sauvegarde des Filtres
```typescript
// localStorage
localStorage.setItem('lastFilters', JSON.stringify(filters));

// Récupération au chargement
const savedFilters = JSON.parse(localStorage.getItem('lastFilters') || '{}');
```

### Compteur de Résultats
Afficher le nombre de produits correspondants en temps réel :
```
"245 produits trouvés"
```

### Filtres Rapides (Suggestions)
Boutons pré-configurés :
- "Neuf à Kinshasa"
- "Mode Femme < 50,000 FCFA"
- "Électronique en promotion"

---

## ✅ Checklist de Validation

Avant d'appliquer les filtres :
- [ ] Prix Min ≤ Prix Max
- [ ] Au moins un critère sélectionné (optionnel)
- [ ] Ville appartient au pays sélectionné
- [ ] Valeurs numériques valides

---

## 🚀 Intégration dans l'Application

### Utilisation dans une Page

```typescript
'use client';

import { useState } from 'react';
import SearchFilter, { FilterValues } from '@/components/SearchFilter';

export default function HomePage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentFilters, setCurrentFilters] = useState<FilterValues | null>(null);

    const handleApplyFilters = (filters: FilterValues) => {
        setCurrentFilters(filters);
        // Lancer la recherche avec les filtres
        fetchProducts(filters);
    };

    return (
        <>
            <button onClick={() => setFilterOpen(true)}>
                Filtrer
            </button>

            <SearchFilter
                isOpen={filterOpen}
                onClose={() => setFilterOpen(false)}
                onApply={handleApplyFilters}
            />
        </>
    );
}
```

---

## 🔍 Optimisation de la Recherche

### Indexation Database
Créer des index sur :
- `category`
- `price`
- `country`
- `city`
- `state`
- `created_at`

### Cache
- Cache des résultats fréquents (Redis)
- Invalidation sur nouveau produit
- TTL : 5 minutes

---

**Date de création** : 17 Février 2026  
**Version** : 1.0.0  
**Statut** : ✅ Implémenté et Documenté
