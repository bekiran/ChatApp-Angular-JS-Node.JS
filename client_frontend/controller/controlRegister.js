app.controller('controlRegister', function ($scope, serviceRegister ) {

    // for registration form
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
            serviceRegister.registerUser(user, $scope);
        }
    }
});