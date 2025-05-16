const router = require('express').Router();

const Cohort = require("../models/Cohort.models")


// COHORT ROUTES
router.get("/api/cohorts", (req, res, next) => {
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

router.post("/api/cohorts", (req, res) => {
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

router.get("/api/cohorts/:cohortId", (req, res) => {
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

router.put("/api/cohorts/:cohortId", (req, res) => {
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

router.delete("/api/cohorts/:cohortId", (req, res) => {
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


module.exports =router;