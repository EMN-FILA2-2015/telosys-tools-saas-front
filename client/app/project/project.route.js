/**
 * Created by Adrian on 01/04/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('project', {
          url: '/projects/{projectId}',
          templateUrl: 'app/project/project.html',
          controller: 'ProjectController as project'
        });
    });

})();
