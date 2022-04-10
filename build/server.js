var express = require("express");
var app = require("./index.ts");
var mongoose = require("mongoose");
var http = require("http");
var https = require("https");
var fs = require("fs");
var privateKey = fs.readFileSync("./sslcert/server.key", "utf8");
var certificate = fs.readFileSync("./sslcert/server.cert", "utf8");
var credentials = { key: privateKey, cert: certificate };
var PORT = process.env.PORT || 3000;
var dbURI = process.env.MONGO_URI;
//var httpsServer = https.createServer(credentials, app);
//var httpServer = https.createServer(app);
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (result) {
    //httpsServer.listen(PORT);
    app.listen(PORT);
    console.log("connected to db");
    console.log("running on port: " + PORT);
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=server.js.map