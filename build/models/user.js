"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    last_page: {
        type: String,
    },
    mangas: [
        {
            id: String,
            title: String,
        },
    ],
    token: { type: String },
});
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map