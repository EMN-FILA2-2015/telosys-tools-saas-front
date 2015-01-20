  'use strict';

angular.module('telosysToolsSaasFrontApp')
  .controller('MainCtrl', function ($scope, $http, Restangular) {

    /*
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
    */
/*
    // First way of creating a Restangular object. Just saying the base URL
    Restangular
      .oneUrl('server', 'http://localhost:8080/hello')
      .get()
      .then(function(hello) {
        $scope.msg = hello;
      }).catch(function (e) {
        console.log('error : ' + e);
      });
*/
    Restangular
      .one('hello', 'John')
      .get()
      .then(function(hello) {
        $scope.msg = hello;
      }).catch(function (e) {
        console.log('error : ' + e);
      });
  });
