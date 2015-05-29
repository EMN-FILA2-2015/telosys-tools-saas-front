(function () {
  "use strict";

  angular.module('telosysToolsSaasFrontApp', [
    'ui.router',
    'ui.bootstrap',
    'ui.ace',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'restangular',
    'configuration',
    'logger',
    'translate',
    'treeControl',
    'LocalStorageModule',
    'tmh.dynamicLocale',
    'pascalprecht.translate',
    'ngCacheBuster',
    'infinite-scroll'
  ])

  .run(function ($rootScope, $location, $window, $http, $state, $translate, Auth, Principal, Language, ENV, VERSION) {
    $rootScope.ENV = ENV;
    $rootScope.VERSION = VERSION;
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      if (Principal.isIdentityResolved()) {
        Auth.authorize();
      }

      // Update the language
      Language.getCurrent().then(function (language) {
        $translate.use(language);
      });
    });

    $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
      var titleKey = 'global.title';

      $rootScope.previousStateName = fromState.name;
      $rootScope.previousStateParams = fromParams;

      // Set the page title key to the one configured in state or use default one
      if (toState.data.pageTitle) {
        titleKey = toState.data.pageTitle;
      }
      $translate(titleKey).then(function (title) {
        // Change window title with translated one
        $window.document.title = title;
      });
    });

    $rootScope.back = function() {
      // If previous state is 'activate' or do not exist go to 'home'
      if ($rootScope.previousStateName === 'activate' || $state.get($rootScope.previousStateName) === null) {
        $state.go('home');
      } else {
        $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
      }
    };
  })
  .factory('authInterceptor', function ($rootScope, $q, $location, localStorageService) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        var token = localStorageService.get('token');

        if (token && token.expires && token.expires > new Date().getTime()) {
          config.headers['x-auth-token'] = token.token;
        }

        return config;
      }
    };
  })
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, /*$translateProvider, */tmhDynamicLocaleProvider, httpRequestInterceptorCacheBusterProvider, RestangularProvider, Configuration, LoggerProvider) {

    //Cache everything except rest api requests
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

    $urlRouterProvider.otherwise('/');
    $stateProvider.state('site', {
      'abstract': true,
      views: {
        'navbar@': {
          templateUrl: 'scripts/components/navbar/navbar.html',
          controller: 'NavbarController'
        }
      },
      resolve: {
        authorize: ['Auth',
          function (Auth) {
            return Auth.authorize();
          }
        ],
        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('global');
          $translatePartialLoader.addPart('language');
        }]
      }
    });

    $httpProvider.interceptors.push('authInterceptor');
/*
    // Initialize angular-translate
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'i18n/{lang}/{part}.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useCookieStorage();
    $translateProvider.useSanitizeValueStrategy('escaped');
*/
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
    tmhDynamicLocaleProvider.useCookieStorage();
    tmhDynamicLocaleProvider.storageKey('NG_TRANSLATE_LANG_KEY');

    /**
     * Route and Navigation configuration
     */
    //$locationProvider.html5Mode(true);

    /**
     * HTTP and REST Service configuration
     */
    //RestangularProvider
    //  .setBaseUrl('http://' + Configuration.backendHost);

    /**
     * Logger Configuration
     */
    LoggerProvider.enabled(true);
    LoggerProvider.setLevel(Configuration.logLevel);

    });

})();





