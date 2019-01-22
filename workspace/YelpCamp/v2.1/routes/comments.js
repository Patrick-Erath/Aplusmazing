var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// =========== COMMENTS ROUTES ===========

// Comments New
router.get("/new", middleware.isLoggedIn, function(req,res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
   // lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           req.flash("error", "Something went wrong, a team of highly trained Germans are working to fix your problem");
           console.log(err);
           res.redirect("/campgrounds");
       }
       else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }
               else{
                   // add username and id to comment 
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   // we know req.user exists because user can't access this page unless he/she is loggedin
                   // save comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   console.log(comment);
                   req.flash("success", "Sucessfully added comment");
                   res.redirect('/campgrounds/'+campground._id);
               }
           });
       }
   });
   // connect new comment to campground
   // redirect to campground show page
});

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit",  middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
});

// COMMENT UDPATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted")
            res.redirect("/campgrounds/"+req.params.id)
        }
    });
});

module.exports = router;