/**
 * Created by Killian on 31/03/2015.
 */

'use strict';

angular.module('telosysToolsSaasFrontApp')
  .controller('NavbarCtrl', function ($scope, $state) {
    $scope.menu = [
      {
        'title': 'navbar.home',
        'state': 'main'
      },{
        'title': 'navbar.create_project',
        'state': 'projects'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(state) {
      return $state.is(state);
    };
  });
