var app, dist, express, http, path, server;
express = require("express");
http = require('http');
path = require("path");
dist = path.join(__dirname, './dist');
app = express();
app.use(express["static"](dist));
app.set("port", process.env.PORT);
var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});
var cloudwatchlogs = new AWS.CloudWatchLogs();

var filterLogEventsParams = {
    interleaved: true,
    logGroupName: 'US-QA', /* required */
    filterPattern: '',
    startTime:null,
    limit: 3,
    logStreamNames: [
      'tomcat'
    ],
    nextToken:null
};

cloudwatchlogs.filterLogEvents(filterLogEventsParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log("filterLogEventsParams", data); // successful response
});

app.get('/getFilterLogEvents/',function(req,res){
  var filterLogEventsParams=req.headers['filterlogeventsparams'];
  cloudwatchlogs.filterLogEvents(JSON.parse(filterLogEventsParams), function(err,data) {
    if (err)
      console.log(err, err.stack); // an error occurred
    else {
      console.log("filterLogEventsParams",data);
      res.status(200).json(data)
    }// successful response
  });
});

app.get('/getLogEvents/',function(req,res){
  var logeventsparam=req.headers['logeventsparam'];
  cloudwatchlogs.getLogEvents(JSON.parse(logeventsparam), function(err,data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      console.log(data);
      res.status(200).json(data)
    }// successful response
  });
});

app.get('/getGroups/',function(req,res){
  res.status(200)
    .json({groups: ['US-QA']});
});

app.get('/getStreams/',function(req,res){
  res.status(200)
    .json({streams: ['tomcat']});
});

server = http.createServer(app);

server.listen(app.get("port"), function() {
  return console.log("Express server listening on port Test " + server.address().port);
});
