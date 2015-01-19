  'use strict';

angular.module('telosysToolsSaasFrontApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    var req = {
      method: 'GET',
      url: 'http://localhost:8080/hello',
      headers: {
        'Content-Type': undefined
      }
    };

    $scope.msg = "none";

    $http(req).success(function(msg) {
      $scope.msg = msg;
    });
  });
