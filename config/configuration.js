'use strict';

angular.module('configuration', [])
  .constant('Configuration', {

    // Specifics environment properties
    ////////////////////////////////
    env: '@@env',
    backendHost : '@@backendHost',
    backendPort : '@@backendPort',

    logLevel: '@@logLevel',

    // Global properties
    /////////////////////////
    defaultLanguage: 'en'

  });
