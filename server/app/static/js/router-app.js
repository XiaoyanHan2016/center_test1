(function (angular, win) {
    var app = angular.module('routerApp', ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'index.html'
                    },
                    'topbar@index': {
                        templateUrl: 'topbar.html'
                    },
                    'main@index': {
                        template: '首页'
                    },
                    'topbar-view@index': {
                        template: '首页'
                    }
                }
            })
            .state('index.game', {
                url: '/game',
                views: {
                    'main@index': {
                        template: '游戏'
                    },
                    'topbar-view@index': {
                        template: '游戏'
                    }
                }
            })
            .state('index.user', {
                url: '/user',
                views: {
                    'main@index': {
                        templateUrl: 'user.html'
                    },
                    'topbar-view@index': {
                        template: '用户'
                    },
                    'user-view@index.user': {
                        template: 'user-view'
                    }
                }
            })
            .state('index.user.one', {
                url: '/one',
                template: 'one'
            })
            .state('index.user.two', {
                url: '/two',
                template: 'two'
            })
    });
})(angular, window);