/**
 * Created by Killian on 05/02/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['ProjectsService', 'Configuration', 'Logger'];

  function ProjectsController(ProjectsService, Configuration, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ProjectsCreateController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    vm.names = getProjectNames();
    vm.newProjectName = '';
    vm.create = create;

    ////////////////

    function getProjectNames() {
      logger.debug('getProjectNames()','Get project names');
      ProjectsService.getList()
        .then(function(list){
          var names = [];
          list.forEach(function(project){
            names.push(project.name);
          });
          return names;
        })
        .catch(function(error) {
          logger.error('Unable to get the projects list.');
          vm.alerts.push({
            type:'danger',
            msg:'ERROR_GETPROJECT'
          });
          return [];
        });
    }

    function create() {
      logger.debug('create()','Project creation');
      ProjectsService.create(vm.newProjectName)
        .then(function(project){
          vm.alerts.push({
            type:'success',
            msg:'The project "' + project.newProjectName + '" has been created.'
          });
        })
        .catch(function(error) {
          logger.error('Unable to create the projects list.');
          vm.alerts.push({
            type:'danger',
            msg:'ERROR_CREATEPROJECT'
          });
        });
    }

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }

  }

})();
