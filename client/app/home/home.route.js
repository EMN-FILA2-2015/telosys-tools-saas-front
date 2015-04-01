(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'HomeController as home'
        });
    });

})();



