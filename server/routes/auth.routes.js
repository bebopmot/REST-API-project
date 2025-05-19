require('dotenv').config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.models");
const jwt = require("jsonwebtoken")

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
	const { email, password, firstName, lastName } = req.body;

	if (!email || !password || !firstName || !lastName) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		res.status(400).json({ message: "Not a valid email" });
		return;
	}

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if(!passwordRegex.test(password)){
        res.status(400).json({ message: "Password needs to contain at leat 8 characters, at least 1 number, 1 lowercase, 1 uppercase and 1 special character" });
		return;
    }

	User.findOne({ email })
		.then((foundUser) => {
			if (foundUser) {
				res.status(400).json({ message: "User already exists" });
				return;
			}
			const salt = bcrypt.genSaltSync(saltRounds);
			const passwordHash = bcrypt.hashSync(password, salt);

			return User.create({ email, passwordHash, firstName, lastName })
				.then((createdUser) => {
					const { email, firstName, lastName, _id } = createdUser;
					const user = { email, firstName, lastName, _id };
					res.status(201).json(user);
				})
				.catch((error) => {
					console.log("Error trying to create an account", error);
					res.status(500).json({ message: "Internal Server Error Number 1" });
				});
		})
		.catch((error) => {
			console.log("Error trying to create an account", error);
			res.status(500).json({ message: "Internal Server Error Number 2" });
		});
});




// POST /auth/login  (Login)
// 
router.post('/login', (req, res, next) => {

  const { email, password } = req.body;

  // Check if email or password are provided as empty string 
  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." })
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.passwordHash);
	  

      if (passwordCorrect) {

        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };

        // Create and sign the token
		console.log("Token Secret:", process.env.TOKEN_SECRET);
        const authToken = jwt.sign(
          payload,
          `${process.env.TOKEN_SECRET}`,
          { algorithm: 'HS256', expiresIn: "6h" }
        );

        // Send the token as the response
        res.json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
        return;
      }
    })
    .catch(err => {
      console.log("Error trying to login...\n\n", err);
      res.status(500).json({ message: "Internal Server Error" })
    });
});




module.exports = router;
