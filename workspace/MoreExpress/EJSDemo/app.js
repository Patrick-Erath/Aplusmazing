var express = require("express");
var app = express();


app.use(express.static("public"));

app.get("/",function(req, res){
    res.render("home.ejs");
    res.send("<h1>Welcome to the home page!</h1>");
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req,res){
    var posts = [
        {title:"Post 1", author:"Lame Person"},
        {title:"Why I'm so cool", author:"Donald Trump"},
        {title:"McDonands Everyday", author:"Peter Griffin"}
        ];
        
    res.render("posts.ejs", {posts: posts})    
        
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Launched");   
});
