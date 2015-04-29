/**
 * Created by Killian on 05/02/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['ProjectService', 'Logger', '$state'];

  function ProjectsController(ProjectService, Logger, $state) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ProjectsController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    vm.projects = [];
    vm.newProjectName = '';
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
          var projects = [];
          list.forEach(function(project){
            projects.push({
              'id' : project.id,
              'name' : project.name
            });
          });
          vm.projects = projects;
        })
        .catch(function(error) {
          logger.error('Unable to get the projects list.', error);
          vm.alerts.push({
            type:'danger',
            msg:'projects.error.getting_list'
          });
          vm.projects = [];
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
            type: 'success',
            msg: 'projects.notification.created'
          });
          $state.go('project', {
            projectId : project.id
          });
        })
        .catch(function(error) {
          logger.error('Unable to create the projects list.');
          vm.alerts.push({
            type:'danger',
            msg:'projects.error.creating'
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
