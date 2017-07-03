angular.module('app').config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/users/list', {
            templateUrl: 'views/userlist.html',
            controller: 'UserListCtrl',
        })
        .when('/users/add', {
            templateUrl: 'views/useradd.html',
            controller: 'UserAddCtrl'
        })
        .when('/users/view/:id', {
            templateUrl: 'views/userview.html',
            controller: 'UserViewCtrl'
        })
        .when('/users/edit/:id', {
            templateUrl: 'views/useredit.html',
            controller: 'UserEditCtrl'
        })
		
        .when('/employees/list', {
            templateUrl: 'views/employeelist.html',
            controller: 'EmployeeListCtrl'
        })
        .when('/employees/add', {
            templateUrl: 'views/employeeadd.html',
            controller: 'EmployeeAddCtrl'
        })
        .when('/employees/view/:id', {
            templateUrl: 'views/employeeview.html',
            controller: 'EmployeeViewCtrl'
        })
        .when('/employees/edit/:id', {
            templateUrl: 'views/employeeedit.html',
            controller: 'EmployeeEditCtrl'
        })

		
		
        .when('/clients/list', {
            templateUrl: 'views/clientlist.html',
            controller: 'ClientListCtrl'
        })
        .when('/clients/add', {
            templateUrl: 'views/clientadd.html',
            controller: 'ClientAddCtrl'
        })
        .when('/clients/view/:id', {
            templateUrl: 'views/clientview.html',
            controller: 'ClientViewCtrl'
        })
        .when('/clients/edit/:id', {
            templateUrl: 'views/clientedit.html',
            controller: 'ClientEditCtrl'
        })

        .when('/roster', {
            templateUrl: 'views/schedule.html',
            controller: 'ScheduleCtrl'
        })
		
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'LogoutCtrl'
        })
		
});