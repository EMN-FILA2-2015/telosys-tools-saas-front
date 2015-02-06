(function() {
  "use strict";

  var english_translation = {'MESSAGE' : 'Hello world'
  };

  var french_translation = {
    'MESSAGE' : 'Bonjour le monde'
  };

  angular
    .module('translate', ['pascalprecht.translate'])
    .config(function($translateProvider) {
      $translateProvider.translations('en', english_translation);
      $translateProvider.translations('fr', french_translation);
      $translateProvider.preferredLanguage('fr');
    });


})();
