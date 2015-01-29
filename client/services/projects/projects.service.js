/**
 * Created by Killian on 29/01/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['Restangular', 'Logger'];

  /* @ngInject */
  function ProjectsService(Restangular, Logger) {

    var logger = Logger.getInstance('ProjectsService');
    var service = Restangular.service('hello');

    return {

    };

    //////////////////////

  }

})();
