var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
    // author is passed in as an object with two propreties (id & username)
        // id is a reference to a user model ID
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
    }
});
 
module.exports = mongoose.model("Comment", commentSchema);