/**
 * Created by Killian on 01/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ConfigurationController', ConfigurationController)

  ConfigurationController.$inject = ['ProjectService'];

  function ConfigurationController(ProjectService) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ConfigurationController');

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
