var employeeCtrlModule = angular.module('EmployeeCtrl', []);

var authUrl     = 'http://localhost:10100';
var rosterUrl   = 'http://localhost:10103';
var employeeUrl = 'http://localhost:10105';

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

   $http.get(authUrl + '/api/roles')
	.then(function(response) {
		 var tmp = [];
         console.log(response);

		 if (response.data.length === 0)
		 {
	   	    console.log('Creating default roles ...');
		    $http.post(authUrl + '/api/roles/createdefaults')
		    .then(function(data) {
               console.log('Default roles added successfully!');
               console.log(data);
			   
               for(var o in data.data) {
		          tmp.push(data.data[o].code);}            
			   
   		       $scope.roles = tmp;
		       $scope.selectedRole = tmp[1];
            }); 
         };
		 
         for(var o in response.data) {
		    tmp.push(response.data[o].code);}

  		 $scope.roles = tmp;
		 $scope.selectedRole = tmp[1];
    })

    $scope.saveemployee = function() {

		$scope.employee.role = $scope.selectedRole;
		
        $http.post(authUrl + '/api/employee', $scope.employee)
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
				
        $http.put('/api/employee/' + $scope.employee.id, $scope.employee)
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
		
        $http.delete('/employees/' + id)
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
