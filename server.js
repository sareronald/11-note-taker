// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Express configuration
const app = express();
// Sets an initial port.
const PORT = process.env.PORT || 8080;

// Set up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTES
// =======================================================
// index.html is the default file

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API GET request
app.get("/api/notes", function (req, res) {
  return res.json("db.json");
});

// ADD, SAVE, DELETE from DATABASE
// =======================================================
// app.post("/api/notes", function (req, res){
// const newNote = req.body;
// what is req.body? Body of the request - expecting to have some parameters and these sit in the body
// req = request
// });
// $.post("/api/characters", newCharacter)
// .then(function(data) {
// console.log("add.html", data);
// alert("Adding character...");
//   });

// LISTENER
// =======================================================
// Starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
