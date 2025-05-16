const router = require('express').Router();

const Student = require("../models/Student.models")

// STUDENTS ROUTES//

router.get("/api/students", (req, res, next) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

//GET SPECIFIC STUDENT

router.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      console.log("There was an error getting this specific student", error);
      res.status(500).json({ message: "Failed to get specific student" });
    });
});

//GET SPECIFIC STUDENT BY COHORT ID

router.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.log("There was an error getting this specific student", error);
      res.status(500).json({ message: "Failed to get specific student" });
    });
});

// POST

router.post("/api/students", (req, res) => {
  const newStudent = req.body;
  Student.create(newStudent)
    .then((studentFromDB) => {
      res.status(201).json(studentFromDB);
    })
    .catch((error) => {
      console.log("error creating the student in the DB...", error);
      res.status(500).json({ error: "Failed to create a new student" });
    });
});

//PUT

router.put("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const newDetails = req.body;

  Student.findByIdAndUpdate(studentId, newDetails, { new: true })
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      console.log("There was an error updating the student", error);
      res.status(500).json({ message: "Failed to update specific student" });
    });
});

//DELETE

router.delete("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findByIdAndDelete(studentId)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log("There was an error deleting the student", error);
      res.status(500).json({ message: "Failed to delete specific student" });
    });
});

module.exports =router;