# 🚀 Déploiement Rapide - 5 minutes chrono !

## Méthode la plus simple : Vercel

### 1️⃣ Préparer le code (30 secondes)

```bash
git init
git add .
git commit -m "Site HIF Studio prêt"
```

### 2️⃣ GitHub (1 minute)

1. Créez un compte sur https://github.com (si nécessaire)
2. Nouveau repository : https://github.com/new
3. Nommez-le `hif-studio`
4. Cliquez "Create repository"

```bash
git remote add origin https://github.com/VOTRE_USERNAME/hif-studio.git
git branch -M main
git push -u origin main
```

### 3️⃣ Vercel (2 minutes)

1. **Compte** : https://vercel.com → Sign up avec GitHub
2. **Import** : Cliquez "Add New" → "Project"
3. **Sélectionnez** votre repo `hif-studio`
4. **Variables d'environnement** (Important !) :
   
   Ajoutez ces 3 variables :
   ```
   NEXTAUTH_URL=https://VOTRE_PROJET.vercel.app
   NEXTAUTH_SECRET=votre-cle-secrete-longue-et-aleatoire
   DATABASE_URL=file:./prod.db
   ```
   
   💡 Pour générer `NEXTAUTH_SECRET` :
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Deploy** : Cliquez le bouton !

### 4️⃣ C'est en ligne ! 🎉

Votre site est accessible sur : `https://votre-projet.vercel.app`

---

## ⚠️ Important : Base de données

SQLite ne fonctionne pas sur Vercel (fichiers temporaires).

### Solution recommandée : Neon (PostgreSQL gratuit)

**En 2 minutes :**

1. Créez un compte : https://neon.tech
2. Créez une nouvelle base de données
3. Copiez l'URL de connexion (ressemble à : `postgresql://...`)
4. Dans Vercel :
   - Settings → Environment Variables
   - Modifiez `DATABASE_URL` avec l'URL Neon
   - Cliquez "Redeploy"

**Modifiez `prisma/schema.prisma` :**

```prisma
datasource db {
  provider = "postgresql"  // Changez "sqlite" en "postgresql"
  url      = env("DATABASE_URL")
}
```

**Poussez les changements :**

```bash
git add .
git commit -m "Migration vers PostgreSQL"
git push
```

Vercel redéploie automatiquement ! ✨

---

## 🎯 Checklist finale

- ✅ Code sur GitHub
- ✅ Déployé sur Vercel
- ✅ Base de données configurée (Neon)
- ✅ Variables d'environnement définies
- ✅ Site accessible en ligne

---

## 🔄 Mises à jour

Pour mettre à jour votre site :

```bash
# Modifiez votre code
git add .
git commit -m "Nouvelle fonctionnalité"
git push
# Vercel déploie automatiquement !
```

---

## 💰 Coût total

**0€ / mois** avec :
- Vercel (gratuit, illimité)
- Neon PostgreSQL (gratuit, 500 MB)
- GitHub (gratuit)

---

**C'est tout ! Votre site HIF est maintenant en ligne ! 🎬**

