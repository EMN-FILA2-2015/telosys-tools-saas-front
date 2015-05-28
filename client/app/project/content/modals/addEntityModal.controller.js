/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('AddEntityController', AddEntityController);

  AddEntityController.$inject = ['$modalInstance', 'Logger', 'path', '$timeout'];

  function AddEntityController($modalInstance, Logger, path, $timeout) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ContentController');

    vm.entity = {
      path: path
    };

    vm.cancel = cancel;
    vm.createEntity = createEntity;

      ///////////////

    function cancel() {
      $modalInstance.dismiss();
    }

    function createEntity(form, entity) {

      if (form.$invalid) { // UI invalid
        return;
      }

      vm.isSaving = true;
      vm.errorValidationMessages = [];

      $modalInstance.close(entity);
    }
  }
})();

