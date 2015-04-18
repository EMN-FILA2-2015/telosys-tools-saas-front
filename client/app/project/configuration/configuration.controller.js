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
    vm.editFolders = true;
    vm.editVariables = true;

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

    vm.variables = [
      {
        'name' : 'MAVEN_ARTIFACT_ID',
        'value' : 'jpa-generation'
      }, {
        'name' : 'MAVEN_GROUP_ID',
        'value' : 'group.to.be.defined'
      }, {
        'name' : 'PROJECT_NAME',
        'value' : 'jpa-generation'
      }, {
        'name' : 'PROJECT_VERSION',
        'value' : '0.1'
      }
    ];

    vm.deleteVariable = deleteVariable;
    vm.createVariable = createVariable;

    ////////////////

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
     * Fonction permettant de supprimer une variable selon son index.
     * @param index
     */
    function deleteVariable(index) {
      logger.debug('deleteVariable()','Deleting a variable');
      vm.variables.splice(index, 1);
    }

    /**
     * Fonction permettant d'ajouter une nouvelle variable vide à un index.
     * @param index
     */
    function createVariable(index) {
      logger.debug('addVariable()','Creating a new variable');
      if (index === undefined) {
        vm.variables.push({
          'name' : '',
          'value' : ''
        });
      } else {
        vm.variables.splice(index, 0, {
          'name' : '',
          'value' : ''
        });
      }
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
