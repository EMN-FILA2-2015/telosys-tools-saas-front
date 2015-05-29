'use strict';

angular.module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('settings', {
                //parent: 'account',
                url: '/settings',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'global.menu.account.settings'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/settings/settings.html',
                        controller: 'SettingsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('settings');
                        return $translate.refresh();
                    }]
                }
            });
    });
