'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('telosysToolsSaasFrontApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://localhost:8080/hello')
      .respond({"id":1,"content":"Hello, World!"});

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should get a message', function () {
    $httpBackend.flush();
    expect(scope.msg.id).toBe(1);
    expect(scope.msg.content).toBe('Hello, World!')
  });
});
