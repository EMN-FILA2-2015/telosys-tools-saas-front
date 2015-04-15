/**
 * Created by Killian on 01/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ConfigurationController', ConfigurationController)

  ConfigurationController.$inject = ['ProjectService', 'Logger'];

  function ConfigurationController(ProjectService, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ConfigurationController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    vm.editPackages = true;
    vm.editFolders = false;
    vm.editVariables = false;
    vm.showPackages = showPackages;
    vm.showFolders = showFolders;
    vm.showVariables = showVariables;

    vm.packages = [
      {
        'name' : 'project.configuration.packages.root_package',
        'id' : 'root-package',
        'shortcut' : '${ROOT_PKG}',
        'example' : 'org.demo'
      }, {
        'name' : 'project.configuration.packages.entity_classes_package',
        'id' : 'entity-classes-package',
        'shortcut' : '${ENTITY_PKG}',
        'example' : 'org.demo.bean'
      }
    ];

    vm.folders = [
      {
        'name' : 'project.configuration.folders.sources',
        'id' : 'sources',
        'shortcut' : '${SRC}',
        'example' : 'src',
        'value' : ''
      }, {
        'name' : 'project.configuration.folders.resources',
        'id' : 'resources',
        'shortcut' : '${RES}',
        'example' : 'src/resources',
        'value' : ''
      }, {
        'name' : 'project.configuration.folders.web_content',
        'id' : 'web-content',
        'shortcut' : '${WEB}',
        'example' : 'webapp',
        'value' : ''
      }, {
        'name' : 'project.configuration.folders.tests_sources',
        'id' : 'tests-sources',
        'shortcut' : '${TEST_SRC}',
        'example' : 'test',
        'value' : ''
      }, {
        'name' : 'project.configuration.folders.tests_resources',
        'id' : 'tests-resources',
        'shortcut' : '${TEST_RES}',
        'example' : 'test/resources',
        'value' : ''
      }, {
        'name' : 'project.configuration.folders.documentation',
        'id' : 'documentation',
        'shortcut' : '${DOC}',
        'example' : 'doc',
        'value' : ''
      }, {
        'name' : 'project.configuration.folders.temporary_files',
        'id' : 'temporary-files',
        'shortcut' : '${TMP}',
        'example' : 'tmp',
        'value' : ''
      }
    ];

    vm.setMavenFolders = setMavenFolders;
    vm.setProjectFolders = setProjectFolders;

    ////////////////

    /**
     * Fonction permettant de montrer le formulaire d'édition des packages.
     */
    function showPackages() {
      vm.editPackages = true;
      vm.editFolders = false;
      vm.editVariables = false;
    }

    /**
     * Fonction permettant de montrer le formulaire d'édition des folders.
     */
    function showFolders() {
      vm.editPackages = false;
      vm.editFolders = true;
      vm.editVariables = false;
    }

    /**
     * Fonction permettant de montrer le formulaire d'édition des variables.
     */
    function showVariables() {
      vm.editPackages = false;
      vm.editFolders = false;
      vm.editVariables = true;
    }

    /**
     * Fonction permettant de définir les dossiers maven.
     */
    function setMavenFolders() {
      logger.debug('setMavenFolders()','Setting maven folders');
      vm.folders.forEach(function(folder) {
        switch (folder.id) {
          case "sources" :
            folder.value = "src/main/java";
            break;
          case "resources" :
            folder.value = "src/main/resources";
            break;
          case "web-content" :
            folder.value = "src/main/webapp";
            break;
          case "tests-sources" :
            folder.value = "src/test/java";
            break;
          case "tests-resources" :
            folder.value = "src/test/resources";
            break;
          case "documentation" :
            folder.value = "doc";
            break;
          case "temporary-files" :
            folder.value = "tmp";
            break;
          default :
            logger.error("Impossible case");
        }
      });
    }


    /**
     * Fonction permettant de définir les dossiers maven.
     */
    function setProjectFolders() {
      logger.debug('setMavenFolders()','Setting maven folders');
      vm.folders.forEach(function(folder) {
        switch (folder.id) {
          case "sources" :
            folder.value = "src";
            break;
          case "resources" :
            folder.value = "";
            break;
          case "web-content" :
            folder.value = "WebContent";
            break;
          case "tests-sources" :
            folder.value = "src";
            break;
          case "tests-resources" :
            folder.value = "";
            break;
          case "documentation" :
            folder.value = "doc";
            break;
          case "temporary-files" :
            folder.value = "tmp";
            break;
          default :
            logger.error("Impossible case");
        }
      });
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
