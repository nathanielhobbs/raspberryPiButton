var GpioStream = require('gpio-stream');
var http = require('http');
var button = GpioStream.readable(17);
var led = GpioStream.writable(18);
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// set the routes
//var appRouter = require('./app_router');
//    appRouter(app);

//module.exports = app;


app.post('/', function(req, res) {
  console.log(req.body);
  res.send(200);
});

server.listen(process.env.PORT, process.env.IP);
var write_stream = button.pipe(led);
// pipe button presses to stdout
button.pipe(process.stdout);

//http.createServer(function (req, res) {
//  res.setHeader('Content-Type', 'text/html');
//  res.write('<pre>logging button presses:\n');
//  write_stream.pipe(res);
//}).listen(8080);
