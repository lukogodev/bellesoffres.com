# 📝 Formulaire de Publication de Produit - Belles Offres

## 🎯 Vue d'Ensemble

Le formulaire de publication permet aux vendeurs d'ajouter leurs produits avec toutes les informations nécessaires. Il implémente une logique conditionnelle sophistiquée pour s'adapter aux différents types de vente.

## 📋 Structure du Formulaire

### Header
- **Titre** : "PUBLIER UN PRODUIT" centré
- **Flèche de retour** : Retourne à la page précédente (pas forcément l'accueil)
- **Design** : Fond Chocolat (#2B1700), texte Beige (#F5F5DC)

## 🔢 Champs du Formulaire (Dans l'Ordre)

### 1. Catégorie du Produit *
**Type** : Select (Liste déroulante)
**Obligatoire** : Oui

**Catégories disponibles** :
- Mode & Vêtements
- Beauté & Cosmétiques
- Électronique
- Meubles & Décoration
- Sport & Loisirs
- Jouets & Enfants
- Livres & Papeterie
- Accessoires & Bijoux
- Électroménager
- Autres

**Catégories EXCLUES** (non suggérées) :
- ❌ Immobilier
- ❌ Santé
- ❌ Nourriture
- ❌ Emploi

> Note : Seulement les produits physiques généraux, beauté et mode sont proposés

---

### 2. Nom du Produit *
**Type** : Input text
**Obligatoire** : Oui
**Placeholder** : "Ex: iPhone 13 Pro Max 256GB"

---

### 3. Images du Produit *
**Type** : Upload d'images
**Format** : 4:3 (ratio d'aspect)
**Minimum** : 3 photos
**Maximum** : 5 photos
**Obligatoire** : Oui

**Fonctionnalités** :
- Bouton "Ajouter" pour uploader des images
- Compteur "X/5" pour suivre le nombre d'images
- Possibilité de supprimer une image (icône X au hover)
- Numérotation des photos ("Photo 1", "Photo 2", etc.)
- Le bouton d'ajout disparaît quand on atteint 5 images

---

### 4. Description Complète *
**Type** : Textarea (6 lignes)
**Obligatoire** : Oui

**Placeholder (Exemple prédefini)** :
```
Exemple : iPhone 13 Pro Max en excellent état, acheté il y a 6 mois. 
Toujours sous garantie Apple. Capacité de 256GB, couleur Sierra Blue. 
Livré avec boîte d'origine, chargeur et écouteurs. Aucune rayure, 
batterie à 100%. Possibilité de test avant achat.
```

> Le texte d'exemple a un faible contraste (gray-400/70) pour guider les vendeurs

---

### 5. État du Produit *
**Type** : Boutons à choix unique (Radio buttons stylisés)
**Obligatoire** : Oui

**Options** :
- ⭕ **Neuf**
- ⭕ **Occasion**

**Comportement** :
- Un seul choix possible à la fois
- Coche visible (✓) sur l'option sélectionnée
- Fond Chocolat pour l'option active, fond Beige/20 pour l'inactive

---

### 6. Type de Vente *
**Type** : Boutons à choix unique
**Obligatoire** : Oui
**Par défaut** : "Vendre en Détails" (coché par défaut)

**Options** :
- ⭕ **Vendre en Détails**
- ⭕ **Vendre en Gros**

**Logique conditionnelle** : Selon le choix, des champs différents apparaissent

---

### 7. Vente en Détails (Champs Conditionnels)

**Condition d'affichage** : Visible SEULEMENT si "Vendre en Détails" est coché

**Champs** :

#### a) Prix du Produit *
- **Type** : Input number
- **Placeholder** : "0"
- **Obligatoire** : Oui

#### b) Devise *
- **Type** : Select
- **Options** :
  - USD
  - FCFA
  - EUR
- **Par défaut** : FCFA
- **Obligatoire** : Oui

**Design** : Section encadrée avec fond beige/10

---

### 8. Vente en Gros (Champs Conditionnels)

**Condition d'affichage** : Visible SEULEMENT si "Vendre en Gros" est coché

**Sous-choix** (exclusif) :
- ⭕ **Par Quantité**
- ⭕ **Par Kilogramme**

#### 8a. Vente par Quantité

**Condition** : Visible si "Par Quantité" est sélectionné

**Champs** :

##### Nombre de Produits
- **Type** : Select
- **Options** : Multiples de 2, de 2 à 24
  - 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Format** : "X produits"

##### Prix Global *
- **Type** : Input number + Select devise
- **Placeholder** : "Prix pour toute la quantité"
- **Devises** : FCFA, USD, EUR

#### 8b. Vente par Kilogramme

**Condition** : Visible si "Par Kilogramme" est sélectionné

**Champs** :

##### Poids (Kg)
- **Type** : Select
- **Options** : 1, 5, 10, 25, 50, 100
- **Format** : "X Kg"

##### Prix Global *
- **Type** : Input number + Select devise
- **Placeholder** : "Prix pour toute la masse"
- **Devises** : FCFA, USD, EUR

**⚠️ Logique importante** :
- Une SEULE option peut être cochée entre "Par Quantité" et "Par Kilogramme"
- Quand l'une est sélectionnée, l'autre est masquée
- Le switch entre les deux fait disparaître les champs de l'option non sélectionnée

**Design** : Section encadrée avec fond beige/10

---

### 9. Adresse de Livraison *

#### a) Pays et Ville (Côte à côte)

**Pays** :
- **Type** : Select
- **Par défaut** : Valeur du profil utilisateur (ex: "RD Congo")
- **Modifiable** : Oui
- **Options** :
  - RD Congo
  - Côte d'Ivoire
  - Sénégal
  - Cameroun
  - Bénin
  - Togo
  - Mali
  - Burkina Faso

**Ville** :
- **Type** : Input text
- **Par défaut** : Valeur du profil utilisateur (ex: "Kinshasa")
- **Modifiable** : Oui
- **Placeholder** : "Ex: Kinshasa"

---

### 10. Autre Adresse
**Type** : Input text avec icône MapPin
**Placeholder** : "Ex: Commune KIMEMI, Q.BIONDI / Av.Beni, Rue d'Embiance"
**Contraste** : Faible (gray-400/70) pour l'exemple
**Description** : Commune, Quartier, Avenue, Rue

---

### 11. Ajouter une Vidéo Marketing

**Question** : "Ajouter une Vidéo Marketing"

**Options** :
- ⭕ **Oui**
- ⭕ **Non**

**Par défaut** : Non

#### Si "OUI" est coché :

**Section d'upload vidéo apparaît** :

##### Avant l'upload :
- Bouton "IMPORTER UNE VIDÉO DU PRODUIT"
- Icône Video
- Info : "Format accepté: MP4, MOV (Max: 100MB)"

##### Après l'upload :
- Nom du fichier affiché
- Texte "Vidéo importée"
- Bouton de suppression (X)

#### Si "NON" est coché :
- Aucun champ supplémentaire
- Le bouton "Publier" reste disponible normalement

---

### 12. Bouton de Publication

**Texte** : "PUBLIER CE PRODUIT"
**Icône** : Upload
**Couleur** : WhatsApp Green (#25D366)
**Position** : Centré en bas du formulaire
**Taille** : Pleine largeur, grande hauteur (py-6)

**Validation obligatoire avant publication** :
- Au moins 3 images uploadées
- Catégorie sélectionnée
- Nom du produit renseigné
- Description remplie
- Prix renseigné (selon le type de vente)

**Note légale** :
"En publiant, vous acceptez nos Conditions d'utilisation."

---

## 🎨 Design & Charte Graphique

### Couleurs
- **Fond principal** : Blanc (#FFFFFF)
- **Fond des champs** : Beige/20 (rgba(245, 245, 220, 0.2))
- **Bordures** : Chocolat/10 à Chocolat selon focus
- **Boutons actifs** : Fond Chocolat, texte Beige
- **Boutons inactifs** : Fond Beige/20, texte Chocolat
- **Bouton Publier** : WhatsApp Green (#25D366)

### Polices
- **Labels** : Font-black, uppercase, tracking-widest, text-xs
- **Inputs** : Font-bold, text-base à text-lg
- **Placeholders** : Gray-400 (exemples avec contraste faible)

### Espacements
- **Container** : max-w-[1280px], mx-auto, px-4
- **Card principale** : rounded-[3rem], border chocolat/5
- **Gaps entre champs** : space-y-10

### Effets
- **Focus** : ring-4 ring-chocolate/10
- **Transitions** : transition-all sur tous les éléments interactifs
- **Hover** : Changement de couleur de bordure, scale sur boutons

---

## 🔄 États et Logique Conditionnelle

### État Initial (Par Défaut)
```typescript
- Images: []
- Catégorie: ""
- État produit: "neuf"
- Type vente: "detail" ✅ (COCHÉ PAR DÉFAUT)
- Prix détail: visible ✅
- Vente gros: masquée
- Pays: "RD Congo" (du profil)
- Ville: "Kinshasa" (du profil)
- Vidéo: NON ✅ (COCHÉ PAR DÉFAUT)
```

### Scénario 1 : Vente en Détails (Défaut)
```
✓ Type vente: "detail"
→ Affiche: Prix + Devise
→ Masque: Tous les champs de vente en gros
```

### Scénario 2 : Passage à Vente en Gros
```
✓ Type vente: "gros"
→ Masque: Prix détail + Devise
→ Affiche: Choix Quantité/Poids
→ Par défaut: "Par Quantité" sélectionné
→ Affiche: Sélecteur de quantité (2-24) + Prix global
```

### Scénario 3 : Switch Quantité → Poids
```
✓ Vente gros: "weight"
→ Masque: Champs de quantité
→ Affiche: Sélecteur de poids (1-100 Kg) + Prix global
```

### Scénario 4 : Activation Vidéo
```
✓ Vidéo marketing: "OUI"
→ Affiche: Zone d'upload vidéo
→ Permet: Import d'une vidéo MP4/MOV
```

---

## ✅ Validation du Formulaire

### Champs Obligatoires (*)
1. ✓ Catégorie
2. ✓ Nom du produit
3. ✓ Images (minimum 3)
4. ✓ Description
5. ✓ État du produit
6. ✓ Type de vente
7. ✓ Prix (selon le type de vente)
8. ✓ Devise
9. ✓ Pays
10. ✓ Ville

### Messages d'Erreur
- Si < 3 images : "Veuillez ajouter au moins 3 photos"
- Si champs vides : "Veuillez remplir tous les champs obligatoires"

### Succès
- Message : "Produit publié avec succès !"
- Action : Redirection ou affichage du produit

---

## 📱 Responsive Design

### Mobile (< 768px)
- Grille 1 colonne pour Pays/Ville
- Grille 1 colonne pour Prix/Devise
- Stack vertical pour tous les champs

### Tablet/Desktop (≥ 768px)
- Grille 2 colonnes pour Pays/Ville
- Grille 2 colonnes pour Prix/Devise
- Meilleure utilisation de l'espace

---

## 🚀 Améliorations Futures Possibles

1. **Upload réel d'images** : Intégration avec un service de stockage (AWS S3, Cloudinary)
2. **Upload réel de vidéo** : Compression et stockage optimisé
3. **Validation en temps réel** : Feedback instantané sur chaque champ
4. **Auto-sauvegarde** : Brouillon automatique pour ne pas perdre le travail
5. **Prévisualisation** : Voir le produit avant publication
6. **Géolocalisation** : Remplissage automatique basé sur la position
7. **Catégories dynamiques** : Chargées depuis une base de données
8. **Multi-langue** : Support de plusieurs langues
9. **Suggestions de prix** : Basé sur des produits similaires

---

**Date de création** : 17 Février 2026  
**Version** : 1.0.0  
**Statut** : ✅ Implémenté
