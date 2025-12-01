# 📸 Stockage des images en production

## ⚠️ Problème du stockage local

En production sur Vercel (ou autres plateformes serverless), le stockage local **ne fonctionne pas** :
- Les fichiers sont perdus à chaque redéploiement
- Le système de fichiers est éphémère
- Les images ne persistent pas

## ✅ Solution recommandée : Cloudinary

**Cloudinary** est un service gratuit et populaire qui :
- ✅ Stocke vos images dans le cloud
- ✅ Optimise automatiquement les images (compression, formats modernes)
- ✅ Offre un CDN pour un chargement rapide
- ✅ Gratuit jusqu'à 25GB de stockage et 25GB de bande passante/mois
- ✅ Transforme les images à la volée (redimensionnement, recadrage, etc.)

### Configuration Cloudinary (5 minutes)

#### 1. Créer un compte Cloudinary

1. Allez sur **https://cloudinary.com/users/register/free**
2. Inscrivez-vous (gratuit) avec votre email
3. Une fois connecté, vous verrez votre **Dashboard** avec les identifiants
4. **Important** : Copiez vos identifiants (ils apparaissent une seule fois !) :
   - **Cloud Name** (ex: `dxyz123`) - visible dans l'URL du dashboard
   - **API Key** (ex: `123456789012345`)
   - **API Secret** (ex: `abcdefghijklmnopqrstuvwxyz`)

   💡 **Astuce** : Si vous perdez l'API Secret, allez dans **Settings** → **Security** pour en créer un nouveau

#### 2. Installer Cloudinary

Le package est déjà installé ! Si besoin :

```bash
npm install cloudinary
```

#### 3. Configurer sur Vercel

1. Allez sur **https://vercel.com**
2. Ouvrez votre projet
3. **Settings** → **Environment Variables**
4. Ajoutez ces 3 variables :

```
CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret
```

5. Cochez **Production**, **Preview**, ET **Development**
6. Cliquez **Save**

#### 4. Redéployer

Redéployez votre site sur Vercel pour que les variables soient prises en compte.

---

## 🔄 Alternative : Vercel Blob Storage

Si vous préférez une solution 100% intégrée à Vercel :

### Avantages
- ✅ Intégré nativement à Vercel
- ✅ Pas de configuration externe
- ✅ 100GB de stockage gratuit sur le plan Pro (payant)

### Configuration

1. Installez le package :
```bash
npm install @vercel/blob
```

2. Créez un token dans Vercel : **Settings** → **Blob Storage** → **Create Token**

3. Ajoutez la variable d'environnement :
```
BLOB_READ_WRITE_TOKEN=votre-token-vercel
```

4. Le code sera légèrement différent (voir la documentation Vercel)

**Note** : Le plan gratuit de Vercel ne comprend pas le Blob Storage. Cloudinary est donc recommandé.

---

## 📊 Comparaison des solutions

| Solution | Gratuit | Stockage gratuit | CDN | Optimisation auto |
|----------|---------|------------------|-----|-------------------|
| **Cloudinary** | ✅ Oui | 25GB | ✅ Oui | ✅ Oui |
| **Vercel Blob** | ❌ Payant | 0GB (gratuit) | ✅ Oui | ❌ Non |
| **AWS S3** | ⚠️ Payant | 5GB (12 mois) | ✅ Oui | ❌ Non |
| **Uploadthing** | ✅ Oui | Limité | ✅ Oui | ❌ Non |

**Recommandation** : **Cloudinary** est la meilleure option gratuite.

---

## 🚀 Code déjà prêt !

Le code est déjà configuré pour utiliser Cloudinary automatiquement :
- Si `CLOUDINARY_CLOUD_NAME` est défini → utilise Cloudinary
- Sinon → utilise le stockage local (développement uniquement)

Pas besoin de changer votre workflow ! Les images uploadées en local fonctionneront, et en production avec Cloudinary configuré, elles seront automatiquement stockées dans le cloud.

---

**Besoin d'aide ?** Consultez la documentation Cloudinary : https://cloudinary.com/documentation

