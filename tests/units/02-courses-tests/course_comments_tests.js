describe('课程评价接口-course_comments', function() {
			var scope, $httpBackend;
			beforeEach(angular.mock.module('kkb-restful-app'));

			beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_) {
					$httpBackend = _$httpBackend_;
					debugger;
					//create an empty scope
					scope = $rootScope.$new();

					//declare the controller and inject our empty scope
					$controller('CommentServiceCtrl', {
						$scope: scope
					});
				}));

				// tests start here
				it('should have variable text = "Hello World!"', function() {
					alert(scope.text);
					expect('Hello World!').toBe('Hello World!');
					debugger;
				}); 
				it('should fetch list of users', function() {
					$httpBackend.flush();
					expect(scope.users.length).toBe(2);
					expect(scope.users[0].name).toBe('Bob');
					debugger;
				});

			});