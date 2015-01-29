/**
 * Created by Killian on 29/01/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('projects.create', {
          url: '/projects/create',
          templateUrl: 'app/projects/create/projects.create.html',
          controller: 'ProjectsCreateController as projectsCreate'
        });
    });

})();
