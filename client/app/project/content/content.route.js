/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('project.content', {
          templateUrl: 'app/project/content/content.html',
          controller: 'ContentController as content'
        });
    });

})();
