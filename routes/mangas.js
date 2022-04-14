var express = require("express");
var router = express.Router();
const multer = require("multer");
const dotenv = require("dotenv").config();
const db = require("../helpers/db");
const User = require("../models/user");
const Comment = require("../models/comment");
const Manga = require("../models/manga");
const path = require("path");
const fs = require("fs");
const auth = require("../helpers/auth");

const upload = multer({ dest: "uploads/" });

//controllers
const manga_c = require("../controllers/manga_controller");
const chapter_c = require("../controllers/chapter_controller");

var router = express.Router();

//routes
router.get("/", async (req, res) => {
  const author = req.query.author || null;

  if (author) {
    console.log(author);
    var r = await Manga.find({ username: author });
    return res.json(r);
  }

  const allmangas = await Manga.find();
  console.log(allmangas);
  res.json(allmangas);
});

router.put("/", upload.single("image"), async (req, res) => {
  const { manga_id, title, description } = req.body;
  const file = req.file;

  var r = await manga_c.update_manga(manga_id, file.path, title, description);
  console.log(r);
  res.json(r);
});

router.get("/:title", async (req, res) => {
  const manga_title = req.params.title;

  var r = await Manga.find({ title: { $regex: manga_title, $options: "i" } });
  if (!r || r == null || r == "") {
    return res.json("No Mangas found");
  }
  res.json(r);
});

router.get("/chapters/:id", async (req, res) => {
  const manga_id = req.params.id;
  try {
    var r = await Manga.findById(manga_id);
  } catch (error) {
    console.log(error);
  }
  if (!r || r == null || r.chapters == "") {
    return res.json("No Chapters found");
  }
  return res.json(r.chapters);
});

router.get("/chapter/:id", async (req, res) => {
  const chapter_id = req.params.id;
  var chapter = null;
  try {
    var r = await Manga.findOne({ "chapters._id": chapter_id }, "chapters");
    console.log(r);
  } catch (error) {
    console.log(error);
  }
  if (!r || r == null || r.chapters == "") {
    return res.json("No Chapters found");
  }
  console.log(r.chapters);
  r.chapters.forEach((element) => {
    if (element._id == chapter_id) {
      return (chapter = element);
    }
  });

  const comments = await Comment.find({ chapter_id: chapter_id });
  console.log(comments);
  return res.json({ chapter: chapter, comments: comments });
});

router.post("/", upload.single("image"), async function (req, res) {
  try {
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
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", upload.none(), async (req, res) => {
  const manga_id = req.body.id;
  console.log(manga_id);
  var r = await Manga.findByIdAndRemove(manga_id);
  res.json(r);
});

router.post(
  "/chapter",
  auth,
  upload.array("images", 80),
  async function (req, res) {
    const files = req.files;
    const { manga_id, number } = req.body;

    const file_paths = files.map((i) => i.path);
    console.log(file_paths);
    var r = await chapter_c.create_chapter(manga_id, number, file_paths);
    res.json(r);
  }
);

router.delete("/chapter", upload.none(), async (req, res) => {
  const { manga_id, number } = req.body;
  var r = await Manga.findByIdAndUpdate(
    manga_id,
    { $pull: { chapters: { number: number } } },
    {
      new: true,
    }
  );
  res.json(r);
});

router.get("/comment/:id", async (req, res) => {
  const chapter_id = req.params.id;

  var comments = await Comment.find({ chapter_id: chapter_id });
  res.json(comments);
});

router.post("/comment/:id", auth, async (req, res) => {
  const { username, description } = req.body;
  const chapter_id = req.params.id;

  var r = await db.create_comment(chapter_id, username, description);
  res.json(r);
});

router.delete("/comment/:id", async (req, res) => {
  const comment_id = req.params.id;
  const username = req.body.user;
  var comment = Comment.findById(comment_id);
  console.log(comment);
  if (username != comment.username) {
    return res.json({ msg: "you're not the author" });
  }
  var r = await db.delete_comment(comment_id);
  res.json({ deleted: r });
});

module.exports = router;
