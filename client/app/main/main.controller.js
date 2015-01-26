(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('MainController', MainController);

  MainController.$inject = ['HelloService', 'Configuration', 'Logger'];

  function MainController(HelloService, Configuration, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('MainController');

    vm.message = '';
    vm.currentEnv = Configuration.env;

    activate();

    ////////////////

    function activate() {
      logger.debug('activate()','Controller activated');
      HelloService.sayHello()
        .then(function(message){
          vm.message = "Message is : " + message;
          logger.debug('Retrive the message --> ' + message)
        })
        .catch(function(error) {
          logger.error('Enabled to get the message.');
        });
    }

  }

})();
