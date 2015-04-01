/**
 * Created by Killian on 29/01/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['Restangular', 'Logger'];

  /* @ngInject */
  function ProjectService(Restangular, Logger) {

    var logger = Logger.getInstance('ProjectService');
    var service = Restangular.service('projects');

    return {
      get: get,
      getList: getList,
      create: create
    };

    //////////////////////

    function get(id) {
      logger.debug('call the get /projects/id service');
      return service.one(id).get()
        .then(function(data) {
          return data;
        })
        .catch(function(error) {
          logger.error('get','Error during the get /projects/id call',error);
          throw error;
        });
    }

    function getList() {
      logger.debug('call the get /projects service');
      return service.getList()
        .then(function(data) {
          return data;
        })
        .catch(function(error) {
          logger.error('getList','Error during the get /projects call',error);
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
