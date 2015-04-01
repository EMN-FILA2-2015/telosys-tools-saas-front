/**
 * Created by Killian on 05/02/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ProjectController', ProjectController);

  ProjectsController.$inject = ['ProjectService', 'Logger'];

  function ProjectController(ProjectService, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ProjectController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    ////////////////

    /**
     * Fonction permettant de fermer une notification.
     * @param index
     */
    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }

  }

})();
