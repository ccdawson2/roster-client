/**********************
angular.module('app').controller('RosterCtrl', function($scope, $http, $location) {
    $scope.title = "Roster";
});
**********/

var rosterUrl   = 'https://rosters-api.herokuapp.com';
	
angular.module('app').factory('eventsModel', ['$http', function($http) {
    return {
        
		// get all the events
        getevents : function() {
			
	var postData = {};
	postData.token = 'test token';

	return $http({
       method: 'GET',
       url: rosterUrl + '/visits/?size=100',
	   data: postData
    });
        },
        // get all the event
        getevent : function(id) {
            return $http.get('https://rosters-api.herokuapp.com/visits/' + id);
        },

        // save a comment (pass in comment data)
        save : function(eventData) {
            return $http({
                method: 'POST',
                url: 'https://rosters-api.herokuapp.com/visits',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param(eventData)
            });
        },

        // destroy a Event
        destroy : function(id) {
            return $http.delete('https://rosters-api.herokuapp.com/visits/' + id);
        }
    }
}])
