(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('MainController', MainController);

  MainController.$inject = ['Configuration', 'Logger'];

  function MainController(Configuration, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('MainController');

    vm.message = '';
    vm.currentEnv = Configuration.env;

    ////////////////

  }

})();
