var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof",
        cat: "I hate humans",
        fish: "..."
    }
    var animal=req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The "+animal+" says "+ "'"+sound+"'");
});

app.get("/repeat/:greeting/:number", function(req, res){
    var greeting=req.params.greeting;
    var number=Number(req.params.number);
    var result="";
    
    for(var i=0; i<number; i++){
        result+=greeting+" ";
    }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has launched");
});