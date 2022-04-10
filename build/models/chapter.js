"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var chapterSchema = new Schema({
    manga_id: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    pages: {
        type: [String],
        required: true,
    },
});
var Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
//# sourceMappingURL=chapter.js.map