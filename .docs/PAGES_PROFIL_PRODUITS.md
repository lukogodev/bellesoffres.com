# 📱 Pages de Profil et Produits - Plan d'Implémentation Complet

## ✅ Pages Déjà Implémentées

### 1. Page "Mon Profil" (`/profile`)
✅ **Statut** : Implémentée

**Caractéristiques** :
- Photo de profil (côté gauche, pas centré)
- Stats en ligne avec la photo : Nombre de produits + Nombre d'abonnés (chiffres complets, ex: 133456)
- Nom de la boutique sous la photo (longueur ≈ diamètre de la photo)
- Bio avec "Voir plus" (2 premières lignes visibles)
- Localisation (Pays / Ville)
- 2 Boutons côte à côte :
  - **INVESTIR** : Chocolat border, icône billets → Redirige vers page investissement
  - **Mon numéro WhatsApp** : Vert, icône WhatsApp → Vérifie numéro
- **Grille Produits/Vidéos** :
  - Tabs : Produits / Vidéos
  - Sous-tabs : Récents / Anciens / Populaires
  - **Produits** : 2 colonnes
    - Photo, nom, prix, localisation, temps
    - Crayon vert (coin supérieur gauche) → Modification
    - Cœur + compteur likes (coin supérieur droit)
  - **Vidéos** : 2 colonnes, format 4:3
    - Thumbnail + Play button
    - Nom du produit associé
    - Crayon modification (coin gauche)
    - Compteur likes (coin droit)

---

### 2. Page "Modifier le Produit" (`/product/edit/[id]`)
✅ **Statut** : Implémentée

**Caractéristiques** :
- Header : "Modifier le produit" + flèche retour
- 2 grandes cartes côte à côte :
  1. **Modifier les Informations** (icône crayon)
  2. **Supprimer le Produit** (icône poubelle)

**Modal de Suppression** :
- Question : "Pourquoi souhaitez-vous supprimer votre produit ?"
- 4 choix (radio buttons) :
  1. Produit déjà vendu
  2. Produit en mauvais état
  3. Produit en rupture de Stock
  4. Autres raisons
- Bouton "Supprimer Définitivement le Produit"
- **Message d'alerte** (rouge, icône ATTENTION) :
  "ATTENTION : SI VOUS CLIQUEZ SUR SUPPRIMER LE PRODUIT, VOUS NE POURREZ PLUS RÉCUPÉRER CE PRODUIT À MOINS QUE VOUS NE LE REPUBLIEZ À NOUVEAU. CETTE ACTION EST IRRÉVERSIBLE"

---

## 🚧 Pages à Implémenter

### 3. Page "Formulaire de Modification" (`/product/edit/[id]/update`)
❌ **Statut** : À créer

**Caractéristiques** :
- Header : "Modifier le produit" + flèche retour
- **Formulaire identique au formulaire de publication** MAIS :
  - Tous les champs pré-remplis avec les données actuelles
  - Possibilité de modifier :
    - Catégorie
    - Nom du produit
    - Images (ajout/suppression)
    - Description
    - État (Neuf/Occasion)
    - Type de vente (Détails/Gros)
    - Prix et devise
    - Quantité/Poids (si gros)
    - Adresse de livraison (Pays, Ville, Adresse complète)
    - Vidéo marketing (ajout/suppression)
  - Bouton "ENREGISTRER LES MODIFICATIONS" (au lieu de "Publier")

---

### 4. Page "Investir" (`/invest`)
❌ **Statut** : À créer

**Caractéristiques** :
- Header : "INVESTIR DANS BELLES OFFRES" + flèche retour
- **Vidéo de présentation** (équipe de l'entreprise expliquant le concept)
  - Format paysage, player vidéo
  - Contrôles de lecture
- **Texte explicatif** sous la vidéo :
  - Titre : "Devenez Investisseur"
  - Description du concept d'investissement
  - Avantages (revenus publicitaires, rendements, etc.)
- **Section Contact** :
  - Cases à cocher (conditions d'investissement)
  - Bouton WhatsApp "CONTACTER L'ÉQUIPE"
  - Lien direct vers WhatsApp de l'équipe

---

### 5. Page "Paramètres" (`/settings`)
❌ **Statut** : À créer

**Caractéristiques** :
- Header : "Paramètres du profil" + flèche retour

**Sections (groupées par catégories)** :

#### A. Informations du Compte
- Nom
- Adresse E-mail
- Photo de profil
- Bio du compte
- Adresse de localisation (Pays / Ville)
- Modifier le numéro WhatsApp

#### B. Préférences
- **Thème** : Sombre / Claire (toggle)
- **Langue** : Anglais / Français (select)

#### C. Sécurité
- Modifier le mot de passe

#### D. Informations de l'Entreprise
- Nom de la boutique
- Logo
- Description de l'activité
- Coordonnées (téléphone, adresse)

#### E. Politique de Retour
- Règlements clairs sur les retours de produits

#### F. Support Client
- Réactivité aux questions
- Commentaires et avis
- **Bouton WhatsApp** : "CONTACTER LE SUPPORT"
- **Réseaux sociaux** (liens) :
  - TikTok
  - Instagram
  - YouTube
  - Twitter
  - LinkedIn
  - Pinterest
  - Facebook
  - Threads

---

### 6. Page "Boutique Visitée" (`/shop/[userId]`)
❌ **Statut** : À créer

**Caractéristiques** :
- Header : Nom de la boutique (au milieu) + flèche retour
- **PAS de roue de paramètres** (c'est la boutique d'un autre)
- Photo de profil (mêmes dimensions que Mon Profil)
- Stats : Nombre de produits + Nombre d'abonnés
- Nom de la boutique
- Bio / Description
- Localisation (Pays / Ville)

**2 Boutons (différents de Mon Profil)** :
1. **S'abonner / Suivre** (chocolat)
   - Après clic : "Abonné" (beige, border chocolat)
2. **Discuter sur WhatsApp** (vert WhatsApp)
   - Redirige vers WhatsApp du vendeur

**Grille Produits/Vidéos** :
- Identique à Mon Profil MAIS :
  - **PAS de crayons de modification** (pas le propriétaire)
  - Seulement les compteurs de likes visibles
- **Aucun bouton en bas de l'écran n'est allumé** (pas accessible via BottomNav)

---

### 7. Page "Produit Détaillé" (`/product/[id]`)
✅ **Statut** : Partiellement implémentée (à améliorer selon specs)

**Améliorations nécessaires** :

#### Header
- Texte : "Nom du produit"
- Flèche retour

#### Carrousel d'Images
- Format 1:1
- Swipe horizontal entre les images
- Indicateurs de position (dots)

#### Infos Produit
- **Nom du produit** (gauche, police droite, gras)
- **Prix + Devise** (droite, police droite, gras)
- **Catégorie** (icône + nom)
- **Description** :
  - Cadre border chocolat, fond blanc, texte noir
  - 5 premières lignes visibles
  - Bouton "Voir plus" (bleu) → Scroll vertical dans le cadre

#### Type de Vente
2 cases côte à côte :
1. "Vente en gros" OU "Vente en détail" (une seule visible selon le type)
2. Quantité ou Masse (selon le type de vente)
   - Si détail : Quantité = 1 (par défaut)
   - Si gros : Affiche la quantité ou masse sélectionnée

#### État du Produit
- 2 cases : "Neuf" / "Occasion"
- Une seule cochée

#### Adresse de Livraison
- Texte : "Adresse de livraison"
- 2 cases côte à côte : Pays / Ville
- En dessous : Cadre rectangulaire avec adresse complète (max 30 caractères)
  - Ex: "Commune KIMEMI, Q.BIONDI / Av.Beni"

#### Vendeur
- Photo de profil + Nom de la boutique (gauche, pas au centre)
- Nom souligné (cliquable → Page boutique)

#### Bouton WhatsApp
- **TRÈS IMPORTANT** : Long, bien encadré, au milieu
- Border vert (2mm), texte noir, fond beige
- Icône WhatsApp + "Discuter sur WhatsApp"
- Aucun bouton à côté

#### Vidéo du Produit
- Format 4:3
- Thumbnail avec play button au centre
- Coins arrondis
- Au clic : Page vidéo plein écran
  - Lecture automatique
  - Superposition sur la vidéo :
    - Photo de profil
    - Bouton like
    - Logo WhatsApp (discussion)
    - Bouton "VOIR L'ANNONCE" (en bas)
    - 1ère ligne description + "Voir plus"
  - À la fin : Pause + play button au centre
  - Flèche retour ou "VOIR L'ANNONCE" → Retour page produit

**Si pas de vidéo** :
- Message : "AUCUNE VIDÉO DISPONIBLE SUR CE PRODUIT"

#### Suggestions
- Titre : "Suggestions des Belles Offres"
- Ligne de 6 produits (swipe horizontal)
- 3 visibles à l'écran
- **Critères de sélection** :
  1. Même catégorie
  2. Mots-clés similaires (ex: "Chaussures", "Nike")
  3. Même localisation (Pays / Ville)
  4. Prix : pas d'importance
- **Ordre** : Du plus récent au plus ancien
- **Si pas assez de produits similaires** : Afficher produits de la même catégorie et ville

---

## 🎨 Design Global

### Grille de Produits (Partout dans l'app)
- **Format** : 2 colonnes, plusieurs lignes
- **Cadre** : Border chocolat (épaisse), fond beige léger
- **Contenu carte** :
  - Photo du produit
  - Nom
  - Prix + Devise
  - Adresse de livraison
  - Temps (heure ou jour)
  - Bouton favoris + compteur (coin supérieur droit)
- **Si propriétaire** :
  - Crayon vert (coin supérieur gauche) → Modification

### Couleurs
- **Chocolat** : #2B1700
- **Beige** : #F5F5DC
- **WhatsApp** : #25D366
- **Favoris** : #FF0000

---

## 📂 Structure des Fichiers

```
src/app/
├── profile/
│   └── page.tsx ✅
├── product/
│   ├── [id]/
│   │   └── page.tsx ✅ (à améliorer)
│   └── edit/
│       └── [id]/
│           ├── page.tsx ✅
│           └── update/
│               └── page.tsx ❌
├── shop/
│   └── [userId]/
│       └── page.tsx ❌
├── settings/
│   └── page.tsx ❌
├── invest/
│   └── page.tsx ❌
└── video/
    └── [id]/
        └── page.tsx ❌
```

---

## 🔄 Logique Importante

### Affichage Conditionnel
1. **Crayon de modification** : Visible SEULEMENT si l'utilisateur est le propriétaire
2. **Boutons profil** :
   - Mon Profil : "Investir" + "Mon WhatsApp"
   - Boutique visitée : "S'abonner" + "Discuter sur WhatsApp"
3. **BottomNav** :
   - Actif sur Mon Profil
   - Inactif sur Boutique visitée

### États du Profil
```typescript
interface Profile {
  isOwner: boolean; // true = Mon Profil, false = Boutique visitée
  shopName: string;
  bio: string;
  avatar: string;
  country: string;
  city: string;
  productsCount: number;
  subscribersCount: number; // Chiffre COMPLET (ex: 133456)
  whatsapp: string;
  isSubscribed?: boolean; // Pour boutiques visitées
}
```

---

## ✅ Checklist de Développement

### Pages Prioritaires
- [ ] Formulaire de modification (`/product/edit/[id]/update`)
- [ ] Page Paramètres (`/settings`)
- [ ] Page Boutique Visitée (`/shop/[userId]`)
- [ ] Améliorer Page Produit Détaillé (`/product/[id]`)
- [ ] Page Vidéo Plein Écran (`/video/[id]`)
- [ ] Page Investir (`/invest`)

### Composants Réutilisables
- [ ] ProductCard (grille 2 colonnes)
- [ ] VideoCard (format 4:3)
- [ ] StatsDisplay (produits + abonnés)
- [ ] ShopHeader (photo + nom + bio)
- [ ] DeleteModal (déjà créé ✅)

### Fonctionnalités
- [ ] Système de likes
- [ ] Système d'abonnement/suivi
- [ ] Upload/suppression images
- [ ] Upload/suppression vidéos
- [ ] Filtrage produits (récents/anciens/populaires)
- [ ] Suggestions intelligentes (même catégorie + localisation)
- [ ] Intégration WhatsApp
- [ ] Thème sombre/clair
- [ ] Multi-langue (FR/EN)

---

**Date de création** : 17 Février 2026  
**Version** : 1.0.0  
**Statut** : 📝 Documentation en cours
