/**********************
angular.module('app').controller('RosterCtrl', function($scope, $http, $location) {
    $scope.title = "Roster";
});
**********/

var rosterUrl   = 'http://localhost:10103';

	
angular.module('app').factory('eventsModel', ['$http', function($http) {
    return {
        
		// get all the events
        getevents : function() {
			
	var postData = {};
	postData.token = 'test token';
/**
				xx = $http({
       method: 'GET',
       url: rosterUrl + '/visits/?size=100',
	   data: postData
    });
console.log (xx);
console.log(xx.$$state);
	
console.log(xx.$$state.status);
**/

	return $http({
       method: 'GET',
       url: rosterUrl + '/visits/?size=100',
	   data: postData
    });
        },
        // get all the event
        getevent : function(id) {
            return $http.get('http://localhost:10103/visits/' + id);
        },

        // save a comment (pass in comment data)
        save : function(eventData) {
            return $http({
                method: 'POST',
                url: 'http://localhost:10103/visits',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param(eventData)
            });
        },

        // destroy a Event
        destroy : function(id) {
            return $http.delete('http://localhost:10103/visits/' + id);
        }
    }

}])
