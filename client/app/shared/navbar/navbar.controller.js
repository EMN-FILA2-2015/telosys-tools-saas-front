/**
 * Created by Killian on 31/03/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('NavbarController', NavbarController)

  NavbarController.$inject = ['$scope', '$location', '$state', 'Auth', 'Principal'];

  function NavbarController($scope, $location, $state, Auth, Principal) {

    $scope.navbar = [
      {
        'title': 'navbar.home',
        'state': 'home'
      }, {
        'title': 'navbar.projects',
        'state': 'projects'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function (state) {
      return $state.is(state);
    };

    $scope.isAuthenticated = Principal.isAuthenticated;
    $scope.$state = $state;

    $scope.logout = function () {
      Auth.logout();
      $state.go('home');
    };

  }

})();
