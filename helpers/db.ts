const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");
const Chapter = require("../models/chapter");
const Comment = require("../models/comment");
const Manga = require("../models/manga");

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 3000;

const dbURI = process.env.MONGO_URI;

/*
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
*/
//manga functions
async function create_manga(username, cover, title, description = "") {
  const manga = new Manga({
    cover: cover,
    title: title,
    username: username,
    description: description,
  });
  var res = await manga.save();
  console.log(res);
  return res;
}

async function get_all_manga() {
  try {
    var res = await Manga.find({});

    //res.send(JSON.stringify(r));
    console.log(res);
    return res;
  } catch {
    (err) => console.log(err);
  }
}

async function get_manga(manga_id) {
  try {
    var res = await Manga.findById(manga_id);

    //res.send(JSON.stringify(r));
    console.log(res);
    return res;
  } catch {
    (err) => console.log(err);
  }
}

async function delete_manga(manga_id) {
  try {
    var res = await Manga.findByIdAndRemove(manga_id);

    //res.send(JSON.stringify(r));
    console.log(res);
    return res;
  } catch {
    (err) => console.log(err);
  }
}

async function update_manga(manga_id) {
  try {
    var res = await Manga.findByIdAndUpdate(manga_id);

    //res.send(JSON.stringify(r));
    console.log(res);
    return res;
  } catch {
    (err) => console.log(err);
  }
}

//chapter functions
async function create_chapter(manga_id, chapter_number, pages) {
  var r = await Manga.findByIdAndUpdate(
    manga_id,
    { $push: { chapters: { number: chapter_number, pages: pages } } },
    {
      new: true,
    }
  );
  console.log(r);
  return r;
}

async function get_manga_chapters(manga_id) {
  try {
    var res = await Chapter.find({ manga_id: manga_id });

    //res.send(JSON.stringify(r));
    console.log(res);
    return res;
  } catch {
    (err) => console.log(err);
  }
}

async function get_chapter(chapter_id) {
  try {
    var res = await Chapter.findById(chapter_id);

    //res.send(JSON.stringify(r));
    console.log(res);
    return res;
  } catch {
    (err) => console.log(err);
  }
}

//comment functions
async function create_comment(chapter_id, username, description) {
  const comment = new Comment({
    username: username,
    description: description,
    chapter_id: chapter_id,
  });
  await comment
    .save()
    .then((result) => {
      console.log(result);
      //res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));

  return comment;
}

async function update_movie(
  movie_id,
  genres,
  description,
  year,
  rating,
  trailer
) {
  try {
    const query = { id: movie_id };

    var res = await Chapter.findOneAndUpdate(
      query,
      {
        genres: genres,
        description: description,
        year: year,
        rating: rating,
        trailer: trailer,
      },
      {
        new: true,
      }
    );
    //res.send(JSON.stringify(r));
    console.log(res);
  } catch {
    (err) => console.log(err);
  }
}

async function get_comments(movie_id) {
  try {
    var res = await Comment.find({ movie_id: movie_id });

    //res.send(JSON.stringify(r));
    console.log(res);
  } catch {
    (err) => console.log(err);
  }
  return res;
}

async function delete_comment(id) {
  try {
    var res = await Comment.findOneAndDelete({ _id: id });
    //res.send(JSON.stringify("Deleted, " +r));
    console.log("deleted: " + res);
  } catch {
    (err) => console.log(err);
  }

  return res;
}

//var pages = ["link1", "link2"];
//create_chapter("6243c1be313bdc4f103c60ac", 1, pages);
//get_chapter("623cebd64053140970b12456");
//get_manga_chapters("623ce01dd85e8d0aeca725ca");

//delete_manga("623ce01dd85e8d0aeca725ca");
//get_all_manga();
//get_manga("623ce01dd85e8d0aeca725ca");
//create_manga("test", "rr", "rr", "");

export = {
  create_manga,
  get_manga,
  get_all_manga,
  get_comments,
  create_comment,
  delete_comment,
  create_chapter,
};

//ts-node db.ts
