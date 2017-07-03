/**********************
angular.module('app').controller('RosterCtrl', function($scope, $http, $location) {
    $scope.title = "Roster";
});
**********/

angular.module('app').controller('EventsCtrl', ['$scope','eventsModel','uiCalendarConfig','$uibModal', function($scope,eventsModel,uiCalendarConfig,$uibModal) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = []; // initiate to get events from callback

	$scope.doChangeView = function(view,calendar) {

		console.log('xxxxxxxxxxxxxxxxxxxxx' + view);
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
	
    /* Change View */
    $scope.changeView = function(view,calendar) {

  	//console.log('xxxxxxxxxxxxxxxxxxxxx' + view);
    //    uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
	
    /* Change View */
    $scope.renderCalendar = function(calendar) {
        $timeout(function() {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        });
    };
    $scope.eventClick = function(calEvent, jsEvent, view) {
alert('eventClick');
        eventsModel.getevent(calEvent.id)
            .then(function (response) {
				var data = response.data;
                console.log(data);
                var uibmodalinstance =  $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title-bottom',
                    ariaDescribedBy: 'modal-body-bottom',
                    templateUrl:  'templates/partials/edit-event-form.html',
                    size: 'sm',
                    controller: function ($scope) {
                        $scope.eventFormdata = data;
                        $scope.eventFormdata.startdate = '2017-01-03';
                        $scope.updateEvent = function () {
                            console.log( $scope.eventFormdata);
                            eventsModel.save($scope.eventFormdata)
                                .then(function (response) {
                                    $scope.cancel();
                                });
                        };
                        $scope.cancel = function () {
                            uibmodalinstance.close('cancel');
                        };
                        $scope.delete = function () {
                            eventsModel.destroy($scope.eventFormdata.id)
                                .then(function (response) {
                                    $scope.cancel();
                                });
                        }
                    }
                });
            });
    };

    $scope.dayClick = function(date, jsEvent, view) {
alert('dayClick');

	var uibmodalinstance =  $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-bottom',
            ariaDescribedBy: 'modal-body-bottom',
            templateUrl:  'templates/partials/add-event-form.html',
            size: 'sm',
            controller: function ($scope) {
                $scope.eventFormdata = {};
             $scope.addEvent = function () {
                 console.log( $scope.eventFormdata);
                 eventsModel.save($scope.eventFormdata)
                     .then(function (response) {
                         $scope.cancel();
                     });
             };
              $scope.cancel = function () {
                  uibmodalinstance.close('cancel');
              }
            }
        })
    };

    /* Render booked and free events on every day on Calendar view  */

    $scope.eventRender = function( event, element, view ) {
        //
    };


    /**
     * Main settings of FullCalendar
     * For more: https://github.com/angular-ui/ui-calendar
     */

	dtNow =  new Date();
    $scope.calendarConfig = {
        calendar: {
			now: dtNow,
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            allDaySlot: false,
            timezone: 'local',
			scrollTime: '00:00',
            editable: true,
//            fixedWeekCount: true,
            lang: 'de',
            eventOrder: "-title",
            height: 650,
            header: {
                left:   'title',
                center: 'Custom text',
                right:  'today prev,next'
            },
            eventClick: $scope.eventClick,
            eventRender: $scope.eventRender,
            dayClick: $scope.dayClick,
            viewRender: $scope.changeView,
			defaultView: 'timelineWeek',
		    
			resourceLabelText: 'Clients',
			resourceAreaWidth: 230,
			resourceRender: function(resource, cellEls) {
				cellEls.on('click', function() {
					if (confirm('Are you sure you want to delete ' + resource.title + '?')) {
						$('#calendar').fullCalendar('removeResource', resource);
					}
				});
			},
			events: [],
			resources: [
				{ id: 'a', title: 'Room A' },
				{ id: 'b', title: 'Room B', eventColor: 'green' },
				{ id: 'c', title: 'Room C', eventColor: 'orange' },
				{ id: 'd', title: 'Room D', eventColor: 'red' }
			],

        }
    };
	
/**	
    $scope.callbackevents = function(start, end, timezone, callback) {

        eventsModel.getevents()
            .then(function (response) {

			var events = response.data.map(function(event) { 
					return {
						id: event.id,
						start: new Date(event.start),
						end: new Date(event.end),
						allDay: event.allDay,
						url: event.url,
						title: event.title
					};
				});   

                callback(events);
            }, function(error) {
				console.error(error);
			});
    }
**/
    $scope.callbackevents = function(start, end, timezone, callback) {

        eventsModel.getevents()
            .then(function (response) {
				var events = response.data.map(function(event) { 
					return {
						id: event.id,
						start: new Date(event.start),
						end: new Date(event.end),
						allDay: event.allDay,
						url: event.url,
						title: event.title,
						resourceId: event.resourceId
					};
				});   

                callback(events);
            }, function(error) {
				console.error(error);
			});
    }
/*********************	
	$scope.callbackevents = function(start, end, timezone, callback) {

	my working !!
	
        eventsModel.getevents()
            .then(function (data) {
//                console.log(data);
                var events = [];
                angular.forEach(data.data,function(event,key){
//					console.log(event);
                    $scope.events.push(
					   {id: event.id, 
					    title: event.title, 
						start: new Date(event.start)}
						);
                });
                console.log(events.length);
                callback(events);
            });
    }
*************************/	
	$scope.eventSources = [$scope.events, $scope.callbackevents];
}]);
