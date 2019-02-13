app.controller('controlLogin', function ($scope, serviceLogin) {

    // for registration form
    // $scope.register = function () {
    //     var user = {
    //         'firstname': $scope.firstname,
    //         'lastname': $scope.lastname,
    //         'email': $scope.email,
    //         'password': $scope.password,
    //         'confirmPassword': $scope.confirmPassword
    //     }

    //     console.log("register calling", user);
    //     if ($scope.password != $scope.confirmPassword) {
    //         $scope.message = "password and confirm password not match ";
    //     } else {
    //         userService.registerUser(user, $scope);
    //     }
    // }

    // for login
    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
        serviceLogin.login(data, $scope);
    }
});