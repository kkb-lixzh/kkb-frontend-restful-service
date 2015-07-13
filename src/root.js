(function($w) {
    var kkb = kkb || {};
    kkb.restful = kkb.restful || {};
    kkb.restful.courses = {};
    kkb.restful.classes = {};
    kkb.restful.categories = {};
    kkb.models = {};
    kkb.models.courseModels = {};
    $w.kkb = kkb;
})(window);

var appModule = angular.module('kkb-restful-app', ['ngResource', 'ngCookies']);

appModule.service('restful-course-comment', ['$resource', '$cookies', function($resource, $cookies) {
    return new kkb.restful.courses.CommentService($resource, $cookies);
}]);


appModule.controller('CommentServiceCtrl', ['$scope', 'restful-course-comment', function($scope, commentService) {
    $scope.text = 'Hello World!';
}]);