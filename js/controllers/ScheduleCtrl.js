angular.module('app').controller('ScheduleCtrl', function ($scope) {

	var today = new Date();
	var tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);
	/*
	$scope.events = [
		{ id:1, text:"Task A-12458",
		  start_date: new Date(2013, 10, 12),
		  end_date: new Date(2013, 10, 16) },
		{ id:
		2, text:"Task A-83473",
		  start_date: new Date(2013, 10, 22 ),
		  end_date: new Date(2013, 10, 24 ) }
	];

	$scope.scheduler = { date : new Date(2013,10,1) };
    */
	
	$scope.events = [
		{ id:1, text:"Task A-12458",
		  start_date: today,
		  end_date: tomorrow },
		{ id:2, text:"Task A-83473",
		  start_date: tomorrow ,
		  end_date: tomorrow }
	];

	$scope.scheduler = { date : today };
    
});