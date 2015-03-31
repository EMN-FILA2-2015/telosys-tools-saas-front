(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('MainController', MainController);

  MainController.$inject = ['Logger'];

  function MainController(Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('MainController');

    vm.message = '';

    ////////////////

  }

})();
