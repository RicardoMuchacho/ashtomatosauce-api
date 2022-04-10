const express = require("express");
const app = require("./index");
const mongoose = require("mongoose");
const http = require("http");
const https = require("https");
const fs = require("fs");
const privateKey = fs.readFileSync("./sslcert/server.key", "utf8");
const certificate = fs.readFileSync("./sslcert/server.cert", "utf8");

var credentials = { key: privateKey, cert: certificate };
const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI;

//var httpsServer = https.createServer(credentials, app);

//var httpServer = https.createServer(app);

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    //httpsServer.listen(PORT);
    app.listen(PORT);

    console.log("connected to db");
    console.log("running on port: " + PORT);
  })
  .catch((err) => console.log(err));
