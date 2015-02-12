'use strict';

angular.module('telosysToolsSaasFrontApp')
  .controller('NavbarCtrl', function ($scope, $state) {
    $scope.menu = [
      {
        'title': 'Home',
        'state': 'main'
      },{
        'title': 'Projects',
        'state': 'projects'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(state) {
      return state === $state.is(state);
    };

  });
