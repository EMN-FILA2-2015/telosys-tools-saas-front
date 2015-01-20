'use strict';

angular.module('configuration', [])
  .constant('Configuration', {

    // Specifics environment properties
    ////////////////////////////////
    env: '@@env',
    backendHost : '@@backendHost',
    backendPort : '@@backendPort',

    // Global properties
    /////////////////////////
    defaultLanguage: 'en'

  });
