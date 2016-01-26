(function (angular, win) {
    var app1 = angular.module('app1', []);
    app1.controller('userCtrl', ['$scope', function ($scope) {
        $scope.name = 'my1';
    }]);

    var app2 = angular.module('app2', []);
    app2.controller('userCtrl', ['$scope', function ($scope) {
        $scope.name = 'my2';
    }]);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app2']);
    });
})(angular, window);