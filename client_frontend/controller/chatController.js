app.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    $scope.currUser = localStorage.getItem('userid');
    $scope.recieverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    console.log(token.exp);
    if (token === null) {//if the tocken is null then go to login page
        $state.go('login');
    }
    try {
        SocketService.on('newMessageSingle', (message) => {//listening to the evnts
            if (localStorage.getItem('userid') == message.senderUserId || (localStorage.getItem('userid') == message.recieverUserId && localStorage.getItem('ruserId') == message.senderUserId)) {
                if ($scope.allUserArr === undefined) {
                    $scope.allUserArr = message;//assighning message to variable
                } else {
                    $scope.allUserArr.push(message);
                }
            }
        })
    }
    catch (err) {
        console.log("error in finding message")
    }
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope, token);
    }
    $scope.getAllUsers();
    $scope.person = function (userData) {//select person from list
        $scope.allUserArr = '';

        localStorage.setItem('rusername', userData.firstname);//getting data from localstorage
        localStorage.setItem('ruserId', userData._id);
        $scope.recieverUserName = localStorage.getItem('rusername');
        $scope.getUserMsg();
    }
    //get all message
    $scope.getUserMsg = function () {
        console.log("i am called");
        chatServices.getUserMsg($scope);
    }
    $scope.getUserMsg();
    try {
        $scope.sendmessage = function () {//send message function
            var msg = {
                'senderUserId': localStorage.getItem('userid'),
                'senderName': localStorage.getItem('name'),
                'recieverUserId': localStorage.getItem('ruserId'),
                'recieverName': localStorage.getItem('rusername'),
                'message': $scope.message
            };
            $scope.message = '';
            SocketService.emit('createMessage', msg);//emittin the message to the browser
        }
    }
    catch (err) {
        console.log("error in sending message to the reciever")
    }

    try {
        $scope.logout = function () {
            localStorage.clear();
            $state.go('login')//return back to login page
        }
    }
    catch (err) {
        console.log("error in logging out")
    }
});