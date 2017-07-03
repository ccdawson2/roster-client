var empCtrlModule = angular.module('EmpCtrl', []);

var myUrl = 'http://localhost:3001';

empCtrlModule.controller('EmpListCtrl', function($scope, $http, $location) {

    $scope.title = "List Emps";

    $http.get(myUrl + '/api/emps')
	.then(function(response) {
		 console.log("list:" + response.data.id);
		 $scope.emps = response.data;
    })
	
    $scope.addemp = function() {

        $location.path('/emps/add');		
    };
	
    $scope.sortKey = "-_id";
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    $scope.view = function(id) {
        $location.path('/emps/view/' + id);
    };
});

empCtrlModule.controller('EmpAddCtrl', function($scope, $http, $location) {

   $scope.title = "Add Employee";

   $http.get(myUrl + '/api/roles')
	.then(function(response) {
		 var tmp = [];
         console.log(response);

		 if (response.data.length === 0)
		 {
	   	    console.log('Creating default roles ...');
		    $http.post(myUrl + '/api/roles/createdefaults')
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

    $scope.saveemp = function() {

		$scope.emp.role = $scope.selectedRole;
		
        $http.post(myUrl + '/api/emp', $scope.emp)
		.then(function(data) {
            $scope.emp = data;
            $location.path('/emps/list');
            toastr.success('Emp added successfully!');
        });  
    }; 

});

empCtrlModule.controller('EmpEditCtrl', function($scope, $http, $location, $routeParams) {
   
    var id = $routeParams.id;
   
	$scope.title = "Edit Employee";

    $http.get(myUrl + '/api/roles')
	.then(function(response) {
		 var tmp = [];

         for(var o in response.data) {
		    tmp.push(response.data[o].code);}

   		 $scope.roles = tmp;
    })
   
    $http.get(myUrl + '/api/emp/' + id)
	.then(function(response) {
        $scope.emp = response.data[0]; //
   	    $scope.selectedRole = $scope.emp.role;
    });

    $scope.cancel = function() {
        $location.path('/emps/view/' + id);
    };

    $scope.update = function() {

		$scope.emp.role = $scope.selectedRole;
				
        $http.put('/api/emp/' + $scope.emp.id, $scope.emp)
		.then(function(response) {
            $scope.emp = response.data[0];
            $location.path('/emps/list');
            toastr.success('Employee updated successfully!');
        })
    };
});

empCtrlModule.controller('EmpViewCtrl', function($scope, $http, $location, $routeParams) {
    $scope.title = "View Emp";

    var id = $routeParams.id;
	
    $http.get(myUrl + '/api/emp/' + id)
	.then(function(response) {
		console.log("view:" + response.data);
        $scope.emp = response.data[0];
    });

    $scope.delete = function() {
		
        $http.delete('/api/emp/' + id)
		.then(function(response){
            $scope.emp = response.data;
            $location.path('/emps/list');
            toastr.success('Emp deleted successfully!');
        });

        $('.modal-backdrop').hide();
    };

    $scope.edit = function() {
        $location.path('/emps/edit/' + id);
    }
});
