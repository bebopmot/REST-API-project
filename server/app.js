const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const students = require("./students.json");
const cohorts = require("./cohorts.json");
const cors = require("cors");
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.models");
const Student = require("./models/Student.models");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENTS ROUTES//

app.get("/api/students", (req, res, next) => {
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

app.get("/api/students/:studentId", (req, res) => {
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

app.get("/api/students/cohort/:cohortId", (req, res) => {
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

app.post("/api/students", (req, res) => {
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

app.put("/api/students/:studentId", (req, res) => {
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

app.delete("/api/students/:studentId", (req, res) => {
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

// COHORT ROUTES
app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});


                  // POST

app.post("/api/cohorts", (req, res) => {
  const newcohort = req.body;
  Cohort.create(newcohort)
    .then((cohortFromDB) => {
      res.status(201).json(cohortFromDB);
    })
    .catch((error) => {
      console.log("error creating the cohort in the DB...", error);
      res.status(500).json({ error: "Failed to create a new cohort" });
    });
});



//GET SPECIFIC COHORT

app.get("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findById(cohortId)
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.log("There was an error getting this specific cohort", error);
      res.status(500).json({ message: "Failed to get specific cohort" });
    });
});

//PUT

app.put("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  const newDetails = req.body;

  Cohort.findByIdAndUpdate(cohortId, newDetails, { new: true })
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.log("There was an error updating the cohort", error);
      res.status(500).json({ message: "Failed to update specific cohort" });
    });
});



//DELETE

app.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndDelete(cohortId)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log("There was an error deleting the cohort", error);
      res.status(500).json({ message: "Failed to delete specific cohort" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
