/**
 * Created by Killian on 05/02/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['ProjectService', 'Logger'];

  function ProjectsController(ProjectService, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ProjectsCreateController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    vm.names = [];
    vm.newProjectName = '';
    vm.createdProjectName = '';
    vm.create = create;

    getProjectNames();

    ////////////////

    /**
     * Fonction permettant de récupérer le nom des projets.
     */
    function getProjectNames() {
      logger.debug('getProjectNames()','Get project names');
      ProjectService.getList()
        .then(function(list){
          var names = [];
          list.forEach(function(project){
            names.push(project.name);
          });
          vm.names = names;
        })
        .catch(function(error) {
          logger.error('Unable to get the projects list.', error);
          vm.alerts.push({
            type:'danger',
            msg:'projects.error.list'
          });
          vm.names = [];
        });
    }

    /**
     * Fonction permettant de créer un projet.
     * En cas d'erreur, les champs servant à la création d'un projet ne sont pas réinitialisés.
     */
    function create() {
      logger.debug('create()','Project creation');
      vm.alerts = [];
      ProjectService.create(vm.newProjectName)
        .then(function(project){
          logger.debug('Project created');
          vm.alerts.push({
            type:'success',
            msg:'projects.ok.go'
          });
          vm.names.push(project.name);
          vm.createdProjectName = vm.newProjectName;
          vm.newProjectName = '';
        })
        .catch(function(error) {
          logger.error('Unable to create the projects list.');
          vm.alerts.push({
            type:'danger',
            msg:'projects.error.go'
          });
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
