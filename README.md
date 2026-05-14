# Volière Baay Pitàq

Application web **responsive** de gestion de volière (colombophilie), développée dans le cadre du **projet de validation DTS** (Bakeli). Elle couvre pigeons, couples, reproductions, cages, sorties du cheptel (vente / décès / perte) et une **visualisation virtuelle** des compartiments (grille type « places »).

> **État actuel** : front-end fonctionnel avec **données fictives** (`src/data/mockData.js`) et authentification **démo**. Backend, base de données et déploiement sont à brancher pour la soutenance.

---

## Fonctionnalités principales

| Module | Description |
|--------|-------------|
| **Authentification** | Connexion démo (e-mail non vide accepté), session `sessionStorage`, routes protégées |
| **Pigeons** | Liste, fiche, création / édition (formulaires, sauvegarde désactivée sans API) |
| **Couples** | Liste, détail, création, **rompre un couple** (simulation locale) |
| **Reproductions** | Suivi des pontes, jeunes bagués, lien vers **généalogie** |
| **Cages** | Liste (numéro, nom, superficie, occupation), création (maquette) |
| **Volière (grille)** | 20 cages — **vert** libre, **rouge** 1 pigeon, **orange** couple ; clic pour affecter / détail / libérer (état React, sans rechargement) |
| **Sorties cheptel** | Ventes, décès, pertes (données d’exemple, alignées sur le cahier DTS) |
| **Paramètres** | Affichage du profil fictif |

---

## Stack technique

- **React** 19 + **Vite** 8  
- **React Router** 7  
- **Tailwind CSS** 4 (`@tailwindcss/vite`)  
- **react-icons**, **axios** (prévu pour l’API), **react-hot-toast**, **sweetalert2**, **framer-motion** (disponibles dans le projet)

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

## Prochaines étapes (livrables DTS)

- **API** + **base de données** (Laravel, Django, Node ou Firebase selon le cahier)  
- Remplacer `mockData.js` par des appels HTTP (ex. **axios**)  
- **MCD** et schéma de données conformes aux règles métier  
- **Déploiement** (URL publique pour la correction)  
- **README** à compléter avec l’URL de prod et les identifiants de test si besoin

---

## Auteur & contexte

Projet **Volière Baay Pitàq** — validation **DTS Développeur Web** (Bakeli School Of Technology, Dakar).

---

## Licence

Projet **privé** — usage dans le cadre de la formation / évaluation.
