var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    user: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: String,
    description: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);