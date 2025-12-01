# 🚀 Guide d'installation HIF Production

## Installation rapide

Suivez ces étapes pour installer et lancer le site web de HIF Production :

### 1. Installer les dépendances

```bash
npm install
```

Cette commande va :
- Installer tous les packages nécessaires
- Générer automatiquement le client Prisma

### 2. Configurer la base de données

```bash
npm run db:setup
```

Cette commande va :
- Créer la base de données SQLite
- Appliquer le schéma
- Ajouter des données d'exemple (films et catégories)
- Créer un compte administrateur

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur : **http://localhost:3000**

---

## 🔐 Identifiants par défaut

### Accès administration

- **URL** : http://localhost:3000/admin/login
- **Email** : `admin@hif-studio.com`
- **Mot de passe** : `admin123`

⚠️ **IMPORTANT** : Changez ces identifiants en production !

---

## 📋 Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer le serveur de développement |
| `npm run build` | Créer un build de production |
| `npm start` | Lancer le serveur de production |
| `npm run db:push` | Appliquer le schéma à la base de données |
| `npm run db:seed` | Peupler la base avec des données d'exemple |
| `npm run db:setup` | Configuration complète (push + seed) |

---

## 🎬 Premiers pas

### 1. Accéder au site

Ouvrez http://localhost:3000 dans votre navigateur.

### 2. Explorer le site public

- **Page d'accueil** : Découvrez le film en vedette (survol pour lecture automatique)
- **Page Films** : Parcourez tous les films et filtrez par catégories
- **Cliquez sur un film** : Accédez à sa page de détails avec le lecteur YouTube

### 3. Accéder à l'administration

1. Cliquez sur "Admin" dans le menu
2. Connectez-vous avec les identifiants ci-dessus
3. Vous arrivez sur le dashboard d'administration

### 4. Gérer les films

Dans l'administration :
- **Ajouter un film** : Cliquez sur "Nouveau film"
  - Entrez le titre
  - Ajoutez une description
  - Collez l'URL YouTube
  - Sélectionnez une catégorie
  - Cochez "Film en vedette" pour le mettre en avant
- **Modifier un film** : Cliquez sur l'icône crayon
- **Supprimer un film** : Cliquez sur l'icône corbeille

### 5. Gérer les catégories

1. Cliquez sur l'onglet "Catégories"
2. Créez de nouvelles catégories (ex: "Publicité", "Film d'entreprise", etc.)
3. Modifiez ou supprimez les catégories existantes

---

## ⚙️ Configuration avancée

### Changer les couleurs

Éditez `tailwind.config.js` pour personnaliser les tons violets :

```js
colors: {
  primary: {
    500: '#a855f7',  // Violet principal
    600: '#9333ea',  // Violet foncé
    // ...
  }
}
```

### URLs YouTube supportées

Le site accepte ces formats d'URL YouTube :
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

### Base de données

Par défaut, le projet utilise SQLite (fichier `prisma/dev.db`).

Pour utiliser PostgreSQL ou MySQL en production, modifiez `prisma/schema.prisma` :

```prisma
datasource db {
  provider = "postgresql"  // ou "mysql"
  url      = env("DATABASE_URL")
}
```

---

## 🐛 Dépannage

### Erreur lors de l'installation

Si `npm install` échoue :
1. Vérifiez que Node.js 18+ est installé : `node --version`
2. Supprimez `node_modules` et `package-lock.json`
3. Réessayez : `npm install`

### La base de données ne se crée pas

```bash
# Réinitialiser complètement
rm -rf prisma/dev.db prisma/dev.db-journal
npm run db:setup
```

### Le serveur ne démarre pas

1. Vérifiez que le port 3000 est disponible
2. Ou changez le port : `npm run dev -- -p 3001`

### Les vidéos YouTube ne s'affichent pas

1. Vérifiez que l'URL YouTube est correcte
2. Assurez-vous que la vidéo n'est pas privée
3. Certaines vidéos peuvent bloquer l'intégration

---

## 📦 Production

Pour déployer en production :

1. **Modifier les variables d'environnement**

Créez un fichier `.env.production` :

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_URL="https://votre-domaine.com"
NEXTAUTH_SECRET="votre-secret-securise-aleatoire"
```

2. **Créer le build**

```bash
npm run build
```

3. **Lancer en production**

```bash
npm start
```

4. **Ou déployer sur Vercel**

Le projet est prêt pour Vercel :
```bash
vercel deploy
```

---

## 💡 Conseils

- **Sauvegardez régulièrement** la base de données
- **Changez les identifiants admin** avant la mise en production
- **Utilisez PostgreSQL** en production pour de meilleures performances
- **Testez les URLs YouTube** avant de publier un film

---

## 🆘 Besoin d'aide ?

Consultez le `README.md` pour plus de détails sur l'architecture et les fonctionnalités.

---

**Bon développement ! 🎬**

