/**
 * Created by Killian on 31/03/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('NavbarController', NavbarController)

  NavbarController.$inject = ['$scope', '$state'];

  function NavbarController($scope, $state) {

    $scope.menu = [
      {
        'title': 'navbar.home',
        'state': 'home'
      }, {
        'title': 'navbar.create_project',
        'state': 'projects'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function (state) {
      return $state.is(state);
    };

  }

})();
