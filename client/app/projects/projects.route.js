/**
 * Created by Killian on 05/02/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('projects', {
          url: '/projects',
          templateUrl: 'app/projects/projects.html',
          controller: 'ProjectsController as projects'
        });
    });

})();
