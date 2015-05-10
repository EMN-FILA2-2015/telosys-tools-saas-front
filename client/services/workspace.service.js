/**
 * Created by Adrian on 10/05/2015
 */
(function () {
    'use strict';

    angular
        .module('telosysToolsSaasFrontApp')
        .factory('WorkspaceService', WorkspaceService);

    WorkspaceService.$inject = ['Restangular', 'Logger'];
    // look for parameter passing the id ?
    /* @ngInject */
    function WorkspaceService(Restangular, Logger) {
        var service = Restangular.service('projects');
        var logger = Logger.getInstance("WorkspaceService");

        return {
          get: get,
          createFolder: createFolder,
          createFile: createFile,
          getFile: getFileContent
        };

        ////////////////

      function get(id) {
        logger.debug('call the get /projects/id/workspace service');
        return service.one(id).one('workspace').get()
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.error('get', 'Error during the get /projects/id/workspace call', error);
          });
      }

      function createFolder(id, path) {
        logger.debug('call post /projects/id/workspace/folder service');
        return service.one(id).one('workspace/folders').doPOST({"path": path})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.error('createFolder', 'Error during post /projects/id/workspace/folders service', error);
          });
      }

      function createFile(id, path) {
        logger.debug('call post /projects/id/workspace/files service');
        return service.one(id).one('workspace/files').doPOST({"path":path})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.error('createFile', 'Error during post /projects/id/workspace/files service', error);
          });
      }

      function getFileContent(id, path) {
        logger.debug('call get /projects/id/workspace/files service');
        return service.one('files').doGET({"path": path})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.error('getFileContent', 'Error during get /projects/id/workspace/files service', error);
          });
      }

    }
})();
