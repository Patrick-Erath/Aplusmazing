var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);


// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


/*var newUser = new User({
    email: "harrypotter@hogwarts.com",
    name: "Harry Potter"
});

newUser.posts.push({
    title: "How to kill Voldemort",
    content: "Use the Expelliory spell"
});

newUser.save(function(err, user){
    if(err){
        console.log(err);
    }
    else{
        console.log(user);
    }
})*/


/*var newPost = new Post({
    title: "Reflections on das négros",
    content: "They are black"
});

newPost.save(function(err, post){
    if(err){
        console.log(err);
    }
    else{
        console.log(post);
    }
});*/

User.findOne({name:"Harry Potter"}, function(err, user){
    if(err){
        console.log(err);
    }
    else{
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort. Voldemort. Voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            }
            else{
                console.log(user);
                }
        })
    }
}); 

console.log("server works");