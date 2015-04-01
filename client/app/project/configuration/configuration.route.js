/**
 * Created by Killian on 01/04/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('project.configuration', {
          url: '/projects/{projectId}/configuration',
          templateUrl: 'app/project/configuration/configuration.html',
          controller: 'ConfigurationController as configuration'
        });
    });

})();
