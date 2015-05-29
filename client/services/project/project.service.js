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
    var service = Restangular.service('api/projects');

    return {
      get: get,
      getList: getList,
      create: create,
      getConfig: getConfig,
      setConfig: setConfig
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

    function getConfig(id) {
      logger.debug('call the get /projects/id/config/telosystoolscfg service');
      return service.one(id).one('config').one('telosystoolscfg').get()
        .then(function(data) {
          var config = {
            'folders' : data.folders,
            'packages' : data.packages,
            'variables' : data.variables
          };
          return config;
        })
        .catch(function(error) {
          logger.error('getConfig','Error during the get /project/id/config/telosystoolscfg service');
          throw error;
        })
    }

    function setConfig(id, config) {
      logger.debug('call the set /projects/id/config/telosystoolscfg service');
      return service.one(id).one('config').one('telosystoolscfg').customPOST(config)
        .then(function(data) {
          // Rien à faire
        })
        .catch(function(error) {
          logger.error('setConfig','Error during the post /projects/id/config/telosystoolscfg service');
          throw error;
        })
    }

  }

})();
