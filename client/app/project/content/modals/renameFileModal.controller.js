(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('RenameFileController', RenameFileController);

  RenameFileController.$inject = ['$modalInstance', 'Logger', 'path', '$timeout'];

  function RenameFileController($modalInstance, Logger, path, $timeout) {

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

      $modalInstance.close(file.name);
    }
  }
})();

