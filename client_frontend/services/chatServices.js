app.service('chatServices', function ($http) {
    try {
        this.getAllUsers = function ($scope, usertoken) {
            $http({
                method: 'GET',//assigning value to http proprties 
                url: 'http://localhost:3000/auth/getAllUser',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {//call back function of http sevice
                    $scope.allUser = response.data.result;
                    console.log(response.data.result);
                    
                },
                function errorCallback(response) {
                    console.log("register Unsuccessfull ");
                    console.log(response);
                }
            );
        }
    }
    catch (err) {
        console.log("error found here in getting users")
    }
    try {
        this.getUserMsg = function ($scope) {
            var arr = [];
            var usertoken = localStorage.getItem('token');
            $http({
                method: 'GET',//assigning value to http proprties 
                url: 'http://localhost:3000/auth/getUserMsg',//assigning value to http proprties 
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    console.log(response.data.message);

                    for (let i = 0; i < (response.data.message); i++) {  //(response.data.message).length *change was done
                        a = response.data.message[i];

                        if (((localStorage.getItem('userid') == a.senderUserId) && (localStorage.getItem('ruserId') == a.recieverUserId)) || ((localStorage.getItem('userid') == a.recieverUserId && localStorage.getItem('ruserId') == a.senderUserId))) {
                            console.log("local user is ", localStorage.getItem('userid'), "a user is ", a.senderUserId, " local rcvrid is ", localStorage.getItem('ruserId'), "  reciver is ", a.recieverUserId);
                            arr.push(a);//pushing all message to array
                        }

                    }
                    $scope.allUserArr = arr;
                    console.log("Users msg successfull ", arr);

                },
                function errorCallback(response) {
                    console.log("Unsuccessfull ");
                    console.log(response);

                }
            );
        }
    }
    catch (err) {
        console.log("founr error in getting message")
    }

})
