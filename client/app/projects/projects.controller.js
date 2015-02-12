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

    vm.list = getList();
    vm.name = '';
    vm.create = create;

    ////////////////

    function getList() {
      logger.debug('getList()','Get projects list');
      ProjectsService.getList()
        .then(function(list){
          return list;
        })
        .catch(function(error) {
          logger.error('Unable to get the projects list.');
          vm.alerts.push({
            type:'danger',
            msg:'Unable to get the projects list.'
          });
          return [];
        });
    }

    function create() {
      logger.debug('create()','Project creation');
      ProjectsService.create(vm.name)
        .then(function(project){
          vm.alerts.push({
            type:'success',
            msg:'The project "' + project.name + '" has been created.'
          });
        })
        .catch(function(error) {
          logger.error('Unable to create the projects list.');
          vm.alerts.push({
            type:'danger',
            msg:'Unable to create the project.'
          });
        });
    }

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }

  }

})();
