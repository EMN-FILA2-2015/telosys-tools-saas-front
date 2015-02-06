'use strict';

angular.module('telosysToolsSaasFrontApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'HOME',
        'link': '/'
      },{
        'title': 'CREATE',
        'link': '/projects/create'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
