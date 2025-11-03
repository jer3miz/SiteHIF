# 🔧 Configuration Vercel - Variables d'environnement

## Variables à configurer sur Vercel

Allez dans votre projet Vercel → **Settings** → **Environment Variables**

Ajoutez ces 3 variables :

### 1. DATABASE_URL
```
postgresql://neondb_owner:npg_gLBJ8yFczG5j@ep-holy-shadow-ag45bd2l-pooler.c-2.eu-central-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

### 2. NEXTAUTH_URL
```
https://votre-nom-de-projet.vercel.app
```
⚠️ Remplacez par votre URL Vercel réelle

### 3. NEXTAUTH_SECRET
```
rbXl5fbbfRS89KRzOihtSYVmFFGZqA6i+poh5ouZD0k=
```

## 📝 Étape par étape

1. Connectez-vous à https://vercel.com
2. Sélectionnez votre projet **SiteHIF**
3. Allez dans **Settings** (⚙️ en haut à droite)
4. Cliquez sur **Environment Variables** dans le menu de gauche
5. Ajoutez les 3 variables ci-dessus
6. **Important** : Cochez **Production**, **Preview**, ET **Development**
7. Cliquez sur **Save**
8. Retournez dans **Deployments**
9. Cliquez sur **⋮** (trois points) sur le dernier déploiement
10. Cliquez sur **Redeploy**

## ✅ Vérification

Après le redéploiement, vérifiez :
- Le site charge sans erreur 500
- La page d'accueil s'affiche
- `/admin/login` fonctionne
- Connexion avec `admin@hif-studio.com` / `admin123`

## 🐛 Si erreur

Vérifiez les logs :
1. Dans **Deployments** → cliquez sur le dernier déploiement
2. Cliquez sur **Functions** ou **Runtime Logs**
3. Voir les erreurs détaillées

