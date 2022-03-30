const dotenv = require("dotenv").config({ path: "../.env" });
var express = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const db = require("../helpers/db");

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

async function create_manga(title, cover, username, description) {
  var description = description || "";

  var response = await cloudinary.uploader.upload(
    cover,
    { folder: `Manga/${title}/`, public_id: "cover" },
    function (error, result) {
      console.log(result, error);
    }
  );
  //console.log(response.secure_url);
  var res = await db.create_manga(
    username,
    response.secure_url,
    title,
    description
  );
  console.log(JSON.stringify(res));
  return res;
}

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
export = { get_manga, create_manga };

//ts-node mangaController.ts
