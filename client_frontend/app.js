var app = angular.module('chatapp',['ui.router','btford.socket-io']);

app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'controlLogin'

    })

    $stateProvider.state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'controlForgotPassword'

    })

    $stateProvider.state('resetPassword', {
        url: '/resetPassword',
        templateUrl: 'templates/resetPassword.html',
        controller: 'controlRestPassword'

    })

    .state('register',{
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'controlRegister'
    })

    .state('dashboard',{
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'chatController'
    });
     $urlRouterProvider.otherwise('login');

    
});


// var socket = io('ws://localhost:3000', {transports: ['websocket']});
// socket.on('connect', function () {
//   console.log('connected!');
//   socket.emit('greet', { message: 'Hello Mr.Server!' });
// });
// socket.on('respond', function (data) {
//   console.log(data);
// });

app.service('SocketService', ['socketFactory', function SocketService(socketFactory){
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')  //connecting socket io
    })
}])