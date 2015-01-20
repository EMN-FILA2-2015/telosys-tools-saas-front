'use strict';

angular.module('telosysToolsSaasFrontApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'configuration'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, Configuration) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('http://' + Configuration.backendHost + ':' + Configuration.backendPort);
  });
