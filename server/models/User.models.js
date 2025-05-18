const mongoose = require("mongoose");
const Cohort = require("./Cohort.models");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		unique: true,
	},
	lastName: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},

	/*title: String,
  year: Number,
    codeISBN: { type: String, maxlength: 13, unique: true },
  quantity: { type: Number, min: 0, default: 0 },
  lastPublished: { type: Date, default: Date.now },
  genre: { type: String, enum: ["romance", "fiction", "biography", "poetry"] },
  author: String
  */
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
