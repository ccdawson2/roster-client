var express = require('express'),
bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + ''));
app.use(bodyParser.json());

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var events = [
  {id: 1, title: 'All Day Event',start: new Date('Thu Oct 17 2013 09:00:00 GMT+0530 (IST)')},
  {id: 2, title: 'Long Event',start: new Date('Thu Oct 17 2013 10:00:00 GMT+0530 (IST)'),end: new Date('Thu Oct 17 2013 17:00:00 GMT+0530 (IST)')},
  {id: 3, title: 'Repeating Event',start: new Date('Thu Oct 17 2013 09:00:00 GMT+0530 (IST)'),allDay: false},
  {id: 4, title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
  {id: 5, title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
  {id: 6, title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
];

app.get('*', function(req, res) {
	var options = { root: __dirname };
    res.sendFile('index.html',options);
});

app.get('/api/events', function(req, res) {
    res.json(events);
});

app.get('/api/events/:id', function(req, res) {
    res.json(events.find(function(event) { 
		return event.id == req.params.id 
	}));
});

var port = "3010";
app.listen(port);
console.log("Listening to Port: " + port);