'use strict';

angular.module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                //parent: 'account',
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginController'
/*
                data: {
                    roles: [],
                    pageTitle: 'login.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/login/login.html',
                        controller: 'LoginController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('login');
                        return $translate.refresh();
                    }]
                }
*/
            });
    });
