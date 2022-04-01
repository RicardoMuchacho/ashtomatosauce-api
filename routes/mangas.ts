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

router.delete("/", upload.none(), async (req, res) => {
  const manga_id = req.body.id;
  console.log(manga_id);
  var r = await Manga.findByIdAndRemove(manga_id);
  res.send(JSON.stringify(r));
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

router.delete("/chapter", upload.none(), async (req, res) => {
  const { manga_id, number } = req.body;
  var r = await Manga.findByIdAndUpdate(
    manga_id,
    { $pull: { chapters: { number: number } } },
    {
      new: true,
    }
  );
  res.send(JSON.stringify(r));
});

export = router;
