app.service('chatServices', function ($http) {
    try {
        this.getAllUsers = function ($scope, usertoken) {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/auth/getAllUser',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    $scope.allUser = response.data.message;
                },
                function errorCallback(response) {
                    console.log('register Unsuccessful');
                    console.log(response);
                }
            );
        }
    } catch (error) {
        console.log("error found in getting user");
    }
    try {
        this.getUserMsg = function ($scope) {
            var arr = [];
            var usertoken = localStorage.getItem('token')
            $http({
                method: 'GET',
                url: 'http://http://localhost:3000/auth/getUserMsg',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    console.log(response.data.message[0]);

                    for (var i = 0; i < (response.data.message).length; i++) {
                        a = response.data.message[i];

                        if (((localStorage.getItem('userid') == a.senderUserId) && (localStorage.getItem('ruserId') == a.reciveUserId) || ((localStorage.getItem('userid') == a.reciveUserId) && localStorage.getItem('ruserId') == a.senderUserId))) 
                        {
                            console.log("local user is", localStorage.getItem('userid'), "a user is", a.senderUserId, "local rcvrid is", localStorage.getItem('ruserId'), "reciver is", a.reciveUserId);
                            arr.push(a);
                        }
                    }
                    $scope.allUserArr = arr;
                    console.log("User msg sucessfull ", arr)
                },
                function errorCallback(response) {
                    console.log('meassage unsuccessful');
                    console.log(response);
                }
            );
        }
    } catch (error) {
        console.log("error found in getting message")

    }
})