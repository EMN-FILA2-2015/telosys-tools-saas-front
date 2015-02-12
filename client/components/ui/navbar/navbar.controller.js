'use strict';

angular.module('telosysToolsSaasFrontApp')
  .controller('NavbarCtrl', function ($scope, $state) {
    $scope.menu = [
      {
        'title': 'HOME',
        'link': 'main'
      },{
        'title': 'CREATE',
        'link': 'projects'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(state) {
      return state === $state.is(state);
    };
  });
