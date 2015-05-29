'use strict';

angular.module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('logout', {
                //parent: 'account',
                url: '/logout',
                templateUrl: 'app/main/main.html',
                controller: 'LogoutController'
            /*
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'app/main/main.html',
                        controller: 'LogoutController'
                    }
                }
            */
            });
    });
