var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// Seaerch
app.get("/", function(req, res){
    res.render("search");
});

// Results
app.get("/results", function(req, res){
    // Here we do an API call
    var input = req.query.search;
    var url="http://www.omdbapi.com/?s="+input+"&apikey=thewdb";
    request(url, function(error, response, body){
        // to access the input, req.query.NAME
        if(!error && response.statusCode == 200){
            var parsedBody = JSON.parse(body);
            res.render("results", {parsedBody : parsedBody});
            //res.send(parsedBody["Search"][0]["Title"]);
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Movie app has been launched");  
});