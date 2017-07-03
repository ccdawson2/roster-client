angular.module('app').controller('EmpAddCtrl', function($scope, $http, $location) {

    $scope.title = "Add Employee";

    $scope.saveemp = function() {
		
		console.log('DEBUG: EmpAddCtrl : saveemp(): ' + $scope.emp);
		
        $http.post('http://localhost:3001/api/emp', $scope.emp)
		.then(function(data) {
            $scope.emp = data;
            $location.path('/emps/list');
            toastr.success('Employee added successfully!');
        });  
    }; 
});