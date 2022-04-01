var express = require("express");
var router = express.Router();
var User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const auth = require("../helpers/auth.ts");

var router = express.Router();

router.get("/", (req, res) => {
  res.send("auth working");
});

router.post("/register", async (req, res) => {
  try {
    const { name, username, password } = await req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const old_user = await User.findOne({ username: username });

    if (old_user) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: encryptedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "48h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.get("/auth_test", auth, (req, res) => {
  res.status(200).send("Auth Successfull");
});

export = router;
