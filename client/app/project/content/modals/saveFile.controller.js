/**
 * Created by Adrian
 */
(function () {
    'use strict';

    angular
        .module('telosysToolsSaasFrontApp')
        .controller('SaveFileController', SaveFileController);

    SaveFileController.$inject = ['$modalInstance', 'file'];

    /* @ngInject */
    function SaveFileController($modalInstance, file) {
        /* jshint validthis: true */
        var vm = this;
        vm.filename = file;

        vm.ok = function() {
          $modalInstance.close();
        }
        vm.cancel = function() {
          $modalInstance.dismiss('cancel');
        }
    }

})();
