const dotenv = require("dotenv").config({ path: "../.env" });
var express = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const db = require("../helpers/db");
const Manga = require("../models/manga");

/*
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
*/
async function get_manga() {
  cloudinary.v2.search.execute().then((result) => console.log(result));
}

async function create_chapter(manga_id, chapter_number, pages) {
  var i = 1;
  var pages_url = [];

  var r = await Manga.findById(manga_id);

  var manga_title = r.title;
  console.log(manga_title);

  for await (const element of pages) {
    console.log(element);

    var response = await cloudinary.uploader.upload(
      element,
      {
        folder: `Manga/${manga_title}/chapter_${chapter_number}`,
        public_id: `${manga_title}_${chapter_number}_${i}`,
      },
      function (error, result) {
        console.log(result, error);
        console.log(i);
      }
    );
    i++;
    pages_url.push(response.secure_url);
  }
  console.log(pages_url);
  db.create_chapter(manga_id, chapter_number, pages_url);
}

var pages = [
  "../uploads/eth2.jpeg",
  "../uploads/eth2.jpeg",
  "../uploads/eth2.jpeg",
];

//create_chapter("6243c33f21dacf517819b45e", 2, pages);

//create_manga("test", "../uploads/eth2.jpeg", "testuser", "");
//get_manga();
//cloudinary.v2.api.create_folder("product/test", function (error, result) {
//console.log(result);
//});

/*
cloudinary.v2.api.resources_by_tag("boruto", function (error, result) {
  console.log(result, error);
});

cloudinary.v2.api.sub_folders("Manga", function (error, result) {
  console.log(result);
});

cloudinary.v2.search
  .expression("boruto")
  .sort_by("public_id", "desc")
  .max_results(30)
  .execute()
  .then((result) => console.log(result));

  cloudinary.v2.search
  .expression("folder=Manga/boruto/chapter_1")
  //.with_field("folder=Manga/boruto/chapter_1")
  .sort_by("filename", "desc")
  .execute()
  .then((result) => console.log(result));


*/
export = { get_manga, create_chapter };

//ts-node chapter_controller.ts
