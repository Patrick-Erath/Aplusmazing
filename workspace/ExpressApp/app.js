var express = require("express");
var app = express();

// "/"  --> "Da Herro"
app.get("/", function(req, res){
    res.send("Da Herro");
});

// "/bye" --> "Goodbrai"
app.get("/bye", function(req, res){
    res.send("Goodbrai");
});

// "/dog" --> "Da fried rice"
app.get("/dog", function(req, res){
    console.log("someone made a request to /dog");
    res.send("Da fried rice");
});

//app.("r/subredditName/comments/id/title")
app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit.toUpperCase() + "SubReddit!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    res.send("Welcome to the Comments! Your mom is a faggot XD Lmao");
});


app.get("*", function(req, res){
    res.send("Wo Du Yu Tink Yu Ar");
});



// this is an enviornment variable that returns a value from c9
// listens to a particular number and IP from c9
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has launched");
});
