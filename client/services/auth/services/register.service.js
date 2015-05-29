'use strict';

angular.module('telosysToolsSaasFrontApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


