var app = angular.module('chatapp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('login');
    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'userControl'

    })

    .state('register',{
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'userControl'
    })

    .state('dashboard',{
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'userControl'
    });
    
});
app.service('SocketService', ['socketFactory', function SocketService (socketFactory){
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
}]);