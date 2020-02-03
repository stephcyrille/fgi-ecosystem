## FGI ECosystem

Application de d'archivage FGI réalisé avec :

- [Laravel 6](https://laravel.com/docs).
- [Node Js 12.14](https://nodejs.org/en/).
- [ReactJs](https://fr.reactjs.org/).


### Prérequis

Le travail sur ce projet nécéssite des connaissances de base en developement 
- HTML, CSS, JS, Bootstraps 
- PHP
- SQL ou ORM
- Connaissance de git et CLI git 


### Installation

Le système nécécite l'installation d'un ensembles de programes et librairies parmis les quelles on aura : PHP v7.3... Laravel 6, Node Js, un SGBD de son choix peut importe (MySQL, Postgres, Maria DB...). Aussi Git pour le versionning et la collaboration sur le projet.


### PHP et SGBD

En général, PHP, Maria DB ou MySQL vienent avec WAMP serveur ou XAMP serveur, donc faudrait juste mettre PHP en variable d'environement.


### Laravel 6

Laravel est un Framework PHP qui a besoin de PHP, PHP 7.3.. pour la version 6 que nous allons utiliser dans notre projet. Mais aussi de [Composer](https://getcomposer.org/). Composer est un gestionnaire de dépendance ou de librairies PHP, donc nécéssite l'installation préalable de PHP et l'ajout de ce programme en variable d'environement pour fonctionner.
Une fois composer installer vous pouvez passer à la récupération du code source du projet dans le repertoire.




## Mise en place du projet

    1. Cloner le projet 
    git clone https://github.com/stephcyrille/fgi-ecosystem.git

    2. Téléchargement des dépendances php 
    composer install

    3. Téléchargement des dépendances Javascript 
    npm install

    4. Lancement de Laravel  (BACKEND)
    php artisant migrate
    php artisan passport:install
    php artisan serve

    4. Lancement de React (FRONTEND)
    npm run dev

### Remarque: 

**Créer votre base de donnée, car les migrations correspondent à la création des tables de la base de données, action qui ne saurait s'exécuter seulement lorsqu'une base de données est présente** 

Avant de lancer toutes les commandes, ouvrez le fichier .env et configurez le comme suit: <br />
    DB_CONNECTION=pgsql     // Correspont à mon connecteur de base de données (Dans mon cas c'est Postgres, ceux qui ont MySQL ce sera mysql)<br />
    DB_PORT=5432            // Correspond au port du SGBD (Dans mon cas c'est celui de Postgres pour MySql c'est 3306 pour Maria DB c'est 3307)<br />
    DB_DATABASE=fgidb       // Nom de la Base de données<br />
    DB_USERNAME=fgidb       // Nom de l'utilisateur de la base de données<br />
    DB_PASSWORD=fgidb       // Mot de passe de l'utilisateur de la Base de données <br />
