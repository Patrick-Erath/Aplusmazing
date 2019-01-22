var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// Adding a new cat to the data base (DB) 

/*var george = new Cat({
    name: "Mrs. Norris",
    age: 13,
    temperament: "Evil"
});

george.save(function(err, cat){
    if(err){
        console.log("SOMETHING WENT WRONG :(");
    }
    else {
        console.log("We DID it! Cat saved to data base!");
        console.log(cat);
    }
});*/

// Create a new cat (new AND save all at once)
Cat.create({
    name: "Snow White",
    age: 3,
    temperament: "Bland"
}, function(err, cat){
    if(err){
       console.log(err); 
    } else {
        console.log(cat);
    }
});


// Retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh no! You got an error!");
        console.log(err);
    }
    else{
        console.log("All the cats ....");
        console.log(cats);
    }
   
})
