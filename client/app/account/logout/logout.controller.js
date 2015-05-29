'use strict';

angular.module('telosysToolsSaasFrontApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
