// Module
var express = require('express');
var mqtt = require('mqtt');
var app = express();

// Define port
var port = 80;

// Define client
var client = mqtt.connect('mqtt://public.mqtthq.com', {
    username: 'esp32robot',
    password: 'nopassword'
});
//Define movement topic
var movtopic = `esp32robot/movement`;

//Subscribe to
client.on('connect', function() {
  console.log('connected');

  client.subscribe(movtopic, function(err) {
      if(! err) {
          console.log('subscribed');

          client.publish(movtopic, 'connected');
      }
  });
});


// View engine
app.set('view engine', 'jade');

// Set public folder
app.use(express.static(__dirname + '/public'));

// Serve interface
app.get('/', function(req, res){
  res.render('interface');
});

// Go forward
app.get('/forward', function(req, res){
  client.publish(movtopic, 'forward');
  res.render('interface');
});

// Turn left
app.get('/left', function(req, res){
  client.publish(movtopic, 'left');
  res.render('interface');
});

// Turn right
app.get('/right', function(req, res){
  client.publish(movtopic, 'right');
  res.render('interface');
});

// Go backward
app.get('/backward', function(req, res){
  client.publish(movtopic, 'backward');
  res.render('interface');
});

// Stop
app.get('/stop', function(req, res){
  client.publish(movtopic, 'stop');
  res.render('interface');
});


// Start server
app.listen(port);
console.log("Listening on port " + port);
