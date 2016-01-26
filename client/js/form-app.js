(function (angular, win) {
    var app = angular.module('formApp', []);
    app.controller('formCtrl', ['$scope', function ($scope) {
        $scope.user = {
            username: '',
            email: ''
        };
        $scope.master = angular.copy($scope.user);
        $scope.save = function () {
            $scope.master = angular.copy($scope.user);
        };
        $scope.reset = function () {
            $scope.user = angular.copy($scope.master);
        };
        $scope.isSame = function () {
            return angular.equals($scope.user, $scope.master);
        };
    }]);

    // 验证规则：值相同
    app.directive('ngEquals', function () {
        return {
            restrict: 'A',
            require: '^?ngModel',
            link: function ($scope, $element, $attr, $require) {
                $require.$parsers.push(function (viewValue) {
                    var ele = $scope.form[$element.attr('ng-equals')];
                    $require.$setValidity('equals', viewValue == ele.$viewValue);
                    return viewValue;
                });
            }
        };
    });
    // 验证规则：偶数
    app.directive('ngEven', function () {
        return {
            restrict: 'A',
            require: '^?ngModel',
            link: function ($scope, $element, $attr, $require) {
                $require.$parsers.push(function (viewValue) {
                    $require.$setValidity('even', viewValue % 2 == 0);
                    return viewValue;
                });
            }
        };
    });
})(angular, window);