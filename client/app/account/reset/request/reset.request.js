'use strict';

angular.module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('requestReset', {
                //parent: 'account',
                url: '/reset/request',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/reset/request/reset.request.html',
                        controller: 'RequestResetController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('reset');
                        return $translate.refresh();
                    }]
                }
            });
    });