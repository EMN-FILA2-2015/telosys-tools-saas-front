'use strict';

angular.module('telosysToolsSaasFrontApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('account', {
                abstract: true,
                //parent: 'site'
            });
    });
