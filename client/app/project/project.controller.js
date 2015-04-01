/**
 * Created by Killian on 05/02/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['ProjectService', 'Logger', '$stateParams'];

  function ProjectController(ProjectService, Logger, $stateParams) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ProjectController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    vm.name = $stateParams.projectId;

    //getProject();

    ////////////////

    /**
     * Fonction permettant de récupérer le projet à charger.
     */
    function getProject() {
      ProjectService.get(vm.name)
        .then(function(data) {
          vm.name = data.name;
        })
        .catch(function(error) {
          vm.name = '';
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
