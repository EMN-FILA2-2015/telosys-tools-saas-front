/**
 * Created by Adrian
 */
(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('DeleteResourceController', DeleteResourceController);

  DeleteResourceController.$inject = ['$modalInstance', 'path', 'type'];

  /* @ngInject */
  function DeleteResourceController($modalInstance, path, type) {
    /* jshint validthis: true */
    var vm = this;
    vm.path = path;

    if (type == 'file') vm.confirmMessage = 'project.content.modal.confirm_delete_file';
    else vm.confirmMessage = 'project.content.modal.confirm_delete_folder';

    vm.ok = function() {
      $modalInstance.close(vm.path);
    };
    vm.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }

})();
