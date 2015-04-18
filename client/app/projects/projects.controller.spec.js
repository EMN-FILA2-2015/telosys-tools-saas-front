/**
 * Created by Killian on 05/02/2015.
 */

'use strict';

describe('Controller: ProjectsController', function() {
  var projectsController;

  beforeEach(function() {
    module('telosysToolsSaasFrontApp');
  });

  beforeEach(inject(function($controller, ProjectsService, $q, $rootScope) {

    var ProjectsServiceMock = {
      getList: function(){
        var deferred = $q.defer();
        deferred.resolve([
          { id:'id1',
            name:'Project1'
          },{
            id:'id2',
            name:'Project2'
          }
        ]);
        return deferred.promise;
      }
    }

    projectsController = $controller('ProjectsController',{ProjectsService: ProjectsServiceMock});
    $rootScope.$digest();
  }));

  ///////////// TESTS //////////////

  it('Should be defined', function() {
    expect(projectsController).not.toBeNull();
  });

  it("should contain a reference to the Projects", function () {
    expect(projectsController.ProjectsService).not.toBeNull();
  });

  it("Should return Message is : Hey !! Hello, John! when sayHello", function() {
    expect(projectsController.list).toBe(['Project1', 'Project2']);
  });

});
