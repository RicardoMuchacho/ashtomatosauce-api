const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();

mongoose.set("useFindAndModify", false);

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

app.get("/", async (req, res) => {
  res.send(JSON.stringify("ashtomatosauce app - working api"));
});
//routes
const user_router = require("./routes/users");
const auth_router = require("./routes/auth");
const manga_router = require("./routes/mangas");

app.use("/users", user_router);
app.use("/auth", auth_router);
app.use("/mangas", manga_router);

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

export = app;
