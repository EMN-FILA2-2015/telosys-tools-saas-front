/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('AddFileController', AddFileController);

  AddFileController.$inject = ['$modalInstance', 'Logger', 'path', '$timeout'];

  function AddFileController($modalInstance, Logger, path, $timeout) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ContentController');

    vm.file = {
      path: path
    };

    vm.cancel = cancel;
    vm.createFile = createFile;

      ///////////////

    function cancel() {
      $modalInstance.dismiss();
    }

    function createFile(form, file) {

      if (form.$invalid) { // UI invalid
        return;
      }

      vm.isSaving = true;
      vm.errorValidationMessages = [];

      $modalInstance.close(file);
    }
  }
})();

