var express = require("express");
var router = express.Router();
const multer = require("multer");
const dotenv = require("dotenv").config();
const db = require("../helpers/db.ts");
const User = require("../models/user");
const Comment = require("../models/comment");
const Manga = require("../models/manga");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

//controllers
const manga_c = require("../controllers/manga_controller");
const chapter_c = require("../controllers/chapter_controller");

var router = express.Router();

router.get("/", async (req, res) => {
  const r = await Manga.find();
  console.log(r);
  res.send(JSON.stringify(r));
});

router.get("/:title", async (req, res) => {
  const manga_title = req.params.title;

  var r = await Manga.find({ title: { $regex: manga_title, $options: "i" } });
  if (!r || r == null || r == "") {
    return res.send(JSON.stringify("No Mangas found"));
  }
  res.send(JSON.stringify(r));
});

router.post("/", upload.single("image"), async function (req, res, next) {
  const { title, username, description } = req.body;
  const file = req.file;
  console.log(file);

  var response = await manga_c.create_manga(
    title,
    file.path,
    username,
    description
  );

  await fs.unlink(file.path, (error) => console.log(error));
  res.send(JSON.stringify(response));
});

router.post(
  "/chapter",
  upload.array("images", 80),
  async function (req, res, next) {
    const files = req.files;
    const { manga_id, number } = req.body;

    const file_paths = files.map((i) => i.path);
    console.log(file_paths);
    var r = await chapter_c.create_chapter(manga_id, number, file_paths);
    res.send(JSON.stringify(r));
  }
);

router.post("/test", async (req, res) => {
  try {
    var prev_username = req.params.user;
    var new_username = req.body.username;
    var new_password = req.body.password;
    var new_name = req.body.name;

    const query = { username: prev_username };

    var r = await User.findOneAndUpdate(
      query,
      { name: new_name },
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

router.get("/:user/mangas", async (req, res) => {
  var username = req.params.user;

  var r = await User.findOne({ username: username });
  console.log(r);

  var user_movies = r.movies;
  if (!user_movies || user_movies == "") {
    return res.send(JSON.stringify("No movies added yet"));
  }
  res.send(JSON.stringify(user_movies));
});

export = router;
