const express = require("express");
const app = require("./index.ts");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT);
    console.log("connected to db");
    console.log("running on port: " + PORT);
  })
  .catch((err) => console.log(err));
