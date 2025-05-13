const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortsSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: String,
  endDate: String,
  programManager: String,
  leadTeacher: String,
  totalHours: Number,

  /*title: String,
  year: Number,
	codeISBN: { type: String, maxlength: 13, unique: true },
  quantity: { type: Number, min: 0, default: 0 },
  lastPublished: { type: Date, default: Date.now },
  genre: { type: String, enum: ["romance", "fiction", "biography", "poetry"] },
  author: String
  */
});

const Cohort = mongoose.model("Cohort", cohortsSchema);

module.exports = Cohort;
