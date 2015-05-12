/**
 * Created by Killian on 01/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ConfigurationController', ConfigurationController);

  ConfigurationController.$inject = ['ProjectService', 'Logger', '$stateParams', '$modal'];

  function ConfigurationController(ProjectService, Logger, $stateParams, $modal) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ConfigurationController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    vm.id = $stateParams.projectId;

    vm.editPackages = true;
    vm.editFolders = true;
    vm.editVariables = true;

    vm.packages = [];

    vm.folders = [];
    vm.setMavenFolders = setMavenFolders;
    vm.setProjectFolders = setProjectFolders;

    vm.variables = [];
    vm.createVariable = createVariable;
    vm.deleteVariable = deleteVariable;
    vm.reservedVariables = getReservedVariables();
    vm.validateVariable = validateVariable;
    vm.showReservedVariables = false;

    vm.setConfig = setConfig;
    vm.getConfig = getConfig;

    getConfig();

    ////////////////

    /**
     * Méthode permettant de récupérer la configuration du projet (couples de clé / valeur.
     * Les packages et les folders sont statiques (clés connues).
     * Les variables sont variables (clés à priori inconnues).
     */
    function getConfig() {
      ProjectService.getConfig($stateParams.projectId)
        .then(function(data){

          vm.packages = [
            {
              'name' : 'project.configuration.packages.root_package',
              'id' : 'ROOT_PKG',
              'shortcut' : '${ROOT_PKG}',
              'value' : data.packages.ROOT_PKG.replace("\\\\", "\\")
            }, {
              'name' : 'project.configuration.packages.entity_classes_package',
              'id' : 'ENTITY_PKG',
              'shortcut' : '${ENTITY_PKG}',
              'value' : data.packages.ENTITY_PKG.replace("\\\\", "\\")
            }
          ];

          vm.folders = [
            {
              'name' : 'project.configuration.folders.sources',
              'id' : 'SRC',
              'shortcut' : '${SRC}',
              'value' : data.folders.SRC.replace("\\\\", "\\")
            }, {
              'name' : 'project.configuration.folders.resources',
              'id' : 'RES',
              'shortcut' : '${RES}',
              'value' : data.folders.RES.replace("\\\\", "\\")
            }, {
              'name' : 'project.configuration.folders.web_content',
              'id' : 'WEB',
              'shortcut' : '${WEB}',
              'value' : data.folders.WEB.replace("\\\\", "\\")
            }, {
              'name' : 'project.configuration.folders.tests_sources',
              'id' : 'TEST_SRC',
              'shortcut' : '${TEST_SRC}',
              'value' : data.folders.TEST_SRC.replace("\\\\", "\\")
            }, {
              'name' : 'project.configuration.folders.tests_resources',
              'id' : 'TEST_RES',
              'shortcut' : '${TEST_RES}',
              'value' : data.folders.TEST_RES.replace("\\\\", "\\")
            }, {
              'name' : 'project.configuration.folders.documentation',
              'id' : 'DOC',
              'shortcut' : '${DOC}',
              'value' : data.folders.DOC.replace("\\\\", "\\")
            }, {
              'name' : 'project.configuration.folders.temporary_files',
              'id' : 'TMP',
              'shortcut' : '${TMP}',
              'value' : data.folders.TMP.replace("\\\\", "\\")
            }
          ];

          vm.variables = [];
          for (var variable in data.variables) {
            if (data.variables.hasOwnProperty(variable)) {
              vm.variables.push({
                'name' : variable,
                'value' : data.variables[variable].replace("\\\\", "\\")
              });
            }
          }

        })
        .catch(function(error){
          logger.error('Unable to get the configuration', error);
          vm.alerts.push({
            type: 'danger',
            msg: 'project.configuration.error.getting'
          });
        })
    }

    /**
     * Méthode permettant d'enregistrer la configuration saisie par l'utilisateur.
     */
    function setConfig() {
      // Transformation des données
      var config = {
        'packages' : {},
        'folders' : {},
        'variables' : {}
      };
      for (var pkg = 0; pkg < vm.packages.length; pkg++) {
        config.packages[vm.packages[pkg].id] = vm.packages[pkg].value.replace("\\", "\\\\");
      }
      for (var fld = 0; fld < vm.folders.length; fld++) {
        config.folders[vm.folders[fld].id] = vm.folders[fld].value.replace("\\", "\\\\");
      }
      for (var vrb = 0; vrb < vm.variables.length; vrb++) {
        config.variables[vm.variables[vrb].name] = vm.variables[vrb].value.replace("\\", "\\\\");
      }
      // Envoi des données
      if (validateVariables(config.variables)) {
        ProjectService.setConfig($stateParams.projectId, config)
          .then(function () {
            vm.alerts.push({
              type: 'success',
              msg: 'project.configuration.notification.saved'
            });
          })
          .catch(function (error) {
            logger.error("Unable to save the configuration", error);
            vm.alerts.push({
              type: 'danger',
              msg: 'project.configuration.error.saving'
            });
          })
          .finally(function () {
            // Déplacement vers le haut de la page pour afficher la notification
            $('html, body').animate({scrollTop: 0}, 'fast');
          });
      } else {
        vm.alerts.push({
          type: 'danger',
          msg: 'project.configuration.error.fields'
        });
      }
      $('html, body').animate({scrollTop: 0}, 'fast');
    }

    /**
     * Fonction permettant de définir les dossiers maven.
     */
    function setMavenFolders() {
      logger.debug('setMavenFolders()','Setting maven folders');
      vm.folders.forEach(function(folder) {
        switch (folder.id) {
          case "SRC" :
            folder.value = "src/main/java";
            break;
          case "RES" :
            folder.value = "src/main/resources";
            break;
          case "WEB" :
            folder.value = "src/main/webapp";
            break;
          case "TEST_SRC" :
            folder.value = "src/test/java";
            break;
          case "TEST_RES" :
            folder.value = "src/test/resources";
            break;
          case "DOC" :
            folder.value = "doc";
            break;
          case "TMP" :
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
      logger.debug('setProjectFolders()','Setting project folders');
      vm.folders.forEach(function(folder) {
        switch (folder.id) {
          case "SRC" :
            folder.value = "src";
            break;
          case "RES" :
            folder.value = "";
            break;
          case "WEB" :
            folder.value = "WebContent";
            break;
          case "TEST_SRC" :
            folder.value = "src";
            break;
          case "TEST_RES" :
            folder.value = "";
            break;
          case "DOC" :
            folder.value = "doc";
            break;
          case "TMP" :
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
    function createVariable() {
      logger.debug('addVariable()','Creating a new variable');
      vm.variables.push({
        'name' : 'VARIABLE_NAME',
        'value' : 'VARIABLE_VALUE'
      });
    }

    /**
     * Function checking if the variables are reserved.
     */
    function validateVariables(variables) {
      for (var variable in variables) {
        if (vm.reservedVariables.indexOf(variable) != -1 || variable == '') {
          return false;
        }
      }
      return true;
    }

    /**
     * Function checking if the variable is reserved or undefined :
     * ==> yes : add hasError class
     * ==> no : remove hasError clas
     */
    function validateVariable(inputId) {
      var input = $('#' + inputId);
      var value = input.val();
      if (value.trim() == '') {
        input.addClass("hasError");
      } else {
        if (vm.reservedVariables.indexOf(input.val()) == -1) {
          input.removeClass("hasError");
        } else {
          input.addClass("hasError");
        }
      }
    }

    /**
     * Function returning the reserved variable names.
     */
    function getReservedVariables() {
      return [
        'AMP',
        'DOC',
        'DOLLAR',
        'ENTITY_PKG',
        'GT',
        'LBRACE',
        'LT',
        'QUOT',
        'RBRACE',
        'RES',
        'ROOT_PKG',
        'SHARP',
        'SRC',
        'TEST_RES',
        'TEST_SRC',
        'TMP',
        'WEB',
        'attrib',
        'attribute',
        'beanValidation',
        'const',
        'database',
        'databases',
        'entity',
        'env',
        'field',
        'fk',
        'fkcol',
        'fn',
        'generation',
        'generator',
        'java',
        'joinColumn',
        'jpa',
        'link',
        'linkAttribute',
        'loader',
        'model',
        'project',
        'selectedEntities',
        'target',
        'today'
      ];
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
