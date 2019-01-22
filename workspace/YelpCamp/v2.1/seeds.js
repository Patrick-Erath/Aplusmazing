var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem Ipsum is FAKE TEXT! I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, are they really so different? My placeholder text, I think, is going to end up being very good with women. Some people have an ability to write placeholder text... It's an art you're basically born with. You either have it or you don't."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "I think my strongest asset maybe by far is my temperament. I have a placeholding temperament. An 'extremely credible source' has called my office and told me that Lorem Ipsum's birth certificate is a fraud. I think the only card she has is the Lorem card. The concept of Lorem Ipsum was created by and for the Chinese in order to make U.S. design jobs non-competitive."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "My text is long and beautiful, as, it has been well documented, are various other parts of my website. Lorem Ipsum's father was with Lee Harvey Oswald prior to Oswald's being, you know, shot. Look at that text! Would anyone use that? Can you imagine that, the text of your next webpage?!"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;