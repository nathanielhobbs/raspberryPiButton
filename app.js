var Gpio = require('onoff').Gpio;
var express = require('express');
var app = express();
var settings = require('./settings');
var port = settings.port;

var led = new Gpio(18, 'out');

// establish streams for RaspPi components
// var GpioStream = require('gpio-stream');
// var button = GpioStream.readable(17);
// var led = GpioStream.writable(18);

// set up logging middleware
// var logger = require('morgan');
// app.use(logger('common'));

// set up body parser middleware POST data
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));

// pipe button presses to led
// var write_stream = button.pipe(led);
// pipe button presses to stdout
// button.pipe(process.stdout);

// API routes
app.post('/plants', function(req,res) {
  console.log('new plant:');
});

app.get('/', function(req,res){
   // res.send("Welcome to Nathaniel's Plant Monitoring System");
   res.sendFile(__dirname + '/public/index.html');
   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   console.log('Status : ' + led.readSync() + ' - ip : ' + ip);
   led.writeSync(0);
});

// Change the status of LED via API based on parameters sent by Button
app.get('/led/:state', function (req, res) {
    led.writeSync(parseInt(req.params.state));
    res.send('Status ' + req.params.state);
});

// CREATE SERVER
app.listen(port, function(){
 console.log('Server started, listening on port: ',port);
});


//http.createServer(function (req, res) {
//  res.setHeader('Content-Type', 'text/html');
//  res.write('<pre>logging button presses:\n');
//  write_stream.pipe(res);
//}).listen(8080);
