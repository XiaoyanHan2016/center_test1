(function (angular, win) {
    var app = angular.module('serviceApp', ['utilServices']);
    app.controller('helloCtrl', ['$scope', 'helloService', 'loginService', function ($scope, helloService, loginService) {
        $scope.hello = function (str) {
            var result = helloService.sayHello($scope.content);
            console.log(result);
        };
        $scope.login = function (str) {
            loginService.login('abc', '123');
        };
    }]);
})(angular, window);

(function (angular, win) {
    var app = angular.module('utilServices', []);
//    app.provider('helloService', [function () {
//        this.$get = function () {
//            return {
//                sayHello: function (content) {
//                    if (!content) {
//                        content = '';
//                    }
//                    return 'hello：' + content;
//                }
//            }
//        }
//    }]);
//    app.factory('helloService', [function () {
//        return {
//            sayHello: function (content) {
//                if (!content) {
//                    content = '';
//                }
//                return 'hello：' + content;
//            }
//        };
//    }]);
    app.service('helloService', [function () {
        this.sayHello = function (content) {
            if (!content) {
                content = '';
            }
            return 'hello：' + content;
        }
    }]);

    app.service('loginService', ['$http', function ($http) {
        this.login = function (username, password) {
            $http({
                url: '../../ajax/login.json',
                method: 'post'
            }).success(function (data) {
                console.log('success' + JSON.stringify(data));
            }).error(function (data) {
                console.log('error' + data);
            });
        }
    }]);
})(angular, window);