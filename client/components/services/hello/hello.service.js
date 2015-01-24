(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .factory('HelloService', HelloService);

  HelloService.$inject = ['Restangular', 'Logger'];

  /* @ngInject */
  function HelloService(Restangular, Logger) {

    var logger = Logger.getInstance('HelloService');
    var service = Restangular.service('hello');

    return {
      sayHello: sayHello
    }

    //////////////////////


    /**
     * Get the parameterized Hello message
     * @returns the complete message (promise){*}
     */
    function sayHello() {
      logger.debug('call the /hello/John service');
      return service.one('John')
        .get()
        .then(function(data) {
          return "Hey !! " + data.content;
        })
        .catch(function(error) {
          logger.error('sayHello',"Error lors de l'appel du service REST Hello",error);
          throw error;
        })
    }

  }

})();
