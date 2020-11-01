// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");

// Express configuration
const app = express();
// Sets an initial port.
const PORT = process.env.PORT || 8080;

// Set up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Configure Express to serve static files
app.use(express.static("public"));

// ROUTES
// =======================================================
// index.html is the default file so no need to app.get

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API GET request
app.get("/api/notes", (req, res) => {
  // do I need to return this? ReferenceError notesBD is not defined
  res.json(notesDb);
});

// ADD & SAVE from DATABASE
// =======================================================
// Read the notes DB file - this data source holds an array of information
let notesDb = JSON.parse(fs.readFileSync("./db/db.json"));
console.log(notesDb);

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  console.log(newNote);
  // generate unique id using the date and time
  // https://day.js.org/docs/en/display/format
  let dateTimeNow = dayjs().format("DDMMYYYYTHHmmss");
  console.log(dateTimeNow);
  newNote.id = dateTimeNow;

  notesDb.push(newNote);

  fs.writeFileSync(
    path.resolve("./db/db.json"),
    JSON.stringify(notesDb),
    (err) => {
      if (err) throw err;
      console.log("Adding new note...");
    }
  );
  res.send(newNote);
});

// DELETE from db.json
// =======================================================
app.delete("/api/notes/:id", function (req, res) {
  console.log(req.params);
  const chosenID = req.params.id;
  console.log(chosenID);
  // Read all notes
  const newDB = notesDb.filter((savedNote) => savedNote.id != chosenID);
  // your formula would be to return each value into the new array if it does not match the id of the record to be deleted
  // notesDb.splice(savedNote, 1);
  // Writes remaining notes to db.json
  fs.writeFileSync(
    path.resolve("./db/db.json"),
    JSON.stringify(newDB),
    (err) => {
      if (err) throw err;
      console.log(`Deleting note ${chosenID}...`);
    }
  );
  res.send(newDB);
  // return newDB;
});

// Default Route
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });
// LISTENER
// =======================================================
// Starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
