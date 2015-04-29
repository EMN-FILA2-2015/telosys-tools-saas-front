/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('BundleController', BundleController);

  BundleController.$inject = ['ProjectService', 'Logger'];

  function BundleController(ProjectService, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('BundleController');

    vm.username = "telosys-tools";
    vm.availableBundles = [];
    vm.selectedBundles = [];
    vm.install = true;
    vm.url = "https://github.com/${USER}/${REPO}/archive/master.zip";

    vm.getAvailableBundles = getAvailableBundles;

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    ////////////////

    function getAvailableBundles() {
      // TODO mocked
      vm.availableBundles = [
        {
          "name" : "Bundle 1"
        },{
          "name" : "Bundle 2"
        },{
          "name" : "Bundle 3"
        },{
          "name" : "Bundle 4"
        },{
          "name" : "Bundle 5"
        },{
          "name" : "Bundle 6"
        },{
          "name" : "Bundle 7"
        }
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
