var xx = angular.module('app').controller('HomeCtrl', function($scope, $route) {

    var loggedOutMenus = [
	   {"href":"/login",   "menuName":"Login"},
	   {"href":"/register","menuName":"Register"},
	   {"href":"/users/list",   "menuName":"Users"},
	   {"href":"/roster",  "menuName":"Roster"}];
	   
    var loggedInMenus = [
	   {"href":"/users/list",    "menuName":"Users"},
	   {"href":"/employees/list","menuName":"Employees"},
	   {"href":"/clients/list",  "menuName":"Clients"},
	   {"href":"/roster",        "menuName":"Roster"},
	   {"href":"/logout",        "menuName":"Logout"}];
    
	if ($scope.user == undefined) {
	   $scope.title  = "Welcome to the Employee Roster";
	   $scope.title2 = "Please Login or Register To Continue";
       $scope.menuitems = loggedOutMenus;
	}
	
    $scope.$on('userChange', function(event, authResponse) {
	   
   	   if (authResponse == undefined) 
          $scope.user = undefined;
       else {   
          $scope.user = authResponse.data.userId;
          $scope.title  = 'Welcome ' + authResponse.data.userId;
          $scope.title2 = '';
       };	      
	   
	   if ($scope.user == undefined)
          $scope.menuitems = loggedOutMenus;
	   else
	      $scope.menuitems = loggedInMenus;

       $route.reload();
	   }
	);
});
