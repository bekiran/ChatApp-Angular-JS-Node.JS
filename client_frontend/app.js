var app = angular.module('chatapp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('login');
    $stateProvider

    .state('login', {
        url: '/login',
        templatesUrl: 'templates/login.html',
        // controller: 'userControl'

    })
})