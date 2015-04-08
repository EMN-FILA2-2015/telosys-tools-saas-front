/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('project.bundle', {
          templateUrl: 'app/project/bundle/bundle.html',
          controller: 'BundleController as bundle'
        });
    });

})();
