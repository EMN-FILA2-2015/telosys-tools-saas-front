/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('project.generation', {
          templateUrl: 'app/project/generation/generation.html',
          controller: 'GenerationController as generation'
        });
    });

})();
