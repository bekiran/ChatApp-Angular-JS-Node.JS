app.controller('controlLogin', function ($scope, userService) {

    $scope.register = function () {
        var user = {
            'firstname': $scope.firstname,
            'lastname': $scope.lastname,
            'email': $scope.email,
            'password': $scope.password,
            'confirmPassword': $scope.confirmPassword
        }

        console.log("register calling", user);
        if ($scope.password != $scope.confirmPassword) {
            $scope.message = "password and confirm password not match ";
        } else {
            userService.registerUser(user, $scope);
        }
    }

    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
        userService.login(data, $scope);
    }
});