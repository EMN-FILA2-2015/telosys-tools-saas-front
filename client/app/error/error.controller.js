/**
 * Created by Killian on 17/04/2015.
 */

(function () {
  "use strict";

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ErrorController', ErrorController);

  ErrorController.$inject = ['Logger', '$state', '$stateParams'];

  function ErrorController(Logger, $state, $stateParams) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ErrorController');

    vm.code = "";
    vm.text = "";

    printError();

    ////////////////

    /**
     * Fonction permettant d'afficher le code d'erreur à l'utilsiateur.
     * S'il n'y a pas de code d'erreur, l'utilisateur est redirigé sur la page d'accueil.
     */
    function printError() {
      vm.code = $stateParams.code;
      vm.text = $stateParams.text;
      if (vm.code == undefined) {
        $state.go('home');
      } else {
        if (vm.text == undefined) {
          vm.text = "default_message";
        }
      }
    }

  }

})();
