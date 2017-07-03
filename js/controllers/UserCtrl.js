var userCtrlModule = angular.module('UserCtrl', []);

var authUrl   = 'http://localhost:10100';
var rosterUrl = 'http://localhost:10103';

userCtrlModule.controller('UserListCtrl', function($scope, $http, $location) {

    $scope.title = "List Users";
	
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
          url: authUrl + '/users/?size=100' // +
                             //  '&user='   + "1" // config.loggedInUserId
											  
       }).then(function successCallback(response) {

          //console.log(response.data);
          //console.log(response.data[0]);
          //console.log(response.data[1]);
          console.log(response.data[0]._id);
		  $scope.users = response.data;
   $scope.users[0].roleCode = "YY";
   
       }, function errorCallback(response) {
          alert('Error 1 returned from users GET');
       });
	   
    }, function errorCallback(response) {
       alert('Error 2 returned from users GET');
    });	
	
    $scope.adduser = function() {

        $location.path('/users/add');		
    };
	
    $scope.sortKey = "-_id";
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    $scope.view = function(id) {
        $location.path('/users/view/' + id);
    };
});

userCtrlModule.controller('UserAddCtrl', function($scope, $http, $location) {

   $scope.title = "Add User";

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

    $scope.saveuser = function() {

		$scope.user.role = $scope.selectedRole;
		
        $http.post(authUrl + '/api/user', $scope.user)
		.then(function(data) {
            $scope.user = data;
            $location.path('/users/list');
            toastr.success('User added successfully!');
        });  
    }; 

});

userCtrlModule.controller('UserEditCtrl', function($scope, $http, $location, $routeParams) {
   
    var id = $routeParams.id;
   
	$scope.title = "Edit User";

    $http.get(rosterUrl + '/getRoles')
	.then(function(response) {
		 var tmp = [];

         for(var o in response.data) {
		    tmp.push(response.data[o].code);}

   		 $scope.roles = tmp;
    })
   
    $http.get(authUrl + '/users/' + id)
	.then(function(response) {
        $scope.user = response.data;
   	    $scope.selectedRole = $scope.user.role;
    });

    $scope.cancel = function() {
        $location.path('/users/view/' + id);
    };

    $scope.update = function() {

		$scope.user.role = $scope.selectedRole;
				
        $http.put('/api/user/' + $scope.user.id, $scope.user)
		.then(function(response) {
            $scope.user = response.data[0];
            $location.path('/users/list');
            toastr.success('User updated successfully!');
        })
    };
});

userCtrlModule.controller('UserViewCtrl', function($scope, $http, $location, $routeParams) {
    $scope.title = "View User";

    var id = $routeParams.id;
	
	console.log('id=' + id);
	
    $http.get(authUrl + '/users/' + id)
	.then(function(response) {
        $scope.user = response.data;
		$scope.user.roleCode = "XX";
		
    });

    $scope.delete = function() {
		
        $http.delete('/users/' + id)
		.then(function(response){
            $scope.user = response.data;
            $location.path('/users/list');
            toastr.success('User deleted successfully!');
        });

        $('.modal-backdrop').hide();
    };

    $scope.edit = function() {
        $location.path('/users/edit/' + id);
    }
});
