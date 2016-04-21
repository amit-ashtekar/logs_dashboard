var app, dist, express, http, path, server;
express = require("express");
http = require('http');
path = require("path");
dist = path.join(__dirname, './dist');
app = express();
app.use(express["static"](dist));
app.set("port", process.env.PORT);


app.post('/auth/getToken',function(req,res){
   // console.log(req);
    //if (req.body.username == 'test' && req.body.password == 'test') {
        res.status(200)
            .json({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'});
    //} else {
    //    res.sendStatus(403);
    //}
});
app.get('/getItems/',function(req,res){
 //  console.log('req',req);
    var token=req.headers['authorization'];
  //  console.log("token",token);
    if(!token){
        res.sendStatus(401);
    }
    else{
        res.status(200)
            .json([ {"id": 1, "title": "[32mUS-QA←[0m ←[36mtomcat←[0m 06:25:07,532  INFO mercatusLogger:684 - Getting filters data Started"},
                {"id": 2, "title": "[32mUS-QA←[0m ←[36mtomcat←[0m 06:25:07,535  INFO mercatusLogger:687 - Getting filters data Completed in miliseconds: 1461219907535"},
                {"id": 3, "title": "[32mUS-QA←[0m ←[36mtomcat←[0m 06:25:07,535  INFO mercatusLogger:691 - Getting projectList data Completed in miliseconds: 0"},
                {"id": 4, "title": "[32mUS-QA←[0m ←[36mtomcat←[0m 06:25:07,536  WARN mercatusLogger:717 - in mapProjectList()"},
                {"id": 5, "title": "[32mUS-QA←[0m ←[36mtomcat←[0m 06:25:07,536  INFO mercatusLogger:746 - prepareFilters() started"},
                {"id": 6, "title": "[32mUS-QA←[0m ←[36mtomcat←[0m 06:25:07,537  INFO ProjectServiceImpl:920 - No filter applied, as user do not have any last loaded filter."}]);
    }
});

server = http.createServer(app);

server.listen(app.get("port"), function() {
    return console.log("Express server listening on port Test " + server.address().port);
});
