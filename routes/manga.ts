var express = require("express");
var router = express.Router();
const multer = require('multer')
const dotenv = require("dotenv").config();
const db = require("../helpers/db.ts");
const User = require("../models/user");
const Comment = require("../models/comment");
const Manga = require("../models/comment");

//controllers
const manga_c = require("../controllers/manga_controller");
const chapter_c = require("../controllers/chapter_controller");

var router = express.Router();

router.get("/", async (req, res) => {
  res.send("user route");
});

router.post("/", async (req, res) => {
  try {
    var prev_username = req.params.user;
    var new_username = req.body.username;
    var new_password = req.body.password;
    var new_name = req.body.name;

    var encrypted_password = await bcrypt.hash(new_password, 10);

    const query = { username: prev_username };

    var r = await User.findOneAndUpdate(
      query,
      { name: new_name, username: new_username, password: encrypted_password },
      {
        new: true,
      }
    );
    res.send(JSON.stringify(r));
  } catch {
    (err) => console.log(err);
  }
});

router.delete("/:user", async (req, res) => {
  try {
    var delete_username = req.params.user;

    var r = await User.findOneAndDelete({ username: delete_username });
    res.send(JSON.stringify("Deleted, " + r));
  } catch {
    (err) => console.log(err);
  }
});

router.get("/:user", async (req, res) => {
  var username = req.params.user;
  var r = await User.findOne({ username: username });
  res.send(JSON.stringify(r));
});

router.get("/:user/comments", async (req, res) => {
  var username = req.params.user;
  var r = await Comment.find({ username: username });
  res.send(JSON.stringify(r));
});

router.post("/:user/movies", async (req, res) => {
  var username = req.params.user;
  var movie_id = req.body.id;
  var movie_title = req.body.title;
  const query = { username: username };

  var r = await User.findOneAndUpdate(
    query,
    { $pull: { movies: [{ id: movie_id }] } },
    {
      new: true,
    }
  );
  res.send(JSON.stringify(r));
});

router.get("/:user/movies", async (req, res) => {
  var username = req.params.user;

  var r = await User.findOne({ username: username });
  console.log(r);

  var user_movies = r.movies;
  if (!user_movies || user_movies == "") {
    return res.send(JSON.stringify("No movies added yet"));
  }
  res.send(JSON.stringify(user_movies));
});

router.post("/:user/ratings", async (req, res) => {
  var username = req.params.user;
  var new_rating = req.body.rating;
  var movie_id = req.body.id;

  const query = { username: username, movie_id: movie_id };
  /*
  var r = await Rating.findOneAndUpdate(
    query,
    { rating: new_rating },
    {
      new: true,
    }
  );
  if (!r || r == "") {
    r = await db.create_rating(movie_id, username, new_rating);
  }

  res.send(JSON.stringify(r));*/
});

export = router;
