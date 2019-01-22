var mongoose    = require("mongoose");

// SCHEMA SETUP :
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    imageId: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
          // The comments proprety should be an array of comments id
          // Not embedding the actual comment, only references
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);