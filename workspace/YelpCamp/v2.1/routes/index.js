var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground")

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// =========== AUTH ROUTES ===========

// Show register form
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

// Handle Signup logic
router.post("/register", function(req, res){
    var newUser=new User(
        {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            description: req.body.description,
            avatar: req.body.avatar
            });
    if(req.body.adminCode==="secret"){
        newUser.isAdmin=true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
            // once user has signed in we authenticate them, then redirect to campgrounds
            passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp Camp " + user.username);
            res.redirect("/campgrounds");
        });
    })
});

// Show login form route (GET)
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

// Handle login logic (POST) [actually does logging in]
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// Handle logout logic (GET)
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

// Show user profile
router.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
            req.flash("error", "Something went wrong.");
            return res.redirect("/");
        }
        Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
            if(err) {
                req.flash("error", "Something went wrong.");
                return res.redirect("/");
            }
          res.render("users/show", {user: foundUser, campgrounds: campgrounds});
        })
    });
});


module.exports = router;