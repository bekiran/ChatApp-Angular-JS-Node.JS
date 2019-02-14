app.controller('controlLogin', function ($scope, serviceLogin) {

    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
        serviceLogin.login(data, $scope);
    }
});