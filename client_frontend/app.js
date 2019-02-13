var app = angular.module('chatapp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'controlLogin'

    })

    .state('register',{
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'controlRegister'
    })

    .state('dashboard',{
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
       // controller: 'controlLogin'
    });
     $urlRouterProvider.otherwise('login');

    
});
