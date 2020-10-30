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

// ROUTES
// =======================================================
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// API GET request
app.get("/api/notes", function (req, res) {
  return res.json("db.json");
});

// ADD, SAVE, DELETE from DATABASE
// =======================================================

// LISTENER
// =======================================================
// Starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
