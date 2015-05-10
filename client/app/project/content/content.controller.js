/**
 * Created by Killian on 08/04/2015.
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

    vm.addFile = addFile;
    vm.addFolder = addFolder;
    vm.showSelected = showSelected;
    vm.saveFile = saveFile;
    vm.deleteFile = deleteFile;

    ////

    vm.aceOptions = {
      mode: 'html',
      useWrapMode : true,
      $blockScrolling: Infinity,
      onLoad: function(_editor) {
        vm.aceEditor = _editor;
        _editor.session.setNewLineMode('unix');
      },
      onChange: function() {
        vm.contentChanged = true;
      }
    };

    vm.contentChanged = false;

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

    vm.bundles.treedata =
      [
        { "name" : "back-jpa", "type" : "folder", "children" : [
          { "name" : "Bean.vm", "type" : "file", "children" : [] },
          { "name" : "repository", "type" : "folder", "children" : [
            { "name" : "BookRepository.java", "type" : "file", "children" : [] },
            { "name" : "AuthorRepository.java", "type" : "file", "children" : [] }
          ]}
        ]},
        { "name" : "front-spring-mvc", "type" : "folder", "children" : [
          { "name" : "domain", "type" : "folder", "children" : [
            { "name" : "Book.java", "type" : "file", "children" : [] },
            { "name" : "Author.java", "type" : "file", "children" : [] }
          ] },
          { "name" : "web", "type" : "folder", "children" : [
            { "name" : "BookController.java", "type" : "file", "children" : [] },
            { "name" : "AuthorController.java", "type" : "file", "children" : [] }
          ] },
          { "name" : "Application.java", "type" : "file", "readOnly": true, "children" : [] }
        ]}
      ];

    vm.bundles.expandedNodes = [
      vm.bundles.treedata[0],
      vm.bundles.treedata[1]
    ];

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
    };

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
    };

    function showSelected(node) {
      if (node.type === 'file')
        WorkspaceService.getFile($stateParams.projectId, node.path)
          .then(function(data) {
            vm.aceEditor.setValue(data.content, 0);
            vm.aceEditor.setReadOnly(node.readOnly);
          })
          .catch(function(error) {
            $state.transitionTo('error', {
              code: error.status,
              text: error.statusText
            });
          });
    };

    function saveFile(node) {
      if (vm.contentChanged) {
        var content = vm.aceEditor.getValue();
        console.log(content);
        WorkspaceService.updateFile($stateParams.projectId, node.path, content)
          .then(function(data) {
            vm.contentChanged = false;
            // TODO : Afficher un message de confirm
          })
          .catch(function(error) {
            $state.transitionTo('error', {
              code: error.status,
              text: error.statusText
            });
          });
      }
    };

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
      var treedata = []
      for (var fileID in root.files)
        treedata.push({
          "name": root.files[fileID].name,
          "type": "file",
          "readOnly": root.files[fileID].readOnly,
          "path": root.files[fileID].absolutePath
        });

      for (var folderID in root.folders) {
        treedata.push({
          "name": root.folders[folderID].name,
          "type": "folder",
          "path": root.folders[folderID].absolutePath,
          "children": buildTree(root.folders[folderID])
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
