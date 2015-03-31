(function() {
  "use strict";

  angular
    .module('translate', ['pascalprecht.translate', 'configuration'])
    .config(function($translateProvider, Configuration) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'services/translate/files/messages_',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage(Configuration.defaultLanguage);
      $translateProvider.fallbackLanguage('en');
      $translateProvider.useLocalStorage();
    });

})();
