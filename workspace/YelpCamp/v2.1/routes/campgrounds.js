var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

require('dotenv').config()

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'doonvcxmz', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//=========== CAMPGROUND ROUTES ===========

// INDEX : show all campgrounds
router.get("/", function(req, res){
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({name: regex}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              if(allCampgrounds.length < 1) {
                  req.flash("error", "No matches found, try different key words");
                  res.redirect("back");
              }
              res.render("campgrounds/index",{campgrounds:allCampgrounds});
           }
        });
    }
    else{
        // req.user gives username & id of current user, undefined if null
        // Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else{
                res.render("campgrounds/index", {campgrounds:allCampgrounds, page: "campgrounds"});
            }
        });
    }
});


//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
      if(err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      // add cloudinary url for the image to the campground object under image property
      req.body.campground.image = result.secure_url;
      // add image's public_id to campground object
      req.body.campground.imageId = result.public_id;
      // add author to campground
      req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
      }
      Campground.create(req.body.campground, function(err, campground) {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('back');
        }
        res.redirect('/campgrounds/' + campground.id);
      });
    });
});

// NEW : Shows the form that will send data to the post route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW : shows more info about one campground
router.get("/:id", function(req,res){
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,  function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", upload.single("image"), middleware.checkCampgroundOwnership,  function(req, res){
    // find and update the correct campground
    // we can use req.body.campground because we wrapped name, image & description 
    // in campground[ ] object
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        } else{
            if(req.file) {
                cloudinary.v2.uploader.destroy(req.body.campground.imageId, function(err, result){
                    if(err){
                        req.flash("error", err.message);
                        return res.redirect("back");
                    }
                    cloudinary.v2.uploader.upload(req.file.path, function(err, result){
                       if(err){
                            req.flash("error", err.message);
                            return res.redirect("back");
                        }
                        req.body.campground.imageId = result.public_id;
                        req.body.campground.image = result.secure_url;
                    });
                });
            }
            // redirect somewhere (show page)
            if(req.body.campground.name){
                req.body.campground.name = req.body.name;
            }
            req.flash("success", "Sucessfully Updated");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;