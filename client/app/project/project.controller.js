/**
 * Created by Killian on 05/02/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['ProjectService', 'Logger', '$stateParams', '$state'];

  function ProjectController(ProjectService, Logger, $stateParams, $state) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ProjectController');

    vm.alerts = [];
    vm.closeAlert = closeAlert;

    vm.name = $stateParams.projectId;

    vm.menu = {
      isActive: isActive,
      items: [
        {
          'title': vm.name,
          'icon': 'glyphicon-folder-open',
          'state': 'project.content'
        }, {
          'title': 'project.menu.configuration',
          'icon': 'glyphicon-edit',
          'state': 'project.configuration'
        }, {
          'title': 'project.menu.bundle',
          'icon': 'glyphicon-list-alt',
          'state': 'project.bundle'
        }, {
          'title': 'project.menu.generation',
          'icon': 'glyphicon glyphicon-log-out',
          'state': 'project.generation'
        }
      ]
    };

    //getProject();

    // Injection de la vue correspondant au contenu d'un projet.
    $state.transitionTo('project.content', {projectId:vm.name});

    ////////////////

    /**
     * Fonction permettant de récupérer le projet à charger.
     */
    function getProject() {
      ProjectService.get(vm.name)
        .then(function(data) {
          vm.name = data.name;
        })
        .catch(function(error) {
          vm.name = '';
        });
    }

    /**
     * Fonction permettant de savoir si un état est actif.
     * @param state
     * @returns {boolean}
     */
    function isActive(state) {
      return $state.is(state);
    }

    /**
     * Fonction permettant de fermer une notification.
     * @param index
     */
    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }

  }

})();
