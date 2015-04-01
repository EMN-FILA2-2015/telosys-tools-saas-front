'use strict';

describe('Controller: MainController', function() {
  var mainController;

  beforeEach(function() {
    module('telosysToolsSaasFrontApp');
  });

  beforeEach(inject(function($controller, HelloService, $q, $rootScope) {

    var HelloServiceMock = {
      sayHello: function(){
        var deferred = $q.defer();
        deferred.resolve('Hey !! Hello, John!');
        return deferred.promise;
      }
    }

    mainController = $controller('MainController',{HelloService: HelloServiceMock});
    $rootScope.$digest();
  }));

  ///////////// TESTS //////////////

  it('Should be defined', function() {
    expect(mainController).not.toBeNull();
  });

  it("should contain a reference to the HelloService", function () {
    expect(mainController.HelloService).not.toBeNull();
  });

  it("Should return Message is : Hey !! Hello, John! when sayHello", function() {
    expect(mainController.message).toBe('Message is : Hey !! Hello, John!');
  });

});



//'use strict';
//
//describe('Controller: MainController', function () {
//
//  // load the controller's module
//  beforeEach(module('telosysToolsSaasFrontApp'));
//
//  var MainController,
//      scope,
//      $httpBackend;
//
//  // Initialize the controller and a mock scope
//  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
//    $httpBackend = _$httpBackend_;
//    $httpBackend.expectGET('http://localhost:8080/hello')
//      .respond({"id":1,"content":"Hello, World!"});
//
//    scope = $rootScope.$new();
//    MainController = $controller('MainController', {
//      $scope: scope
//    });
//  }));
//
//  it('sayHello() should return Hello john', function () {
//    $httpBackend.flush();
//    expect(scope.msg.id).toBe(1);
//    expect(scope.msg.content).toBe('Hello, World!')
//  });
//});
