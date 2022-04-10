const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
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

const Manga = mongoose.model("Manga", mangaSchema);

module.exports = Manga;
