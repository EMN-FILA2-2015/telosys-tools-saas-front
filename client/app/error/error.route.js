/**
 * Created by Killian on 17/04/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('error', {
          url: '/error',
          params: {
            'code' : null,
            'text' : null
          },
          templateUrl: 'app/error/error.html',
          controller: 'ErrorController as error'
        });
    });

})();
