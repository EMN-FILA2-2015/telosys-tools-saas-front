(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('AddFolderController', AddFolderController);

  AddFolderController.$inject = ['$modalInstance', 'Logger', 'path', '$timeout'];

  function AddFolderController($modalInstance, Logger, path, $timeout) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ContentController');

    vm.folder = {
      path: path
    };

    vm.cancel = cancel;
    vm.createFolder = createFolder;

    ///////////////

    function cancel() {
      $modalInstance.dismiss();
    }

    function createFolder(form, folder) {

      if (form.$invalid) { // UI invalid
        return;
      }

      vm.isSaving = true;
      vm.errorValidationMessages = [];

      $modalInstance.close(folder);
    }
  }
})();

