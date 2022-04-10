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

router.put("/:user", auth, async (req, res) => {
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

router.delete("/:user", auth, async (req, res) => {
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
  res.send(JSON.stringify(r));
});

router.get("/:user/created", auth, async (req, res) => {
  var username = req.params.user;
  var r = await Manga.find({ username: username });
  res.send(JSON.stringify(r));
});

router.get("/:user/comments", async (req, res) => {
  var username = req.params.user;
  var r = await Comment.find({ username: username });
  res.send(JSON.stringify(r));
});

router.delete("/:user/mangas", auth, async (req, res) => {
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
  res.send(JSON.stringify(r));
});

router.post("/:user/mangas", auth, async (req, res) => {
  const username = req.params.user;
  const manga_id = req.body.id;

  const manga = await Manga.findById(manga_id);
  const manga_title = manga.title;

  var is_added = false;
  const query = { username: username };

  const user = await User.findOne(query);
  const user_mangas = user.mangas;
  user_mangas.forEach((i) => {
    if (i.id == manga_id) {
      return (is_added = true);
    }
  });
  if (is_added != false) {
    return res.send(JSON.stringify("Manga already added"));
  } else {
    var r = await User.findOneAndUpdate(
      query,
      { $push: { mangas: { id: manga_id, title: manga_title } } },
      {
        new: true,
      }
    );
  }
  res.send(JSON.stringify(r));
});

router.get("/:user/mangas", auth, async (req, res) => {
  const username = req.params.user;

  const r = await User.findOne({ username: username });
  console.log(r);

  var user_mangas = r.mangas;
  if (!user_mangas || user_mangas == "") {
    return res.send(JSON.stringify("No mangas added yet"));
  }
  res.send(JSON.stringify(user_mangas));
});

module.exports = router;
