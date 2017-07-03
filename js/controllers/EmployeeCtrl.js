var employeeCtrlModule = angular.module('EmployeeCtrl', []);

var authUrl     = 'https://authen-api.herokuapp.com';
var rosterUrl   = 'https://rosters-api.herokuapp.com';
var employeeUrl = 'https://employee-api.herokuapp.com';

employeeCtrlModule.controller('EmployeeListCtrl', function($scope, $http, $location) {

    $scope.title = "List Employees";
	
	var postData = {};
	postData.token = 'test token';

    console.log("postData.token = " + postData.token);

	$http({
       method: 'GET',
       url: authUrl + '/checkToken/?name="xname"' +
                                '&token=""',
	   data: postData
    }).then(function successCallback(response) {
	
	   $http({
          method: 'GET',
		  headers: postData, // {'token':'sdfdfd'}
          url: employeeUrl + '/employees/?size=100' // +
                             //  '&employee='   + "1" // config.loggedInEmployeeId
											  
       }).then(function successCallback(response) {

          //console.log(response.data);
          //console.log(response.data[0]);
          //console.log(response.data[1]);
          console.log(response.data);
		  $scope.employees = response.data;
   
       }, function errorCallback(response) {
          alert('Error 1 returned from employees GET');
       });
	   
    }, function errorCallback(response) {
       alert('Error 2 returned from employees GET');
    });	
	
    $scope.addemployee = function() {

        $location.path('/employees/add');		
    };
	
    $scope.sortKey = "-_id";
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    $scope.view = function(id) {
        $location.path('/employees/view/' + id);
    };
});

employeeCtrlModule.controller('EmployeeAddCtrl', function($scope, $http, $location) {

   $scope.title = "Add Employee";

   $http.get(rosterUrl + '/getRoles')
	.then(function(response) {
		 var tmp = [];
         console.log(response);

         for(var o in response.data) {
		    tmp.push(response.data[o].code);}

  		 $scope.roles = tmp;
		 $scope.selectedRole = tmp[0];
    })

    $scope.saveemployee = function() {

		$scope.employee.role = $scope.selectedRole;

console.log($scope.employee);

var req = {
 method: 'POST',
 url: employeeUrl + '/employees',
 headers: {
   'token': 'xxxxx'
 },
 data: $scope.employee
}


        $http(req)
		.then(function(data) {
            $scope.employee = data;
            $location.path('/employees/list');
            toastr.success('Employee added successfully!');
        });  
    }; 

});

employeeCtrlModule.controller('EmployeeEditCtrl', function($scope, $http, $location, $routeParams) {
   
    var id = $routeParams.id;
   
	$scope.title = "Edit Employee";

    $http.get(rosterUrl + '/getRoles')
	.then(function(response) {
		 var tmp = [];

         for(var o in response.data) {
		    tmp.push(response.data[o].code);}

   		 $scope.roles = tmp;
    })
   
    $http.get(employeeUrl + '/employees/' + id)
	.then(function(response) {
        $scope.employee = response.data;
   	    $scope.selectedRole = $scope.employee.role;
    });

    $scope.cancel = function() {
        $location.path('/employees/view/' + id);
    };

    $scope.update = function() {

		$scope.employee.role = $scope.selectedRole;
				
var req = {
 method: 'PUT',
 url: employeeUrl + '/employees/' + $scope.employee.id,
 headers: {
   'token': 'xxxxx',
 },
 data: $scope.employee
}
console.log($scope.employee);

        $http(req)
		.then(function(response) {
            $scope.employee = response.data[0];
            $location.path('/employees/list');
            toastr.success('Employee updated successfully!');
        })
    };
});

employeeCtrlModule.controller('EmployeeViewCtrl', function($scope, $http, $location, $routeParams) {

    $scope.title = "View Employee";

    var id = $routeParams.id;
	
	console.log('id=' + id);
	
    $http.get(employeeUrl + '/employees/' + id)
	.then(function(response) {
        $scope.employee = response.data;
		
    });

    $scope.delete = function() {

       var id = $routeParams.id;

	   console.log('delete id=' + id);

var req = {
 method: 'DELETE',
 url: employeeUrl + '/employees/' + id,
 headers: {
   'token': 'xxxxx'
 }
}
		
        $http(req)
		.then(function(response){
            $scope.employee = response.data;
            $location.path('/employees/list');
            toastr.success('Employee deleted successfully!');
        });

        $('.modal-backdrop').hide();
    };

    $scope.edit = function() {
        $location.path('/employees/edit/' + id);
    }
});
