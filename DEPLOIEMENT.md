# 🚀 Guide de déploiement - Site HIF Production

## Déployer gratuitement sur Vercel

Vercel est la plateforme officielle pour Next.js, avec un plan gratuit généreux !

### 📋 Prérequis

1. Un compte GitHub (gratuit)
2. Un compte Vercel (gratuit)

---

## Étape 1 : Préparer votre projet

### 1.1 - Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Site HIF Studio"
```

### 1.2 - Créer un repository sur GitHub

1. Allez sur https://github.com
2. Cliquez sur **"New repository"**
3. Nom : `hif-studio` (ou autre)
4. **Privé** ou **Public** (votre choix)
5. **Ne cochez rien** (pas de README, gitignore, etc.)
6. Cliquez sur **"Create repository"**

### 1.3 - Pousser votre code sur GitHub

```bash
git remote add origin https://github.com/VOTRE_USERNAME/hif-studio.git
git branch -M main
git push -u origin main
```

---

## Étape 2 : Déployer sur Vercel

### 2.1 - Créer un compte Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **"Sign Up"**
3. Connectez-vous avec votre compte **GitHub**

### 2.2 - Importer votre projet

1. Sur le dashboard Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez votre repository **hif-studio** (ou le nom que vous avez choisi)
3. Cliquez sur **"Import"**

### 2.3 - Configurer le projet

Vercel détecte automatiquement Next.js, mais vous devez configurer :

**Framework Preset** : Next.js (détecté automatiquement ✅)

**Environment Variables** : Ajoutez ces variables :

```
DATABASE_URL=file:./prod.db
NEXTAUTH_URL=https://votre-site.vercel.app
NEXTAUTH_SECRET=GENEREZ_UNE_CLE_SECURISEE_ICI
```

⚠️ **Important** : Générez une clé secrète sécurisée :

```bash
# Sur votre terminal local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiez le résultat et utilisez-le pour `NEXTAUTH_SECRET`

### 2.4 - Déployer !

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes ⏳
3. Votre site est en ligne ! 🎉

---

## Étape 3 : Configuration post-déploiement

### 3.1 - Initialiser la base de données

**Option 1 : Via l'administration**

1. Accédez à `https://votre-site.vercel.app/admin/login`
2. Créez un utilisateur via la console Vercel (voir ci-dessous)

**Option 2 : Utiliser une vraie base de données (Recommandé)**

SQLite ne fonctionne pas bien sur Vercel (système de fichiers éphémère).

**Solutions gratuites recommandées :**

#### A) **Neon** (PostgreSQL gratuit)

1. Créez un compte sur https://neon.tech (gratuit)
2. Créez une base de données
3. Copiez l'URL de connexion
4. Modifiez `prisma/schema.prisma` :

```prisma
datasource db {
  provider = "postgresql"  // Changez de sqlite à postgresql
  url      = env("DATABASE_URL")
}
```

5. Dans Vercel, mettez à jour `DATABASE_URL` avec l'URL Neon
6. Redéployez

#### B) **PlanetScale** (MySQL gratuit)

1. Créez un compte sur https://planetscale.com (gratuit)
2. Créez une base de données
3. Copiez l'URL de connexion
4. Modifiez `prisma/schema.prisma` :

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

5. Dans Vercel, mettez à jour `DATABASE_URL`
6. Redéployez

### 3.2 - Créer le premier utilisateur admin

Une fois la base de données configurée, vous devez créer un utilisateur :

**Via la console Vercel :**

1. Allez dans votre projet sur Vercel
2. Onglet **"Settings"** → **"Functions"**
3. Créez un script temporaire pour créer l'admin

**Ou connectez-vous à votre base de données directement**

---

## Étape 4 : Domaine personnalisé (Optionnel)

### 4.1 - Domaine Vercel gratuit

Par défaut : `votre-projet.vercel.app` ✅ Gratuit

### 4.2 - Votre propre domaine

1. Achetez un domaine (ex: chez Namecheap, OVH, etc.)
2. Dans Vercel, allez dans **"Settings"** → **"Domains"**
3. Ajoutez votre domaine
4. Suivez les instructions DNS

---

## 🔄 Mises à jour automatiques

**Avantage de Vercel :** Chaque fois que vous poussez du code sur GitHub, Vercel redéploie automatiquement ! 🚀

```bash
# Modifier votre code localement
git add .
git commit -m "Nouvelle fonctionnalité"
git push

# Vercel déploie automatiquement ! ✨
```

---

## 📊 Monitoring

Vercel offre gratuitement :
- ✅ Analytics
- ✅ Logs en temps réel
- ✅ Métriques de performance
- ✅ Preview deployments (pour tester avant production)

---

## 🆘 Dépannage

### Erreur : Base de données vide

→ Migrez vers PostgreSQL (Neon) ou MySQL (PlanetScale)

### Erreur 500

→ Vérifiez les logs dans Vercel Dashboard → "Functions" → "Logs"

### Variables d'environnement

→ Assurez-vous qu'elles sont bien définies dans Vercel Settings → Environment Variables

---

## 🎯 Alternatives gratuites

Si vous voulez essayer d'autres plateformes :

### Netlify
- Similaire à Vercel
- Bon pour les sites statiques
- https://netlify.com

### Railway
- Bon pour les bases de données
- Plan gratuit généreux
- https://railway.app

### Render
- Alternative complète
- PostgreSQL gratuit inclus
- https://render.com

---

## 💡 Recommandation finale

**Pour HIF Production, je recommande :**

1. **Hébergement** : Vercel (gratuit, parfait pour Next.js)
2. **Base de données** : Neon PostgreSQL (gratuit, 500 MB)
3. **Total** : 100% gratuit ! 🎉

---

**Besoin d'aide ?** Contactez le support Vercel ou consultez leur documentation : https://vercel.com/docs

---

**Développé avec ❤️ pour HIF Production**


