/**
 * Created by Killian on 29/01/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ProjectsCreateController', ProjectsCreateController);

  ProjectsCreateController.$inject = ['ProjectsService', 'Configuration', 'Logger'];

  function ProjectsCreateController(ProjectsService, Configuration, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ProjectsCreateController');

    vm.currentEnv = Configuration.env;

  }

})();
