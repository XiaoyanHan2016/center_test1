(function (angular, win) {
    var indexCtrls = angular.module('indexCtrls', []);
    indexCtrls.controller('sayCtrl', ['$scope', function ($scope) {
        $scope.content = 'hello';
    }]);
    indexCtrls.controller('userCtrl', ['$scope', function ($scope) {
        $scope.getData = function () {
            console.log($scope.user);
        };
        $scope.resetData = function () {
            $scope.user = {
                uname: 'abc',
                age: 30,
                autoLogin: true
            };
        };
        $scope.resetData();
    }]);
    indexCtrls.controller('classCtrl', ['$scope', function ($scope) {
        $scope.message = {
            success: true
        };
        $scope.change = function () {
            $scope.message.success = !$scope.message.success;
        };
    }]);
    indexCtrls.controller('oneCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.pageClass = 'pageOne';
        $scope.list = ['item1', 'item2'];
        $scope.click = function () {
            $scope.$broadcast('click', '向自己和下级传递的内容');
            $scope.$emit('click', '向自己和上级传递的内容');
        };
        $rootScope.$on('click', function (event, data) {
            console.log('$rootScope,' + data);
        });
        $scope.$on('click', function (event, data) {
            console.log('$scope,' + data);
        });
    }]);
    indexCtrls.controller('twoCtrl', ['$scope', function ($scope) {
        $scope.pageClass = 'pageTwo';
        $scope.content = '第二页内容';
    }]);
})(angular, window);