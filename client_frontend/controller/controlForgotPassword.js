app.controller('controlForgotPassword', function ($scope, serviceForgotPassword) {

    $scope.forgotPassword = function () {
        var data = {
            'email': $scope.email,
            // 'password': $scope.password
        }
        serviceLogin.forgotPassword(data, $scope);
    }
});