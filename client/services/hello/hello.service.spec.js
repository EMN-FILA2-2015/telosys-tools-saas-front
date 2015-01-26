/**
* Created by BWI on 20/01/15.
*/
'use strict';

describe('Service: HelloService', function () {
  var helloService, httpBackend;

  beforeEach(function() {
    module('telosysToolsSaasFrontApp');
    module('restangular');
  });

  beforeEach(inject(function(HelloService, $httpBackend) {
    helloService = HelloService;
    httpBackend = $httpBackend;
  }));

  ///////////// TESTS //////////////

  it('Should be defined', function() {
    expect(helloService).not.toBeNull();
  });

  it("should contain a sayHello() function", function () {
    expect(helloService.sayHello).not.toBeNull();
  });

  it("should respond Hey !! Hello, John! from the sayHello()", function() {
    httpBackend.expectGET("http://localhost:8080/hello/John").respond({ content: 'Hello, John!' });
    helloService.sayHello().then(function(data) {
      expect(data).toBe('Hey !! Hello, John!');
    });
    httpBackend.flush();
  });

});

