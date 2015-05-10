(function () {
    'use strict';

    angular
        .module('telosysToolsSaasFrontApp')
        .controller('SaveFileModalController', SaveFileModalController);

    SaveFileModalController.$inject = ['$modalInstance', 'Logger', 'file'];

    /* @ngInject */
    function SaveFileModalController($modalInstance, file) {
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
