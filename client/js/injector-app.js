(function () {
    var app = angular.module('injectorApp', []);
    app.service('userService', [function () {
        this.say = function (content) {
            console.log('say:' + content);
        }
    }]);

    var injector = angular.injector(['injectorApp']);
    var user = injector.get('userService');
    user.say('hello');
})();