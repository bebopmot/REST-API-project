const router = require('express').Router();

const User = require("../models/User.models")

const { isAuthenticated } = require("../middleware/jwt.middleware");


router.get("/api/users/:userId", isAuthenticated, (req, res) => {
    const { userId } = req.params;
    console.log(userId)
    User.findById(userId)
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        console.log("There was an error getting this specific user", error);
        res.status(500).json({ message: "Failed to get specific user" });
      });
  });

  module.exports =router;