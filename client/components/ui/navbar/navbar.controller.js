'use strict';

angular.module('telosysToolsSaasFrontApp')
  .controller('NavbarCtrl', function ($scope, $state) {
    $scope.menu = [
      {
        'title': 'HOME',
        'state': 'main'
      },{
        'title': 'CREATE',
        'state': 'projects'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(state) {
      return $state.is(state);
    };
  });
