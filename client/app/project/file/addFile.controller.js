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

      // à supprimer
      alert('Create file : '+file.path+"/"+file.name);

      /*
      return FileResource
       .from(uri)
       .add(file)
       .then(function (addedFile) {
       vm.isSaving = false;
       $modalInstance.close(addedFile);
       })
       .catch(function (response) {

       vm.isSaving = false;
       vm.isFailed = true;

       if (response.status === 422) {
       vm.errorValidationMessages = response.data.messages;
       }

       return $timeout(function () {
       vm.isFailed = false;
       }, 800);

       });
       */

    }
  }
})();

