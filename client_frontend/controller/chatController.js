app.controller('chatController', function ($scope, SocketService, $state, chatServices) 
{
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    $scope.currUser = localStorage.getItem('userid');
    $scope.reciverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    console.log(token.exp);
    if (token === null) {
        $state.go('login');
    }
    try {
        SocketService.on('newMessageSingle', (message) => {
            if (localStorage.getItem('userid') == message.senderUserId || (localStorage.getItem('userid') == message.senderUserId && localStorage.getItem('ruserId') == message.senderUserId)) {
                if ($scope.allUserArr === undefined) {
                    $scope.allUserArr = message;
                } else {
                    $scope.allUserArr.push(message);
                }
            }
        })
    }
    catch (err) {
        console.log('error in finding message');
    }
    $scope.getAllUser = function () {
        chatServices.getAllUser($scope, token);
    }
    $scope.getAllUser();
    $scope.person = function (userData) {
        $scope.allUserArr = '';

        localStorage.setItem('rusername', userData.firstname);
        localStorage.setItem('ruserId', userData._id);
        $scope.reciverUserName = localStorage.getItem(rusername);
        $scope.getUserMsg();
    }

    //get all user
    $scope.getUserMsg = function () {
        console.log("I called");
        chatServices.getUserMsg($scope);
    }

    try {


        $scope.sendmessage = function () {
            var msg = {
                'senderUserId': localStorage.getItem('userid'),
                'senderName': localStorage.getItem('name'),
                'recieverUserId': localStorage.getItem('ruserId'),
                'recieverName': localStorage.getItem('rusername'),
                'message': $scope.message
            }

            $scope.message = '';
            SocketService.emit('creatMessage', msg);
        }
    }
    catch (err) {
        console.log("error in sending message to reciver");
    }

    try {
        $scope.logout = function () {
            localStorage.clear();
            $state.go('login')
        }

    } catch (err) {
        console.log("error in sign out");
    }

});