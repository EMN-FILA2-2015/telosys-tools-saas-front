/**
 * Created by BWI on 21/01/15.
 */
(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(config);

  config.$inject = ['$urlRouterProvider', '$locationProvider', 'RestangularProvider', 'Configuration', 'LoggerProvider'];

  function config($urlRouterProvider, $locationProvider, RestangularProvider, Configuration, LoggerProvider) {

    /**
     * Route and Navigation configuration
     */
    //$locationProvider.html5Mode(true);
    $urlRouterProvider
      .otherwise('/');

    /**
     * HTTP and REST Service configuration
     */
    RestangularProvider
        .setBaseUrl('http://' + Configuration.backendHost + ':' + Configuration.backendPort);

    /**
     * Logger Configuration
     */
    LoggerProvider.enabled(true);
    LoggerProvider.setLevel(Configuration.logLevel);

  }

})();
