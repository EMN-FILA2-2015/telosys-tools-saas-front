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
        var service = Restangular.service('api/projects');
        var logger = Logger.getInstance("WorkspaceService");

        return {
          get: get,
          createFolder: createFolder,
          createFile: createFile,
          getFile: getFileContent,
          updateFile: updateFileContent,
          deleteFile: deleteFile,
          renameFile: renameFile,
          renameFolder: renameFolder,
          deleteFolder: deleteFolder
        };

        ////////////////

      function get(id) {
        logger.debug('call the get /projects/id/workspace service');
        return service.one(id).one('workspace').get()
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('get', 'Error during the get /projects/id/workspace call', error);
            throw error;
          });
      }

      function createFolder(id, path) {
        logger.debug('call post /projects/id/workspace/folder service');
        return service.one(id).one('workspace/folders').doPOST({"path": path})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('createFolder', 'Error during post /projects/id/workspace/folders service', error);
            throw error;
          });
      }

      function renameFolder(id, path, newName) {
        logger.debug('call the patch /projects/id/workspace/folders service');
        return service.one(id).one('workspace/folders').patch({"path": path, "name": newName})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('rename', 'Error during the patch /projects/id/workspace/folders call', error);
          })
      }

      function deleteFolder(id, path) {
        logger.debug('call the delete /projects/id/workspace/folders service');
        return service.one(id).one('workspace').doDELETE("folders",{"path" : path})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('delete', 'Error during the delete /projects/id/workspace/folders call', error);
          })
      }

      function createFile(id, path) {
        logger.debug('call post /projects/id/workspace/files service');
        return service.one(id).one('workspace/files').doPOST({"path":path})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('createFile', 'Error during post /projects/id/workspace/files service', error);
            throw error;
          });
      }

      function getFileContent(id, path) {
        logger.debug('call get /projects/id/workspace/files service');
        return service.one(id).one('workspace').doGET("files", {path: path})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('getFileContent', 'Error during get /projects/id/workspace/files service', error);
            throw error;
          });
      }

      function updateFileContent(id, path, content) {
        logger.debug('call put /projects/id/workspace/files service');
        return service.one(id).one('workspace/files').doPUT({"path": path, "content": content})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('updateFileContent', 'Error during put /proejcts/id/workspace/files service', error);
            throw error;
          })
      }

      function deleteFile(id, path) {
        logger.debug('call the delete /projects/id/workspace/files service');
        return service.one(id).one('workspace').doDELETE("files", {path : path})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('delete', 'Error during the delete /projects/id/workspace/files call', error);
          })
      }

      function renameFile(id, path,newName) {
        logger.debug('call the patch /projects/id/workspace/files service');
        return service.one(id).one('workspace/files').patch({"path": path, "name": newName})
          .then(function(data) {
            return data;
          })
          .catch(function(error) {
            logger.debug('rename', 'Error during the patch /projects/id/workspace/files call', error);
          })
      }

    }
})();
