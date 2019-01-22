var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
   
mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true });

var app      = express();    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    // Used to encode & decode the sessions 
    // Not storing data in sessions as human-data
    secret: "Whistler ate the trash again",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Reading the session & taking the encoded data from the sessions --> decoding it 
// Then recoding and putting it back in the server
// these methods are not necessary to define because they authomatically come with passport-local-mongoose package
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==================================
//              ROUTES
// ===================================

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// ==================================
//             AUTH-ROUTES
// ===================================

// Show sign up form
app.get("/register", function(req, res){
    res.render("register");
});

// Handling user sign up
app.post("/register", function(req, res){
    req.body.username;
    req.body.password;
    // Make a new User object that isn't saved to the data base yet
    // pass-in req.body.username as username into the User object, don't actually save username to database
    // Pass the password as a second argument to User.register (not to user)
        // User.register "hashes" the password, ie encodes it, then passes it to User
        // This returns a new user to us, with username & hashed password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        else{
            // once user has been created 
            // This line logs in the user and runs the serialize user method
            // We specify "local" strategy, can be changed to "facebook" or anything
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});


// ==================================
//             LOGIN-ROUTES
// ===================================

// render login form
app.get("/login", function(req, res){
    res.render("login");
});

// login POST route (login logic)
app.post("/login", passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "/login"
}), function(req, res){
});

// using passport.authenticate inside the app.post
// known as a "middleware", some code that runs before our final callback
// Can have multiple middlewares stackedup, sit between beggining & end of route

// ==================================
//             LOGOUT-ROUTES
// ===================================
app.get("/logout", function(req, res){
    // so easy because of passport package, method already made
    // Passport destroys all the user-data in the session
    req.logout();
    res.redirect("/");
});

// standard middle ware, (next is next thing that is called)
// again, express takes care of next
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        // if user is authenticated, then run next method .. 
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});