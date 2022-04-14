var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const db = require("../helpers/db");
const User = require("../models/user");
const Comment = require("../models/comment");
const Manga = require("../models/manga");
const auth = require("../helpers/auth");

var router = express.Router();

router.get("/", async (req, res) => {
  res.send("user route");
});

router.put("/:user", async (req, res) => {
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
    res.json(r);
  } catch {
    (err) => console.log(err);
  }
});

router.delete("/:user", async (req, res) => {
  try {
    var delete_username = req.params.user;

    var r = await User.findOneAndDelete({ username: delete_username });
    res.json({ deleted: r });
  } catch {
    (err) => console.log(err);
  }
});

router.get("/:user", async (req, res) => {
  var username = req.params.user;
  var r = await User.findOne({ username: username });
  res.json(r);
});

router.get("/:user/created", async (req, res) => {
  var username = req.params.user;
  var r = await Manga.find({ username: username });
  res.json(r);
});

router.get("/:user/comments", async (req, res) => {
  var username = req.params.user;
  var r = await Comment.find({ username: username });
  res.json(r);
});

router.delete("/:user/mangas", async (req, res) => {
  var username = req.params.user;
  var manga_id = req.body.id;

  const query = { username: username };

  var r = await User.findOneAndUpdate(
    query,
    { $pull: { mangas: { id: manga_id } } },
    {
      new: true,
    }
  );
  res.json(r);
});

router.post("/:user/mangas", async (req, res) => {
  const username = req.params.user;
  const manga_id = req.body.id;

  const manga = await Manga.findById(manga_id);

  if (!manga) {
    return console.log("No mangas found");
  }
  const manga_title = manga.title;
  const cover = manga.cover;

  var is_added = false;
  const query = { username: username };

  const user = await User.findOne(query);
  const user_mangas = user.mangas;

  user_mangas.forEach((i) => {
    if (i.manga_id == manga_id) {
      return (is_added = true);
    }
  });
  if (is_added != false) {
    return res.json("Manga already added");
  } else {
    var r = await User.findOneAndUpdate(
      query,
      {
        $push: {
          mangas: { manga_id: manga_id, title: manga_title, cover: cover },
        },
      },
      {
        new: true,
      }
    );
  }
  res.json(r);
});

router.get("/:user/mangas", async (req, res) => {
  const username = req.params.user;

  const r = await User.findOne({ username: username });
  console.log(r);

  var user_mangas = r.mangas;
  if (!user_mangas || user_mangas == "") {
    return res.json("No mangas added yet");
  }
  res.json(user_mangas);
});

module.exports = router;
