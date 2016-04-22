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



app.post('/auth/getToken',function(req,res){
   // console.log(req.body);
    //if (req.body.username == 'test' && req.body.password == 'test') {
        res.status(200)
            .json({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'});
    //} else {
    //    res.sendStatus(403);
    //}
});
app.get('/getItems/',function(req,res){

    var token=req.headers['authorization'];
    var logeventsparam=req.headers['logeventsparam'];
    if(!token){
        res.sendStatus(401);
    }
    else{

        cloudwatchlogs.getLogEvents(JSON.parse(logeventsparam), function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else        res.status(200).json(data)           // successful response
        });
    }
});

server = http.createServer(app);

server.listen(app.get("port"), function() {
    return console.log("Express server listening on port Test " + server.address().port);
});
