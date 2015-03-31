/**
 * Created by Killian on 31/03/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('LanguageController', LanguageController);

  LanguageController.$inject = ['$scope', '$translate'];

  function LanguageController($scope, $translate) {
    $scope.changeLanguage = function (key) {
      $translate.use(key);
    };
    $scope.isLanguage = function (key) {
      return $translate.use() === key;
    };
  }

})();
