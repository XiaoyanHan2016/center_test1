(function (angular, win) {
    var app = angular.module('indexApp', ['ngRoute', 'ngAnimate', 'indexCtrls']);
    app.config(function ($routeProvider) {
        $routeProvider.when('/one', {
            templateUrl: 'one.html',
            controller: 'oneCtrl'
        }).when('/two', {
            templateUrl: 'two.html',
            controller: 'twoCtrl'
        }).otherwise({
            redirectTo: '/one'
        });
    });
})(angular, window);