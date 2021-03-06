const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
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

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
