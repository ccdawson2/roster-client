var myApp = angular.module('app', ['ngRoute', 'ngAnimate',  
                                   'AuthCtrl', 'UserCtrl', 'EmployeeCtrl'
							//	   'moment-picker',
							//	   'ui.bootstrap',
							// 	   'ui.calendar',
						//'dhxScheduler'
								   ]);
					
myApp.value('config', {
    userId: 'init',
    version: ''
});

					
//var myApp = angular.module('myCalendarApp', ['moment-picker','ui.bootstrap','ui.calendar']);								   
								   
								   
								   
//								   'RosterCtrl', 'ui.calendar']);
/*								   
function CalendarCtrl($scope, $http) {
}
*/     
