const mongoose = require("mongoose");
const Cohort = require("./Cohort.models");
const Schema = mongoose.Schema;

const studentsSchema = new Schema({

firstName: String,
lastName: String,
email: String,
phone: String,
linkedinUrl: String,
languages:  Array,
program: String,
background: String,
image: String,
projects:  Array,
 cohort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cohort",
        required: true
    }


  /*title: String,
  year: Number,
    codeISBN: { type: String, maxlength: 13, unique: true },
  quantity: { type: Number, min: 0, default: 0 },
  lastPublished: { type: Date, default: Date.now },
  genre: { type: String, enum: ["romance", "fiction", "biography", "poetry"] },
  author: String
  */
});

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;