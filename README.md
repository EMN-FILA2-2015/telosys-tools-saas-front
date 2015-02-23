# telosys-tools-saas-front
Telosys Tools as a Service - Front

## Pré-requis

Il est nécessaire d'installer les éléments suivants :
* ```node.js``` : [Download](http://nodejs.org/download/)
* ```ruby``` : [Download](https://www.ruby-lang.org/fr/downloads/) en version 1.x ou 2.x

Exécuter les commandes suivantes :
* installation de grunt, bower et yeoman :
```npm install -g yo bower grunt-cli ```
* installation de sass :
```gem install sass```

## Commandes

Les commandes sont à saisir en ligne de commandes :

### Installer le front
```npm install```

```bower install```

### Démarrer le serveur du front
```grunt serve```

### Lancer les tests 
```grunt test```

### Packaging final
```grunt build```

Les fichiers du packaging final sont dans : ```/dist/client```
