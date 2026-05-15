# Volière Baay Pitàq

Application web **responsive** de gestion de volière (colombophilie), développée dans le cadre du **projet de validation DTS** (Bakeli). Elle couvre pigeons, couples, reproductions, cages, sorties du cheptel (vente / décès / perte) et une **visualisation virtuelle** des compartiments (grille type « places »).

> **État actuel** : front-end fonctionnel avec authentification **Firestore**, base de données **Firestore**, et upload d'images via **Cloudinary**. API complète et déploiement à finaliser pour la soutenance.

---

## Fonctionnalités principales

| Module | Description |
|--------|-------------|
| **Authentification** | Connexion démo (e-mail non vide accepté), session `sessionStorage`, routes protégées |
| **Pigeons** | Liste, fiche, création / édition (formulaires, sauvegarde), **upload d'images** (Firebase Storage) |
| **Couples** | Liste, détail, création, **rompre un couple** (simulation locale) |
| **Reproductions** | Suivi des pontes, jeunes bagués, lien vers **généalogie** |
| **Cages** | Liste (numéro, nom, superficie, occupation), création (maquette) |
| **Volière (grille)** | 20 cages — **vert** libre, **rouge** 1 pigeon, **orange** couple ; clic pour affecter / détail / libérer (état React, sans rechargement) |
| **Sorties cheptel** | Ventes, décès, pertes (données d’exemple, alignées sur le cahier DTS) |
| **Paramètres** | Affichage du profil fictif |

---

## Images des pigeons

L'application supporte l'upload de photos pour chaque pigeon, stockées dans **Cloudinary**.

### Fonctionnalités

- **Création** : Ajouter une image lors de l'enregistrement d'un nouveau pigeon  
- **Modification** : Remplacer la photo existante ou en conserver l'actuelle  
- **Affichage** : La photo s'affiche sur la fiche pigeon (vue détail)  
- **Aperçu** : Visualisation en temps réel avant validation  

### Spécifications

| Paramètre | Valeur |
|-----------|--------|
| **Formats acceptés** | JPEG, PNG, WebP, GIF |
| **Taille max** | 5 MB |
| **Stockage** | Cloudinary (CDN optimisé pour images) |
| **Sauvegarde** | URL de l'image dans le champ `imageUrl` du document Firestore |

### Utilisation

1. **Créer un pigeon** : Aller sur `Nouveau pigeon` → Sélectionner une image → Aperçu s'affiche → Enregistrer  
2. **Éditer un pigeon** : Modifier la fiche → Remplacer l'image ou conserver l'actuelle → Mise à jour  
3. **Consulter** : La photo apparaît en haut de la fiche pigeon si disponible  

---

## Stack technique

- **React** 19 + **Vite** 8  
- **React Router** 7  
- **Tailwind CSS** 4 (`@tailwindcss/vite`)  
- **Firebase** 11 (authentification, Firestore)  
- **Cloudinary** (upload et hosting d'images optimisées)  
- **react-icons**, **axios** (prévu pour l'API), **react-hot-toast**, **sweetalert2**, **framer-motion** (disponibles dans le projet)

---

## Prérequis

- **Node.js** 20+ (recommandé)  
- **npm** 10+

---

## Installation et commandes

```bash
# Cloner le dépôt puis, à la racine du projet :
npm install

# Serveur de développement (http://localhost:5173)
npm run dev

# Build de production (sortie dans dist/)
npm run build

# Prévisualiser le build localement
npm run preview

# Lint
npm run lint
```

---

## Connexion (démonstration)

1. Ouvrir `/login` (ou être redirigé automatiquement si non connecté).  
2. Saisir un **e-mail** quelconque non vide (mot de passe ignoré en démo).  
3. La session est stockée dans **`sessionStorage`** (`voliere_baay_pitaq_demo_user`).  
4. **Logout** dans la barre du haut déconnecte et renvoie vers `/login`.

---

## Arborescence utile

```
src/
  components/layout/   # Sidebar, Navbar, DashboardLayout, ProtectedRoute
  context/             # AuthContext (session démo)
  data/                # mockData.js — données fictives
  pages/               # Écrans par domaine (pigeons, couples, cages, etc.)
  routes/              # AppRoutes.jsx
```

---

## Auteur & contexte

Projet **Volière Baay Pitàq** — validation **DTS Développeur Web** (Bakeli School Of Technology, Dakar).

---

## Licence

Projet **privé** — usage dans le cadre de la formation / évaluation.
