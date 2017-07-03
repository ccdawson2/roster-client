var express = require('express'),
bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + ''));
app.use(bodyParser.json());

app.get('*', function(req, res) {
	var options = { root: __dirname };
    res.sendFile('index.html',options);
});

var port = "3010";
app.listen(port);
console.log("Listening to Port: " + port);