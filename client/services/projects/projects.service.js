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
    var service = Restangular.service('projects');

    return {
      getList: getList,
      create: create
    };

    //////////////////////

    function getList() {
      logger.debug('call the get /projects service');
      return service.getList()
        .then(function(data) {
          return data;
        })
        .catch(function(error) {
          logger.error('getList',"Error during the get /projects call",error);
          throw error;
        });
    }

    function create(name) {
      logger.debug('call the post /projects service')
      return service.post({"name" : name})
        .then(function(data) {
          return data;
        })
        .catch(function(error) {
          logger.error('create','Error during the post /projects call',error);
          throw error;
        })
    }

  }

})();
