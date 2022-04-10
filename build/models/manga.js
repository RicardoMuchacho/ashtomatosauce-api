"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mangaSchema = new Schema({
    cover: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    chapters: [
        {
            number: Number,
            pages: [String],
        },
    ],
});
var Manga = mongoose.model("Manga", mangaSchema);
module.exports = Manga;
//# sourceMappingURL=manga.js.map