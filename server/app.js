require('dotenv').config();
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
const authRoutes = require('./routes/auth.routes');
const cohortRoutes = require('./routes/cohort.routes');
const studentRoutes = require('./routes/student.routes');
const User = require("./models/User.models")
const userRoutes =require("./routes/user.routes")
const { isAuthenticated } = require('./middleware/jwt.middleware');


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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});



//MOUNTING ROUTES
app.use("/", require("./routes/student.routes"));
app.use("/", require("./routes/cohort.routes"));
app.use("/auth", require('./routes/auth.routes'));
app.use("/", require("./routes/user.routes"));

// START SERVER
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

