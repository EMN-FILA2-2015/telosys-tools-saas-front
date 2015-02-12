(function() {
  "use strict";

  var english_translation = {
    'MESSAGE' : 'Hello world',
    'HOME_MESSAGE' : 'Kick-start your next web app with TelosysTools',
    'HOME' : 'Home',
    'CREATE' : 'Create a project'
  };

  var french_translation = {
    'MESSAGE' : 'Bonjour le monde',
    'HOME_MESSAGE' : 'Démarrez votre prochaine application web avec TelosysTools',
    'HOME' : 'Accueil',
    'CREATE' : 'Créer un projet'
  };

  angular
    .module('translate', ['pascalprecht.translate'])
    .config(function($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'components/i18n/messages_',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage('fr');
      $translateProvider.fallbackLanguage('fr');
      $translateProvider.useLocalStorage();
    });


})();
