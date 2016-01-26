function hello($scope, $rootScope) {
    $scope.count = 0;
    $scope.click = function () {
        $scope.count++;
    }
}