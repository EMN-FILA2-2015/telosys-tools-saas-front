/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('BundleController', BundleController)

  BundleController.$inject = ['ProjectService', 'Logger'];

  function BundleController(ProjectService, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('BundleController');

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
