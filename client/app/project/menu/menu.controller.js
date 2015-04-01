/**
 * Created by Killian on 31/03/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('MenuController', MenuController)

  MenuController.$inject = ['$scope', '$state'];

  function MenuController($scope, $state) {

    $scope.menu = [
      {
        'title': 'project.menu.content',
        'state': 'project.content'
      }, {
        'title': 'project.menu.configuration',
        'state': 'project.configuration'
      }, {
        'title': 'project.menu.bundle',
        'state': 'project.bundle'
      }, {
        'title': 'project.menu.generation',
        'state': 'project.generation'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function (state) {
      return $state.is(state);
    };

  }

})();
