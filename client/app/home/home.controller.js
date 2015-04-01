(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['Logger'];

  function HomeController(Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('HomeController');

    vm.message = '';

    ////////////////

  }

})();
