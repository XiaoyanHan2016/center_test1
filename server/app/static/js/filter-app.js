(function (angular, win) {
    var app = angular.module('filterApp', []);
    app.filter('replace', [function () {
        return function (item, from, to) {
            if (item) {
                var regexp = new RegExp(from, 'img');
                return item.replace(regexp, to);
            }
        }
    }]);
})(angular, window);