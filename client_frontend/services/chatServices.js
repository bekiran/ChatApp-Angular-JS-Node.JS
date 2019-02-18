app.service('chatServices', function($http) {
    try {
        this.getAllUsers = function($scope, usertoken){
            $http({
                method: 'GET', 
                url: 'http://localhost:3000/auth/getAllUser',
                headers : {
                    'token' : usertoken,
                }
            })
        }
    } catch (error) {
        console.log("");
    }
})