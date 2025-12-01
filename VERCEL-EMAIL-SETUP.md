# 📧 Configuration Email sur Vercel - IMPORTANT

## ⚠️ Avant de déployer en production

Pour que le formulaire de contact envoie vraiment des emails, vous DEVEZ configurer Resend sur Vercel.

## 🚀 Configuration rapide (5 minutes)

### 1. Créer un compte Resend (gratuit)

1. Allez sur **https://resend.com**
2. Cliquez sur **"Sign Up"** (gratuit)
3. Connectez-vous avec votre email
4. Créez une **API Key** dans le dashboard

### 2. Ajouter la clé sur Vercel

1. Allez sur **https://vercel.com**
2. Ouvrez votre projet **SiteHIF**
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez ces 2 variables :

```
RESEND_API_KEY = re_votre_cle_api_resend
FROM_EMAIL = contact@hifproduction.com
```

5. **IMPORTANT** : Cochez **Production**, **Preview**, ET **Development**
6. Cliquez sur **Save**

### 3. Redéployer

1. Retournez dans **Deployments**
2. Cliquez sur **⋮** (trois points) du dernier déploiement
3. Cliquez sur **Redeploy**

## ✅ Vérification

Après le redéploiement :
- Testez le formulaire de contact sur votre site Vercel
- Vérifiez que l'email arrive sur **contact@hifproduction.com**

## 📝 Notes importantes

- **Sans la clé API** : Le formulaire fonctionne mais les emails ne sont PAS envoyés
- **Avec la clé API** : Les emails sont envoyés automatiquement à contact@hifproduction.com
- Resend offre **100 emails/jour gratuitement**

## 🔧 Si vous avez déjà un compte Resend

1. Connectez-vous à https://resend.com
2. Allez dans **API Keys**
3. Créez une nouvelle clé ou copiez une existante
4. Ajoutez-la sur Vercel comme indiqué ci-dessus

---

**⚠️ Ne déployez pas sans configurer Resend si vous voulez que les emails fonctionnent !**

