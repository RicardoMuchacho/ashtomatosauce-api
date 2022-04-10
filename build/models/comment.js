"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    chapter_id: {
        type: String,
        required: true,
    },
});
var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
//# sourceMappingURL=comment.js.map