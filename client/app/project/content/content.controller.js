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

    vm.addFile = addFile;
    vm.addFolder = addFolder;
    vm.showSelected = showSelected;
    vm.saveFile = saveFile;
    vm.deleteFile = deleteFile;

    ////

    vm.aceOptions = {
      mode: 'html',
      useWrapMode : true,
      onLoad: function(_editor) {
        vm.aceEditor = _editor;
        _editor.session.setNewLineMode('unix');
        _editor.$blockScrolling = Infinity;
      },
      onChange: function() {
        vm.contentChanged = true;
      }
    };

    vm.contentChanged = false;
    vm.selectedNode = {};

    ////

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

    vm.model = {};
    vm.model.treedata = [];
    vm.model.expandedNodes = [];

    vm.bundles = {};
    vm.bundles.treedata = [];
    vm.bundles.expandedNodes = [];

    vm.generated = {};
    vm.generated.treedata = [];
    vm.generated.expandedNodes = [];

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
          vm.model.treedata = buildTree(data.models);
          vm.generated.treedata = buildTree(data.generated);
          // TODO : Handling bundles and templates
        })
        .catch(function(error) {
          $state.transitionTo('error', {
            code: error.status,
            text: error.statusText
          });
        });
    }

    ////////////////

    function addFile(rootFolder, path) {

      /*
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'app/project/file/addFile.html',
        controller: 'AddFileController as addFile',
        resolve: {
          path: function () {
            return path;
          }
        }
      });

      modalInstance.result
        .then(function (newFile) {
            console.log(newFile);
          // Afficher le message de confirmation de l'ajout
          // Rafraîchir l'arborescence des fichiers
        });
        */

      WorkspaceService.createFile($stateParams.projectId, rootFolder.concat(path))
        .then(function(data) {
          switch(rootFolder) {
            case "models" :
              vm.model.treedata = buildTree(data);
              break;
            case "bundles" :
              vm.bundles.treedata = buildTree(data);
              break;
            default :
              $state.transitionTo('error', {
                code: 403,
                text: 'Unable to rebuild the file tree'
              });
          }
        })
        .catch(function(error) {
          $state.transitionTo('error', {
            code: error.status,
            text: error.statusText
          });
        });
    }

    function addFolder(rootFolder, path) {
      WorkspaceService.createFolder($stateParams.projectId, rootFolder.concat(path))
        .then(function(data) {
          switch(rootFolder) {
            case "models" :
              vm.model.treedata = buildTree(data);
              break;
            case "bundles" :
              vm.bundles.treedata = buildTree(data);
              break;
            default :
              $state.transitionTo('error', {
                code: 403,
                text: 'Unable to rebuild the file tree'
              });
          }
        })
        .catch(function(error) {
          $state.transitionTo('error', {
            code: error.status,
            text: error.statusText
          });
        });
    }

    function showSelected(node) {
      if (vm.currentlySelected != undefined && !vm.currentlySelected.readOnly && vm.contentChanged) {
        var saveModal = $modal.open({
          animation: true,
          templateUrl: 'app/project/file/saveFileModal.html',
          controller: 'SaveFileModalController as modalCtrl',
          size: 'sm',
          resolve: {
            file: function() {
              return vm.currentlySelected.path;
            }
          }
        });

        saveModal.result.then(function() {
          // Sortie sans sauvegarder
          if (node.type === 'file') loadFile(node);
          else vm.currentlySelected = undefined;
        }, function() {
          logger.debug('Dismissed save file modal');
          vm.selectedNode = vm.currentlySelected;
        })
      } else if (node.type === 'file') {
        loadFile(node);
        vm.contentChanged = false;
      }

    }

    function loadFile(node) {
      WorkspaceService.getFile($stateParams.projectId, node.path)
        .then(function (data) {
          vm.aceEditor.setValue(data.content, 1);
          vm.aceEditor.setReadOnly(node.readOnly);
          vm.currentlySelected = node;
        })
        .catch(function (error) {
          $state.transitionTo('error', {
            code: error.status,
            text: error.statusText
          });
        });
    }

    function saveFile(node) {
      if (vm.contentChanged) {
        var content = vm.aceEditor.getValue();
        console.log(content);
        WorkspaceService.updateFile($stateParams.projectId, node.path, content)
          .then(function() {
            vm.contentChanged = false;
            vm.alerts.push({
              type: 'success',
              msg: 'project.content.notification.saved'
            });
          })
          .catch(function(error) {
            $state.transitionTo('error', {
              code: error.status,
              text: error.statusText
            });
          });
      }
    }

    function deleteFile(file) {
      console.log(file);
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
    }

  }

})();
