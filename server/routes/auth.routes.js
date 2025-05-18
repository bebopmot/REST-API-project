const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.models");

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
					res.status(500).json({ message: "Internal Server Error" });
				});
		})
		.catch((error) => {
			console.log("Error trying to create an account", error);
			res.status(500).json({ message: "Internal Server Error" });
		});
});

module.exports = router;
