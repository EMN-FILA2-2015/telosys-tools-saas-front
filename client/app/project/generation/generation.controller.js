/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('GenerationController', GenerationController)

  GenerationController.$inject = ['ProjectService', 'Logger'];

  function GenerationController(ProjectService, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('GenerationController');

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
