var userCtrlModule = angular.module('AuthCtrl', []);

var authUrl = 'http://localhost:10100';

userCtrlModule.controller('LoginCtrl', function($scope, $http, $location) {

    $scope.title = "Please Log In";
	
    $scope.validateUser = function() {

	   $http({
          method: 'GET',
          url: authUrl + '/authenticateUser/?name=' + $scope.name +
                                          '&pword=' + $scope.password
       }).then(function successCallback(response) {
          {
			 if (response == undefined) {
                alert('Invalid Login');
			 }
             else {
				 
				console.log(response); 
                $location.path("/");	
                $scope.$emit('userChange', response);
             }				
	      } 
       }, function errorCallback(response) {
          alert('Invalid Login');
       });		   
	};
});

userCtrlModule.controller('LogoutCtrl', function($scope, $http, $location) {

    $scope.title = "Logout Confirmation";

    $scope.logout = function() {

        $location.path("/");	
        $scope.$emit('userChange', undefined);	
	};	
});

userCtrlModule.controller('RegisterCtrl', function($scope, $http, $location) {

    $scope.title = "Please Register as a User";
	
    $scope.addUser = function() {

	          alert(  $scope.name + " " + $scope.password1 + " " + $scope.password2);

	};
});
