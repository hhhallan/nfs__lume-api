# Lume API

## Description
Cette API est destinée à gérer les utilisateurs, les trottinettes, les locations et les détails de paiement pour un système de location de trottinettes.

## Routes

### Utilisateurs

- `GET /api/users` : Récupérer tous les utilisateurs.
- `GET /api/users/:id` : Récupérer un utilisateur par son ID.
- `POST /api/users` : Créer un nouvel utilisateur.
- `PUT /api/users/:id` : Mettre à jour un utilisateur.
- `DELETE /api/users/:id` : Supprimer un utilisateur.

### Trottinettes

- `GET /api/scooters` : Récupérer toutes les trottinettes.
- `GET /api/scooters/:id` : Récupérer une trottinette par son ID.
- `POST /api/scooters` : Créer une nouvelle trottinette.
- `PUT /api/scooters/:id` : Mettre à jour une trottinette.
- `DELETE /api/scooters/:id` : Supprimer une trottinette.

### Locations

- `GET /api/rentals` : Récupérer toutes les locations.
- `GET /api/rentals/:id` : Récupérer une location par son ID.
- `POST /api/rentals` : Créer une nouvelle location.
- `PUT /api/rentals/:id` : Mettre à jour une location.
- `DELETE /api/rentals/:id` : Supprimer une location.

### Détails de paiement

- `GET /api/payment-details` : Récupérer tous les détails de paiement.
- `GET /api/payment-details/:id` : Récupérer des détails de paiement par leur ID.
- `POST /api/payment-details` : Créer de nouveaux détails de paiement.
- `PUT /api/payment-details/:id` : Mettre à jour des détails de paiement.
- `DELETE /api/payment-details/:id` : Supprimer des détails de paiement.

## Installation

1. Clonez ce dépôt : `git clone https://github.com/votre-utilisateur/nom-de-votre-api.git`
2. Accédez au répertoire du projet : `cd nom-de-votre-api`
3. Installez les dépendances : `npm install`
4. Configurez les variables d'environnement :
    - Créez un fichier `.env`
    - Définissez les variables d'environnement requises, comme la configuration de la base de données et les clés secrètes
5. Lancez l'API : `npm start`

## Configuration

Assurez-vous de configurer correctement les variables d'environnement suivantes dans le fichier `.env` :

- `DB_HOST` : L'hôte de la base de données MySQL.
- `DB_PORT` : Le port de la base de données MySQL.
- `DB_NAME` : Le nom de la base de données MySQL.
- `DB_USER` : Le nom d'utilisateur de la base de données MySQL.
- `DB_PASSWORD` : Le mot de passe de la base de données MySQL.
- `PORT` : Le port sur lequel l'API sera en écoute (par défaut : 3000).
- Autres variables d'environnement spécifiques à votre application (clés d'API, etc.).

## Développé avec

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL

## Auteurs

- Allan Leblond - @hhhallan

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.