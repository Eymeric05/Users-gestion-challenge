
# Application de Gestion d'Utilisateurs

Une application web simple mais complète pour gérer des utilisateurs, construite avec Node.js et Express. C'est le genre de projet qu'on fait en cours pour comprendre les bases du développement web côté serveur.

## Ce que fait l'app

### Fonctionnalités principales

- **Page d'accueil** : Affiche la liste des utilisateurs existants
- **Page de détail** : Montre les infos d'un utilisateur en particulier
- **Page formulaire** : Permet d'ajouter un nouvel utilisateur
- **Navigation** : On peut passer d'une page à l'autre facilement

### Bonus ajoutés

- **Modifier** un utilisateur (nom et email)
- **Supprimer** un utilisateur (avec confirmation)
- **Sauvegarde** des données dans un fichier JSON
- **Page 404** quand on tape une URL qui n'existe pas
- **Validation** des données (côté client et serveur)

## Comment c'est organisé

```
fsd58-59-node-s3-accueil/
├── data/
│   └── users.json          # Fichier qui stocke nos utilisateurs
├── utils/
│   └── fileUtils.js        # Fonctions pour lire/écrire le fichier JSON
├── controllers/
│   └── userController.js   # Logique métier (ajouter, modifier, supprimer)
├── public/
│   ├── css/
│   │   └── style.css       # Tout le CSS au même endroit
│   └── js/
│       ├── app.js          # Fonctions utiles partout
│       ├── home.js         # JavaScript de la page d'accueil
│       └── formulaire.js   # JavaScript du formulaire
├── views/                  # Pages HTML
│   ├── home.html           # Page d'accueil
│   ├── formulaire.html     # Formulaire d'ajout
│   ├── user-detail.html    # Détails d'un utilisateur
│   └── not-found.html      # Page 404
├── index.js                # Serveur principal
├── package.json            # Dépendances et scripts
└── README.md               # Ce fichier
```

## Technologies utilisées

- **Node.js** : Pour faire tourner JavaScript côté serveur
- **Express.js** : Framework web qui simplifie la création d'API
- **HTML/CSS/JavaScript** : Pour l'interface utilisateur
- **JSON** : Pour stocker les données (plus simple qu'une vraie base de données)

## Installation et démarrage

### Prérequis

- Node.js installé sur votre machine (version 14 ou plus récente)
- npm (vient avec Node.js)

### Étapes

1. **Aller dans le dossier du projet**

   ```bash
   cd fsd58-59-node-s3-accueil
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Démarrer l'application**

   ```bash
   npm start
   ```

   Ou pour le développement (redémarre automatiquement) :

   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   - Aller sur `http://localhost:3000`
   - L'app devrait s'afficher !

## Comment utiliser l'app

### Navigation

- **Accueil** (`/`) : Voir tous les utilisateurs
- **Formulaire** (`/formulaire`) : Ajouter quelqu'un
- **Détail utilisateur** (`/user/123`) : Voir/modifier l'utilisateur avec l'ID 123

### Actions possibles

1. **Voir la liste** : Cliquer sur un utilisateur pour voir ses détails
2. **Ajouter** : Remplir le formulaire avec nom et email
3. **Modifier** : Utiliser le bouton "Modifier" sur la page de détail
4. **Supprimer** : Confirmer la suppression (attention, c'est définitif !)

### Rôles

- Tous les nouveaux utilisateurs sont créés avec le rôle "utilisateur"
- Les rôles existants (admin, modérateur) sont gardés

## API (pour les développeurs)

### GET `/api/users`

Récupère la liste de tous les utilisateurs

### GET `/api/users/:id`

Récupère un utilisateur spécifique

### POST `/api/users`

Crée un nouvel utilisateur

```json
{
  "nom": "Jean Dupont",
  "email": "jean.dupont@email.com"
}
```

### PUT `/api/users/:id`

Modifie un utilisateur existant

```json
{
  "nom": "Jean Martin",
  "email": "jean.martin@email.com"
}
```

### DELETE `/api/users/:id`

Supprime un utilisateur

## Interface utilisateur

### Design

- Interface moderne avec des dégradés et des animations
- S'adapte aux écrans mobiles
- Navigation intuitive

### Validation

- Vérifie que les champs sont remplis
- Valide le format des emails
- Messages d'erreur clairs

### Feedback

- Messages de succès/erreur
- Confirmations pour les actions importantes
- Indicateurs de chargement

## Gestion des erreurs

### Erreurs 404

- Page personnalisée quand on tape une URL inexistante
- Boutons pour revenir aux pages principales

### Validation

- Vérification côté client ET serveur
- Messages d'erreur explicites
- Protection contre les doublons d'email

### Gestion des exceptions

- Logs d'erreur détaillés
- Réponses HTTP appropriées
- L'app ne plante pas en cas d'erreur

## Sécurité

### Validation des entrées

- Nettoyage des données utilisateur
- Vérification des types et formats
- Protection basique contre les injections

### Gestion des erreurs

- Messages d'erreur génériques en production
- Logs détaillés pour le débogage
- Pas d'exposition d'infos sensibles

## Structure des données

### Format d'un utilisateur

```json
{
  "id": 1,
  "nom": "Jean Dupont",
  "email": "jean.dupont@email.com",
  "role": "utilisateur"
}
```

### Rôles disponibles

- **admin** : Administrateur système
- **modérateur** : Modérateur de contenu
- **utilisateur** : Utilisateur standard

## Déploiement

### Variables d'environnement

- `PORT` : Port du serveur (défaut: 3000)
- `NODE_ENV` : Environnement (development/production)

### En production

```bash
NODE_ENV=production npm start
```

## Améliorations possibles

### Idées pour la suite

- Authentification et autorisation
- Base de données (MongoDB, PostgreSQL)
- Tests automatisés
- Interface d'administration
- Export/import des données

### Standards de code

- Code commenté et documenté
- Architecture MVC respectée
- Gestion d'erreurs robuste
- Interface utilisateur intuitive
