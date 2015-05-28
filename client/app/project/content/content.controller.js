/**
 * @author Adrian
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ContentController', ContentController);

  ContentController.$inject = ['WorkspaceService', 'Logger', '$modal', '$stateParams', '$state'];

  function ContentController(WorkspaceService, Logger, $modal, $stateParams, $state) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ContentController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    vm.addEntity = addEntity;
    vm.addFile = addFile;
    vm.addFolder = addFolder;
    vm.renameFile = renameFile;
    vm.renameFolder = renameFolder;
    vm.deleteFolder = deleteFolder;
    vm.showSelected = showSelected;
    vm.saveFile = saveFile;
    vm.deleteFileModal = deleteFileModal;

    ////

    vm.aceOptions = {
      mode: 'html',
      useWrapMode : true,
      onLoad: function(_editor) {
        vm.aceEditor = _editor;
        _editor.session.setNewLineMode('unix');
        _editor.$blockScrolling = Infinity;
        console.log('onLoad');
      },
      onFocus: function(e) {
        console.log('onFocus');
      },
      require: ['ace/ext/language_tools'],
      advanced: {
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      }
    };

    vm.originalContent = undefined;
    vm.selectedNode = {};
    vm.hasContentChanged = hasContentChanged;

    ////

    function hasContentChanged() {
      if(vm.originalContent == null) {
        return false;
      }
      return vm.originalContent != vm.aceEditor.getValue();
    }

    vm.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
      injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
      }
    };

    vm.model = {
      treedata: [],
      expandedNodes: []
    };
    vm.templates = {
      treedata: [],
      expandedNodes: []
    };
    vm.generated = {
      treedata: [],
      expandedNodes: []
    };
    ////

    getWorkspace();

    ////////////////

    /**
     * Récupération du workspace.
     */
    function getWorkspace() {
      WorkspaceService.get($stateParams.projectId)
        .then(function(data) {
          logger.debug('Retrieving workspace');
          vm.model.treedata = buildTree(data.model);
          vm.templates.treedata = buildTree(data.templates);
          vm.generated.treedata = buildTree(data.generated);
        })
        .catch(function(error) {
          $state.transitionTo('error', {
            code: error.status,
            text: error.statusText
          });
        });
    }

    ////////////////

    function addEntity(rootFolder, path) {
      var entityPath;
      if (path !== undefined) {
        if (rootFolder == vm.selectedTree) {
          if (vm.selectedNode.type === 'folder') {
            entityPath = path;
          } else {
            entityPath = path.substring(0,path.lastIndexOf('/'));
          }
        } else {
          entityPath = rootFolder;
        }
      } else {
        entityPath = rootFolder;
      }
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'app/project/content/modals/addEntityModal.html',
        controller: 'AddEntityController as addEntity',
        resolve: {
          path: function () {
            return entityPath;
          }
        }
      });

      modalInstance.result.then(function (entity) {
        logger.debug('Creating entity ' + entity.path + "/" + entity.name);
        WorkspaceService.createFile($stateParams.projectId, entity.path + "/" + entity.name)
          .then(function(data) {
            switch(rootFolder) {
              case "model" :
                vm.model.treedata = buildTree(data);
                break;
              default :
                $state.transitionTo('error', {
                  code: 403,
                  text: 'Unable to rebuild the entity tree'
                });
            }
          })
          .catch(function(error) {
            switch (error.status) {
              case 409 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.duplicate_entity'
                });
                break;
              case 403 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.invalid_path'
                });
                break;
              case 404 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.parent_not_found'
                });
                break;
              default :
                $state.transitionTo('error', {
                  code: error.status,
                  text: error.statusText
                });
            }
          });
      });

    }

    function renameEntity(rootFolder,path) {
      vm.currentPath = path;
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'app/project/content/modals/renameEntityModal.html',
        controller: 'RenameEntityController as renameEntity',
        resolve: {
          path: function () {
            return path;
          }
        }
      });

      modalInstance.result.then(function (newName) {
        logger.debug('Renaming entity ' + path + " to " + newName);
        WorkspaceService.renameFile($stateParams.projectId, path, newName)
          .then(function (data) {
            switch (rootFolder) {
              case "model" :
                vm.model.treedata = buildTree(data);
                break;
              case "templates" :
                vm.templates.treedata = buildTree(data);
                break;
              default :
                $state.transitionTo('error', {
                  code: 500,
                  text: 'Unable to rebuild the entity tree'
                });
            }
            vm.alerts = [];
            vm.alerts.push({
              type: 'success',
              msg: 'project.content.notification.entity_renamed'
            });
          })
          .catch(function (error) {
            switch (error.status) {
              case 400 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.invalid_path'
                });
                break;
              case 404 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.parent_not_found'
                });
                break;
              default :
                $state.transitionTo('error', {
                  code: error.status,
                  text: error.statusText
                });
            }

          });
      });
    }

    function addFile(rootFolder, path) {
      var filePath;
      if (path !== undefined) {
        if (rootFolder == vm.selectedTree) {
          if (vm.selectedNode.type === 'folder') {
            filePath = path;
          } else {
            filePath = path.substring(0,path.lastIndexOf('/'));
          }
        } else {
          filePath = rootFolder;
        }
      } else {
        filePath = rootFolder;
      }
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'app/project/content/modals/addFileModal.html',
        controller: 'AddFileController as addFile',
        resolve: {
          path: function () {
            return filePath;
          }
        }
      });

      modalInstance.result.then(function (file) {
        logger.debug('Creating file ' + file.path + "/" + file.name);
        WorkspaceService.createFile($stateParams.projectId, file.path + "/" + file.name)
          .then(function(data) {
            switch(rootFolder) {
              case "templates" :
                vm.templates.treedata = buildTree(data);
                break;
              default :
                $state.transitionTo('error', {
                  code: 403,
                  text: 'Unable to rebuild the file tree'
                });
            }
          })
          .catch(function(error) {
            switch (error.status) {
              case 409 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.duplicate_file'
                });
                break;
              case 403 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.invalid_path'
                });
                break;
              case 404 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.parent_not_found'
                });
                break;
              default :
                $state.transitionTo('error', {
                  code: error.status,
                  text: error.statusText
                });
            }
          });
      });

    }

    function renameFile(rootFolder,path) {
      vm.currentPath = path;
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'app/project/content/modals/renameFileModal.html',
        controller: 'RenameFileController as renameFile',
        resolve: {
          path: function () {
            return path;
          }
        }
      });

      modalInstance.result.then(function (newName) {
        logger.debug('Renaming file ' + path + " to " + newName);
        WorkspaceService.renameFile($stateParams.projectId, path, newName)
          .then(function (data) {
            switch (rootFolder) {
              case "model" :
                vm.model.treedata = buildTree(data);
                break;
              case "templates" :
                vm.templates.treedata = buildTree(data);
                break;
              default :
                $state.transitionTo('error', {
                  code: 500,
                  text: 'Unable to rebuild the file tree'
                });
            }
            vm.alerts = [];
            vm.alerts.push({
              type: 'success',
              msg: 'project.content.notification.file_renamed'
            });
          })
          .catch(function (error) {
            switch (error.status) {
              case 400 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.invalid_path'
                });
                break;
              case 404 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.parent_not_found'
                });
                break;
              default :
                $state.transitionTo('error', {
                  code: error.status,
                  text: error.statusText
                });
            }

          });
      });
    }

    function addFolder(rootFolder, path) {
      vm.currentPath = path;

      var folderPath;
      if (path !== undefined) {
        if (rootFolder == vm.selectedTree) {
        if (vm.selectedNode.type === 'folder') {
          folderPath = path;
        } else {
          folderPath = path.substring(0,path.lastIndexOf('/'));
        }
        } else {
          folderPath = rootFolder;
        }
      } else {
        folderPath = rootFolder;
      }
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'app/project/content/modals/addFolderModal.html',
        controller: 'AddFolderController as addFolder',
        resolve: {
          path: function () {
            return folderPath;
          }
        }
      });


      modalInstance.result.then(function (folder) {
        logger.debug('Creating folder ' + folder.path + "/" + folder.name);
        WorkspaceService.createFolder($stateParams.projectId, folder.path + "/" + folder.name)
          .then(function (data) {
            switch (rootFolder) {
              case "model" :
                vm.model.treedata = buildTree(data);
                break;
              case "templates" :
                vm.templates.treedata = buildTree(data);
                break;
              default :
                $state.transitionTo('error', {
                  code: 500,
                  text: 'Unable to rebuild the file tree'
                });
            }
            vm.alerts = [];
            vm.alerts.push({
              type: 'success',
              msg: 'project.content.notification.folder_created'
            });
          })
          .catch(function (error) {
            switch (error.status) {
              case 409 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.duplicate_folder'
                });
                break;
              case 403 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.invalid_path'
                });
                break;
              case 404 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.parent_not_found'
                });
                break;
              default :
                $state.transitionTo('error', {
                  code: error.status,
                  text: error.statusText
                });
            }

          });
      });
    }

    function renameFolder(rootFolder,path) {
      vm.currentPath = path;
      console.log("coucou gabi");
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'app/project/content/modals/renameFolderModal.html',
        controller: 'RenameFolderController as renameFolder',
        resolve: {
          path: function () {
            return path;
          }
        }
      });

      modalInstance.result.then(function (newName) {
        logger.debug('Renaming folder ' + path + " to " + newName);
        WorkspaceService.renameFolder($stateParams.projectId, path, newName)
          .then(function (data) {
            switch (rootFolder) {
              case "model" :
                vm.model.treedata = buildTree(data);
                break;
              case "templates" :
                vm.templates.treedata = buildTree(data);
                break;
              default :
                $state.transitionTo('error', {
                  code: 500,
                  text: 'Unable to rebuild the file tree'
                });
            }
            vm.alerts = [];
            vm.alerts.push({
              type: 'success',
              msg: 'project.content.notification.folder_renamed'
            });
          })
          .catch(function (error) {
            switch (error.status) {
              case 400 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.invalid_path'
                });
                break;
              case 404 :
                vm.alerts = [];
                vm.alerts.push({
                  type: 'danger',
                  msg: 'project.content.error.parent_not_found'
                });
                break;
              default :
                $state.transitionTo('error', {
                  code: error.status,
                  text: error.statusText
                });
            }

          });
      });
    }

    function deleteFolder(rootFolder, path) {
        var deleteModal = $modal.open({
          animation: true,
          templateUrl: 'app/project/content/modals/deleteResource.html',
          controller: 'DeleteResourceController as modalCtrl',
          size: 'sm',
          resolve: {
            path: function() {
              return path;
            },
            type: function() {
              return 'folder';
            }
          }
        });

        deleteModal.result.then(function(path) {
          vm.currentPath = path;
          logger.debug('Deleting folder ' + path);
          WorkspaceService.deleteFolder($stateParams.projectId, path)
            .then(function(data) {
              vm.aceEditor.setValue('');
              delete vm.originalContent;
              vm.currentlySelected = undefined;
              switch(rootFolder) {
                case "model" :
                  vm.model.treedata = buildTree(data);
                  vm.selectedNode = vm.model.treedata[0];
                  break;
                case "templates" :
                  vm.templates.treedata = buildTree(data);
                  vm.selectedNode = vm.templates.treedata[0];
                  break;
                default :
                  $state.transitionTo('error', {
                    code: 403,
                    text: 'Unable to rebuild the file tree'
                  });
              }
              vm.alerts = [];
              vm.alerts.push({
                type: 'success',
                msg: 'project.content.notification.resource_deleted'
              });
            })
            .catch(function(error) {
              logger.error('error loading file - ' + error.statusText);
              vm.alerts = [];
              vm.alerts.push({
                type: 'danger',
                msg: 'project.content.error.delete_file'
              });
            });
        });
    }

    function showSelected(node, selected) {
      if (vm.currentlySelected != undefined && !vm.currentlySelected.readOnly && vm.hasContentChanged()) {
        var saveModal = $modal.open({
          animation: true,
          templateUrl: 'app/project/content/modals/saveFile.html',
          controller: 'SaveFileController as modalCtrl',
          size: 'sm',
          resolve: {
            file: function() {
              return vm.currentlySelected.path;
            }
          }
        });

        saveModal.result.then(function() {
          // Sortie sans sauvegarder
          if (selected && node.type === 'file') loadFile(node);
          else vm.currentlySelected = undefined;
          var nodePath = node.path;
          vm.selectedTree = nodePath.split("/")[0];
        }, function() {
          logger.debug('Dismissed save file modal');
          vm.selectedNode = vm.currentlySelected;
        })
      } else {
        vm.selectedTree = node.path.split('/')[0];
        if (node.type === 'file') {
          loadFile(node);
        }
      }
    }

    function loadFile(node) {
      WorkspaceService.getFile($stateParams.projectId, node.path)
        .then(function (data) {
          vm.aceEditor.setValue(data.content, 1);
          vm.originalContent = data.content;
          vm.aceEditor.setReadOnly(node.readOnly);
          vm.currentlySelected = node;
        })
        .catch(function (error) {
          vm.errorMessage = 'Code : ' + error.status + ' ' + error.statusText;
          logger.error('error loading file - ' + error.statusText);
          vm.alerts = [];
          vm.alerts.push({
            type: 'danger',
            msg: 'project.content.error.load_file'
          });
        });
    }

    function saveFile(node) {
      if (vm.hasContentChanged()) {
        var content = vm.aceEditor.getValue();
        WorkspaceService.updateFile($stateParams.projectId, node.path, content)
          .then(function() {
            delete vm.originalContent;
            vm.alerts = [];
            vm.alerts.push({
              type: 'success',
              msg: 'project.content.notification.saved'
            });
          })
          .catch(function(error) {
            vm.errorMessage = 'Code : ' + error.status + ' ' + error.statusText;
            logger.error('error saving file - ' + error.statusText);
            vm.alerts = [];
            vm.alerts.push({
              type: 'danger',
              msg: 'project.content.error.save_file'
            });
          });
      }
    }

    function deleteFileModal(node) {
      if (vm.selectedNode != undefined && vm.selectedNode.type == 'file') {
        var deleteModal = $modal.open({
          animation: true,
          templateUrl: 'app/project/content/modals/deleteResource.html',
          controller: 'DeleteResourceController as modalCtrl',
          size: 'sm',
          resolve: {
            path: function() {
              return node.path;
            },
            type: function() {
              return node.type;
            }
          }
        });

        deleteModal.result.then(function(path) {
          vm.currentPath = path;
          logger.debug('Deleting file ' + path);
          WorkspaceService.deleteFile($stateParams.projectId, path)
            .then(function(data) {
              vm.aceEditor.setValue('');
              delete vm.originalContent;
              vm.currentlySelected = undefined;
              switch(data.name) {
                case "model" :
                  vm.model.treedata = buildTree(data);
                  vm.selectedNode = vm.model.treedata[0];
                  break;
                case "templates" :
                  vm.templates.treedata = buildTree(data);
                  vm.selectedNode = vm.templates.treedata[0];
                  break;
                default :
                  $state.transitionTo('error', {
                    code: 403,
                    text: 'Unable to rebuild the file tree'
                  });
              }
              vm.alerts = [];
              vm.alerts.push({
                type: 'success',
                msg: 'project.content.notification.resource_deleted'
              });
            })
            .catch(function(error) {
              logger.error('error loading file - ' + error.statusText);
              vm.alerts = [];
              vm.alerts.push({
                type: 'danger',
                msg: 'project.content.error.delete_file'
              });
            });
        });
      }
    }

    ////////////////

    /**
     * Recursive function that builds a treedata from a root folder
     *
     * @param root the root folder
     * @returns {Array} a treedata
     */
    function buildTree(root) {
      var treedata = [];
      for (var fileID in root.files)
        treedata.push({
          "name": root.files[fileID].name,
          "type": "file",
          "readOnly": root.readOnly,
          "path": root.files[fileID].absolutePath
        });

      var folder;
      for (var folderID in root.folders) {
        folder = root.folders[folderID];
        if (root.readOnly) folder.readOnly = true;
        treedata.push({
          "name": folder.name,
          "type": "folder",
          "path": folder.absolutePath,
          "children": buildTree(folder)
        });
      }
      return treedata;
    }

    /**
     * Fonction permettant de fermer une notification.
     * @param index
     */
    function closeAlert(index) {
      vm.alerts.splice(index, 1);
      vm.errorMessage = null;
    }

  }

})();
