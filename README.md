# HIF Studio - Site de Cinématographie

Site web élégant et minimaliste pour le studio de cinématographie HIF, avec des tons noirs et violets.

## 🎬 Fonctionnalités

- **Page d'accueil** : Film en vedette avec lecture automatique au survol
- **Page Films** : Liste complète des films avec filtrage par catégories
- **Pages de détails** : Page dédiée pour chaque film avec lecteur YouTube intégré
- **Administration sécurisée** : Interface CRUD complète pour gérer films et catégories
- **Système de vedette** : Définir facilement quel film mettre en avant
- **Design responsive** : Interface adaptée à tous les écrans

## 🛠️ Technologies

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Base de données** : SQLite avec Prisma ORM
- **Authentification** : NextAuth.js
- **Styling** : Tailwind CSS
- **Vidéos** : React Player (YouTube)
- **Icons** : Lucide React

## 🚀 Installation

### Prérequis

- Node.js 18+ installé
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**

```bash
npm install
```

2. **Initialiser la base de données**

```bash
npx prisma generate
npx prisma db push
```

3. **Peupler la base de données avec des données d'exemple**

```bash
npx tsx prisma/seed.ts
```

4. **Lancer le serveur de développement**

```bash
npm run dev
```

5. **Ouvrir le site**

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🔐 Accès Administration

Pour accéder à l'interface d'administration :

- **URL** : http://localhost:3000/admin/login
- **Email** : admin@hif-studio.com
- **Mot de passe** : admin123

⚠️ **Important** : Changez ces identifiants en production !

## 📁 Structure du projet

```
├── app/                      # Pages Next.js (App Router)
│   ├── page.tsx             # Page d'accueil
│   ├── films/               # Pages des films
│   │   ├── page.tsx         # Liste des films
│   │   └── [slug]/          # Détail d'un film
│   ├── admin/               # Interface d'administration
│   │   ├── login/           # Page de connexion
│   │   └── dashboard/       # Dashboard admin
│   └── api/                 # Routes API
│       ├── auth/            # API NextAuth
│       ├── films/           # CRUD films
│       └── categories/      # CRUD catégories
├── components/              # Composants React
│   ├── Header.tsx           # En-tête du site
│   ├── FeaturedFilm.tsx     # Film en vedette
│   ├── FilmCard.tsx         # Carte de film
│   ├── FilmGrid.tsx         # Grille de films avec filtres
│   └── admin/               # Composants admin
├── lib/                     # Utilitaires
│   ├── prisma.ts           # Client Prisma
│   ├── auth.ts             # Configuration NextAuth
│   └── utils.ts            # Fonctions utilitaires
├── prisma/                  # Configuration base de données
│   ├── schema.prisma       # Schéma de la base
│   └── seed.ts             # Script de peuplement
└── public/                  # Fichiers statiques
```

## 🎨 Guide d'utilisation

### Ajouter un film

1. Connectez-vous à l'administration
2. Cliquez sur "Nouveau film"
3. Remplissez les informations :
   - Titre du film
   - Description (optionnel)
   - URL YouTube
   - Catégorie (optionnel)
   - Cochez "Film en vedette" si vous voulez le mettre en avant
4. Cliquez sur "Enregistrer"

### Gérer les catégories

1. Dans l'administration, cliquez sur l'onglet "Catégories"
2. Créez, modifiez ou supprimez des catégories
3. Les catégories sont utilisées pour filtrer les films

### Définir un film en vedette

- Un seul film peut être en vedette à la fois
- Cochez simplement "Film en vedette" lors de la création/modification
- L'ancien film vedette sera automatiquement retiré

## 🎥 Formats vidéo supportés

Le site utilise YouTube pour l'hébergement des vidéos. Formats d'URL acceptés :

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## 🔒 Sécurité

- Les mots de passe sont hashés avec bcrypt
- L'authentification est gérée par NextAuth.js
- Les routes API sont protégées par session
- Seuls les utilisateurs authentifiés peuvent modifier le contenu

## 📝 Configuration

### Variables d'environnement

Le fichier `.env` contient :

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-key"
```

### Personnalisation du design

Les couleurs principales sont définies dans `tailwind.config.js` :

```js
colors: {
  primary: {
    // Tons violets personnalisables
    500: '#a855f7',
    600: '#9333ea',
    // ...
  }
}
```

## 🚢 Déploiement

### Production

1. Modifier les variables d'environnement pour la production
2. Changer la base de données SQLite par PostgreSQL/MySQL si nécessaire
3. Build du projet :

```bash
npm run build
npm start
```

### Recommandations

- Utiliser une base de données PostgreSQL pour la production
- Configurer un système de backup régulier
- Changer les identifiants admin par défaut
- Utiliser des variables d'environnement sécurisées

## 📄 Licence

Ce projet est créé pour le studio HIF.

## 🆘 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Développé avec ❤️ pour HIF Studio**

