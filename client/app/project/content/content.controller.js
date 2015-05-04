/**
 * Created by Killian on 08/04/2015.
 */

(function () {
  'use strict';

  angular
    .module('telosysToolsSaasFrontApp')
    .controller('ContentController', ContentController);

  ContentController.$inject = ['ProjectService', 'Logger'];

  function ContentController(ProjectService, Logger) {

    /* jshint validthis: true */
    var vm = this;
    var logger = Logger.getInstance('ContentController');

    ////

    vm.aceOptions = {
      mode: 'html',
      useWrapMode : true
    };

    ////

    vm.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
      injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
      }
    };

    vm.model = {};

    vm.model.treedata =
      [
        { "name" : "book", "type" : "file", "children" : [] },
        { "name" : "author", "type" : "file", "children" : [] },
      ];

    vm.model.expandedNodes = [
    ];

    vm.bundles = {};

    vm.bundles.treedata =
      [
        { "name" : "back-jpa", "type" : "folder", "children" : [
          { "name" : "Bean.vm", "type" : "file", "children" : [] },
          { "name" : "repository", "type" : "folder", "children" : [
            { "name" : "BookRepository.java", "type" : "file", "children" : [] },
            { "name" : "AuthorRepository.java", "type" : "file", "children" : [] }
          ]}
        ]},
        { "name" : "front-spring-mvc", "type" : "folder", "children" : [
          { "name" : "domain", "type" : "folder", "children" : [
            { "name" : "Book.java", "type" : "file", "children" : [] },
            { "name" : "Author.java", "type" : "file", "children" : [] }
          ] },
          { "name" : "web", "type" : "folder", "children" : [
            { "name" : "BookController.java", "type" : "file", "children" : [] },
            { "name" : "AuthorController.java", "type" : "file", "children" : [] }
          ] },
          { "name" : "Application.java", "type" : "file", "children" : [] }
        ]}
      ];

    vm.bundles.expandedNodes = [
      vm.bundles.treedata[0],
      vm.bundles.treedata[1]
    ];

    vm.generated = {};

    vm.generated.treedata =
      [
        { "name" : "src", "type" : "folder", "children" : [
          { "name" : "main", "type" : "folder", "children" : [
            { "name" : "java", "type" : "folder", "children" : [
              { "name" : "org.demo.myapp", "type" : "folder", "children" : [
                { "name" : "domain", "type" : "folder", "children" : [
                  { "name" : "Book.java", "type" : "file", "children" : [] },
                  { "name" : "Author.java", "type" : "file", "children" : [] }
                ] },
                { "name" : "repository", "type" : "folder", "children" : [
                  { "name" : "BookRepository.java", "type" : "file", "children" : [] },
                  { "name" : "AuthorRepository.java", "type" : "file", "children" : [] }
                ] },
                { "name" : "web", "type" : "folder", "children" : [
                  { "name" : "BookController.java", "type" : "file", "children" : [] },
                  { "name" : "AuthorController.java", "type" : "file", "children" : [] }
                ] },
                { "name" : "Application.java", "type" : "file", "children" : [] }
              ]}
            ]}
          ]}
        ]}
      ];

    vm.generated.expandedNodes = [
      vm.generated.treedata[0],
      vm.generated.treedata[0].children[0],
      vm.generated.treedata[0].children[0].children[0],
      vm.generated.treedata[0].children[0].children[0].children[0],
      vm.generated.treedata[0].children[0].children[0].children[0].children[0],
      vm.generated.treedata[0].children[0].children[0].children[0].children[1]
    ];

    vm.generated.selectedNode = vm.generated.treedata[0].children[0].children[0].children[0].children[0].children[0];

    ////////////////

    /**
     * Fonction permettant de fermer une notification.
     * @param index
     */
    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }

  }

})();
