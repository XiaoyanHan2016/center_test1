(function (angular, win) {
    var app = angular.module('directiveApp', []);
    app.run(function ($templateCache) {
        $templateCache.put('hello.html', '<div>hello,world</div>');
    });
    app.directive('hello', function ($templateCache) {
        return {
            restrict: 'ACEM',
            replace: true,
            template: $templateCache.get('hello.html')
        }
    });
    app.directive('clude', ['$http', function ($http) {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div>clude<span ng-transclude></span></div>'
        }
    }]);

    app.controller('loadCtrl', ['$scope', function ($scope) {
        $scope.loadData = function () {
            console.log('loadCtrl');
        }
    }]);
    app.controller('loadCtrl1', ['$scope', function ($scope) {
        $scope.loadData1 = function () {
            console.log('loadCtrl1111');
        }
    }]);
    app.directive('load', function () {
        return {
            restrict: 'E',
            link: function ($scope, $element, $attr, $require) {
                $element.on('mouseenter', function () {
                    $scope.$apply($attr['howtoload']);
                });
            }
        }
    });

    app.directive('superman', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: function ($scope) {
                $scope.array = [];
                this.one = function () {
                    $scope.array.push('one');
                };
                this.two = function () {
                    $scope.array.push('two');
                };
            },
            link: function ($scope, $element, $attr, $require) {
                $element.on('mouseenter', function () {
                    console.log($scope.array);
                });
            }
        }
    });
    app.directive('one', function () {
        return {
            restrict: 'A',
            require: '^?superman',
            link: function ($scope, $element, $attr, $require) {
                $require.one();
            }
        }
    });
    app.directive('two', function () {
        return {
            restrict: 'A',
            require: '^?superman',
            link: function ($scope, $element, $attr, $require) {
                $require.two();
            }
        }
    });

    app.controller('foldCtrl', ['$scope', function ($scope) {
        $scope.list = [
            {title: '标题1', content: '内容'},
            {title: '标题2', content: '内容'},
            {title: '标题3', content: '内容'}
        ];
    }]);
    app.directive('foldWrap', function () {
        return {
            restrict: 'E',
            replace: true,
            controller: function () {
                var array = [];
                this.add = function (item) {
                    array.push(item);
                };
                this.focus = function (citem) {
                    angular.forEach(array, function (item) {
                        if (item == citem) {
                            item.hide = false;
                        } else {
                            item.hide = true;
                        }
                    });
                };
            }
        }
    });
    app.directive('fold', function () {
        return {
            restrict: 'E',
            require: '^?foldWrap',
            scope: {
                foldTitle: '@'
            },
            transclude: true,
            template: '<div class="title" ng-click="toggle()">{{foldTitle}}</div><div class="content" ng-hide="hide" ng-transclude></div>',
            link: function ($scope, $element, $attr, $require) {
                $scope.hide = true;
                $scope.toggle = function () {
                    $require.focus($scope);
                };
                $require.add($scope);
            }
        }
    });

    app.controller('bindCtrl', ['$scope', function ($scope) {
        $scope.sname = '姓名';
        $scope.sjob = '工作';
        $scope.sget = function (str) {
            console.log(str);
        };
    }]);
    app.directive('bindat', function () {
        return {
            restrict: 'AE',
            scope: {
                name: '@'
            },
            template: 'at <input type="text" ng-model="name"/>'
        }
    });
    app.directive('bindequal', function () {
        return {
            restrict: 'AE',
            scope: {
                job: '='
            },
            template: 'equal <input type="text" ng-model="job"/>'
        }
    });
    app.directive('bindand', function () {
        return {
            restrict: 'AE',
            scope: {
                get: '&'
            },
            template: '<input type="text" ng-model="name"/> and <input type="button" value="点击" ng-click="get({name:name})"/>'
        }
    });

    app.directive('contenteditable', function () {
        return {
            restrict: 'A',
            require: '^?ngModel',
            link: function ($scope, $element, $attr, $require) {
                // view->model
                $element.on('keyup', function () {
                    $scope.$apply(function () {
                        $require.$setViewValue($element.text());
                    });
                });
                // model->view
                $require.$render = function () {
                    $element.text($require.$viewValue);
                };
                // 初始化
                $require.$setViewValue($element.text());
            }
        }
    });

    app.directive('repeat', [function () {
        return {
            restrict: 'A',
            compile: function ($element, $attribute, $transclude) {
                console.log('compile');
                return function ($scope, $element, $attribute, $require) {
                    console.log('compile-link');
                    var repeat = parseInt($attribute.repeat);
                    var children = $element.children().clone();
                    for (var i = 0; i < repeat - 1; i++) {
                        $element.append(children.clone());
                    }
                }
            },
            link: function ($scope, $element, $attribute, $require) {
                console.log('link');
                var repeat = parseInt($attribute.repeat);
                var children = $element.children().clone();
                for (var i = 0; i < repeat - 1; i++) {
                    $element.append(children.clone());
                }
            }
        }
    }]);
})(angular, window);